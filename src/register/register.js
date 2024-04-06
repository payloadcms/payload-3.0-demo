import { transform, transformSync } from '@swc-node/core';
import { SourcemapMap, installSourceMapSupport } from '@swc-node/sourcemap-support';
import { getTsconfig } from 'get-tsconfig';
import { platform } from 'os';
import { resolve } from 'path';
import { addHook } from 'pirates';
import * as ts from 'typescript';
import { tsCompilerOptionsToSwcConfig } from './read-default-tsconfig.js';
const DEFAULT_EXTENSIONS = [
    '.js',
    '.jsx',
    '.es6',
    '.es',
    '.mjs',
    '.ts',
    '.tsx'
];
const PLATFORM = platform();
const injectInlineSourceMap = ({ code, filename, map })=>{
    if (map) {
        SourcemapMap.set(filename, map);
        const base64Map = Buffer.from(map, 'utf8').toString('base64');
        const sourceMapContent = `//# sourceMappingURL=data:application/json;charset=utf-8;base64,${base64Map}`;
        return `${code}\n${sourceMapContent}`;
    }
    return code;
};
export function compile(sourcecode, filename, options, async = false) {
    if (filename.endsWith('.d.ts')) {
        return '';
    }
    if (options.files && options.files.length) {
        if (PLATFORM === 'win32' && options.files.every((file)=>filename !== resolve(process.cwd(), file))) {
            return sourcecode;
        }
        if (PLATFORM !== 'win32' && options.files.every((file)=>!filename.endsWith(file))) {
            return sourcecode;
        }
    }
    if (options && typeof options.fallbackToTs === 'function' && options.fallbackToTs(filename)) {
        delete options.fallbackToTs;
        const { outputText, sourceMapText } = ts.transpileModule(sourcecode, {
            compilerOptions: options,
            fileName: filename
        });
        return injectInlineSourceMap({
            code: outputText,
            filename,
            map: sourceMapText
        });
    }
    let swcRegisterConfig;
    if (process.env.SWCRC) {
        // when SWCRC environment variable is set to true it will use swcrc file
        swcRegisterConfig = {
            swc: {
                swcrc: true
            }
        };
    } else {
        swcRegisterConfig = tsCompilerOptionsToSwcConfig(options, filename);
    }
    if (async) {
        return transform(sourcecode, filename, swcRegisterConfig).then(({ code, map })=>{
            return injectInlineSourceMap({
                code,
                filename,
                map
            });
        });
    } else {
        const { code, map } = transformSync(sourcecode, filename, swcRegisterConfig);
        return injectInlineSourceMap({
            code,
            filename,
            map
        });
    }
}
export function register(options = {}, hookOpts = {}) {
    const locatedConfig = getTsconfig();
    const tsconfig = locatedConfig.config.compilerOptions;
    options = tsconfig;
    // options.module = ts.ModuleKind.CommonJS
    installSourceMapSupport();
    return addHook((code, filename)=>compile(code, filename, options), {
        exts: DEFAULT_EXTENSIONS,
        ...hookOpts
    });
}

//# sourceMappingURL=register.js.map
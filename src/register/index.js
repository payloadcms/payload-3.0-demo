import { getTsconfig } from 'get-tsconfig'
import path from 'path'
import ts from 'typescript'
import { fileURLToPath, pathToFileURL } from 'url'
import { CLIENT_EXTENSIONS } from './clientExtensions.js'
import { compile } from './register.js'
const locatedConfig = getTsconfig()
const tsconfig = locatedConfig.config.compilerOptions
tsconfig.module = ts.ModuleKind.ESNext
tsconfig.moduleResolution = ts.ModuleResolutionKind.Bundler
const moduleResolutionCache = ts.createModuleResolutionCache(
  ts.sys.getCurrentDirectory(),
  (x) => x,
  tsconfig,
)
const host = {
  fileExists: ts.sys.fileExists,
  readFile: ts.sys.readFile,
}
const EXTENSIONS = [ts.Extension.Ts, ts.Extension.Tsx, ts.Extension.Dts, ts.Extension.Mts]
export const resolve = async (specifier, context, nextResolve) => {
  const isTS = EXTENSIONS.some((ext) => specifier.endsWith(ext))
  const isClient = CLIENT_EXTENSIONS.some((ext) => specifier.endsWith(ext))
  if (isClient) {
    const nextResult = await nextResolve(specifier, context, nextResolve)
    const specifierSegments = specifier.split('.')
    return {
      format: '.' + specifierSegments[specifierSegments.length - 1],
      shortCircuit: true,
      url: nextResult.url,
    }
  }
  // entrypoint
  if (!context.parentURL) {
    return {
      format: isTS ? 'ts' : undefined,
      shortCircuit: true,
      url: specifier,
    }
  }

  console.log('resolvedModule', resolvedModule, 'specifier', specifier)

  const { resolvedModule } = ts.resolveModuleName(
    specifier,
    fileURLToPath(context.parentURL),
    tsconfig,
    host,
    moduleResolutionCache,
  )

  if (!resolvedModule) {
    return nextResolve(specifier)
  }

  //    import/require from external library
  if (context.parentURL.includes('/node_modules/') && !isTS) {
    console.log('nextResolve', resolvedModule)
    return nextResolve(resolvedModule.resolvedFileName)
  }

  // import from local project to local project TS file
  if (
    resolvedModule &&
    !resolvedModule.resolvedFileName.includes('/node_modules/') &&
    EXTENSIONS.includes(resolvedModule.extension)
  ) {
    return {
      format: 'ts',
      shortCircuit: true,
      url: pathToFileURL(resolvedModule.resolvedFileName).href,
    }
  }
  // import from local project to either:
  // - something TS couldn't resolve
  // - external library
  // - local project non-TS file
  return nextResolve(specifier)
}
const swcOptions = {
  ...tsconfig,
  baseUrl: path.resolve(''),
  paths: undefined,
}
if (tsconfig.paths) {
  swcOptions.paths = tsconfig.paths
  if (tsconfig.baseUrl) {
    swcOptions.baseUrl = path.resolve(tsconfig.baseUrl)
  }
}
export const load = async (url, context, nextLoad) => {
  if (CLIENT_EXTENSIONS.some((e) => context.format === e)) {
    const rawSource = '{}'
    return {
      format: 'json',
      shortCircuit: true,
      source: rawSource,
    }
  }
  if (context.format === 'ts') {
    const { source } = await nextLoad(url, context)
    const code = typeof source === 'string' ? source : Buffer.from(source).toString()
    const compiled = await compile(code, fileURLToPath(url), swcOptions, true)
    return {
      format: 'module',
      shortCircuit: true,
      source: compiled,
    }
  } else {
    return nextLoad(url, context)
  }
}

//# sourceMappingURL=index.js.map

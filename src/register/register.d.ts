import * as ts from 'typescript';
export declare function compile(sourcecode: string, filename: string, options: ts.CompilerOptions & {
    fallbackToTs?: (filename: string) => boolean;
}): string;
export declare function compile(sourcecode: string, filename: string, options: ts.CompilerOptions & {
    fallbackToTs?: (filename: string) => boolean;
}, async: false): string;
export declare function compile(sourcecode: string, filename: string, options: ts.CompilerOptions & {
    fallbackToTs?: (filename: string) => boolean;
}, async: true): Promise<string>;
export declare function compile(sourcecode: string, filename: string, options: ts.CompilerOptions & {
    fallbackToTs?: (filename: string) => boolean;
}, async: boolean): Promise<string> | string;
export declare function register(options?: Partial<ts.CompilerOptions>, hookOpts?: {}): () => void;
//# sourceMappingURL=register.d.ts.map
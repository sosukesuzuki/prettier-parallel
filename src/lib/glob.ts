import globby from 'globby';
import isGlob from 'is-glob';

export async function glob(pattern: string): Promise<string[]> {
    if (!isGlob(pattern)) {
        console.error(`pattern ${pattern} is invalid`);
        process.exit(1);
    }

    // TODO: ignore files by prettierignore
    const files = await globby(pattern);

    return files;
}

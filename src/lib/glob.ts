import globby from 'globby';

export async function glob(pattern: string): Promise<string[]> {
    // TODO: ignore files by prettierignore
    const files = await globby(pattern, { gitignore: true });

    return files;
}

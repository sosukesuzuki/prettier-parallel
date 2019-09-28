import prettier from 'prettier';

export async function resolveOptions(): Promise<prettier.Options> {
    const configFile = await (prettier as any).resolveConfigFile();
    const options = await prettier.resolveConfig(configFile);

    return options || {};
}

import { resolveConfig, resolveConfigFile, Options } from 'prettier';

export async function resolveOptions(): Promise<Options> {
    const configFile = await resolveConfigFile();
    if (!configFile) {
        return {};
    }
    const options = await resolveConfig(configFile);

    return options || {};
}

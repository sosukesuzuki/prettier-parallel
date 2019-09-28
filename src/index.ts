import { glob, formatInParallel, resolveOptions } from './lib';

export async function run() {
    const files = await glob(process.cwd());

    const options = await resolveOptions();

    await formatInParallel(files, options);
}

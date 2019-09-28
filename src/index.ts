import { glob, formatInParallel } from './lib';

export async function run() {
    const files = await glob(process.cwd());

    await formatInParallel(files);
}

import { glob } from './lib';

export async function run() {
    const files = await glob(process.cwd());
}

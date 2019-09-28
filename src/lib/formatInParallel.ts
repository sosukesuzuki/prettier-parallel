import { cpus } from 'os';
import { Worker } from 'worker_threads';
import { Options } from 'prettier';

const workerPath = require.resolve('./parallelWorker');

export function formatInParallel(
    files: string[],
    options: Options,
    concurrency = cpus().length,
) {
    const chunkSize = Math.max(32, Math.ceil(files.length / concurrency));
    const promises = [];
    for (let i = 0; i < files.length; i += chunkSize) {
        promises.push(
            new Promise((resolve, reject) => {
                const workerData = {
                    files: files.slice(i, i + chunkSize),
                    options,
                };

                const worker = new Worker(workerPath, { workerData });

                worker.on('message', ({ filePath }) => {
                    // Done
                });
                worker.on('error', reject);
                worker.on('exit', exitCode => {
                    if (exitCode) {
                        reject(
                            new Error(
                                `Worker stopped with exit code ${exitCode}`,
                            ),
                        );
                    } else {
                        resolve();
                    }
                });
            }),
        );
    }

    return Promise.all(promises);
}

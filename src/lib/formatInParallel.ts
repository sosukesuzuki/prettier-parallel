import { cpus } from 'os';
import { Worker } from 'worker_threads';

const workerPath = require.resolve('./parallelWorker');

export function formatInParallel(files: string[], concurrency = cpus().length) {
    const chunkSize = Math.max(32, Math.ceil(files.length / concurrency));
    const promises = [];
    for (let i = 0; i < files.length; i += chunkSize) {
        promises.push(
            new Promise((resolve, reject) => {
                const workerData = {
                    files: files.slice(i, i + chunkSize),
                };

                const worker = new Worker(workerPath, { workerData });

                worker.on('message', ({ filePath }) => {
                    console.log(`Done ${filePath}`);
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

import { parentPort, threadId, workerData } from 'worker_threads';
import fs from 'fs';
import { promisify } from 'util';
import { getFileInfo, format, Options } from 'prettier';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const { files, options = {} } = workerData as {
    files: string[];
    options: Options;
};

console.log('Start thread ', threadId);

Promise.all(
    files.map(async filePath => {
        const { inferredParser } = await getFileInfo(filePath);

        if (!inferredParser) {
            return;
        }

        const text = await readFile(filePath, 'utf8');
        const result = format(
            text,
            Object.assign({ parser: inferredParser }, options),
        );
        await writeFile(filePath, result);

        if (parentPort) {
            parentPort.postMessage({ filePath });
        }
    }),
)
    .then(() => {
        console.log('Finish thread ', threadId);
    })
    .catch(() => {
        process.exitCode = 1;
    });

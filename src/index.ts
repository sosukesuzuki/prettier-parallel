import path from "path";
import colors from "colors/safe";
import { getFileInfo } from "prettier";
import { Worker } from "worker_threads";
import readFile from "./lib/fs/readFile";
import writeFile from "./lib/fs/writeFile";
import { performance } from "perf_hooks";

async function formatWithWorker(text: string, parser: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, "./worker.js"), {
      workerData: { text, parser }
    });

    worker.on("message", (formatted: string) => {
      resolve(formatted);
    });

    worker.on("error", reject);

    worker.on("exit", (code: number) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

export default async function(filenames: string[]) {
  filenames.forEach(async filename => {
    try {
      const start = performance.now();

      const { ignored, inferredParser } = await getFileInfo(filename);
      if (ignored || !inferredParser) {
        return;
      }

      const text = await readFile(filename);

      const formattedText = await formatWithWorker(text, inferredParser);

      await writeFile(filename, formattedText);
      console.log(
        text !== formattedText ? filename : colors.gray(filename),
        `${Math.round(performance.now() - start)}ms`
      );
    } catch (error) {
      throw error;
    }
  });
}

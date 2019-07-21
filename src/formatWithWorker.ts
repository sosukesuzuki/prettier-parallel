import { join } from "path";
import { Worker } from "worker_threads";

export default async function(text: string, parser: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(join(__dirname, "./worker.js"), {
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

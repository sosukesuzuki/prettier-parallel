import { join } from "path";
import colors from "colors/safe";
import { Worker } from "worker_threads";
import { performance } from "perf_hooks";

export default function(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const start = performance.now();
    const worker = new Worker(join(__dirname, "./worker.js"), {
      workerData: { filename }
    });

    worker.on(
      "message",
      ({ text, formattedText }: { text: string; formattedText: string }) => {
        console.log(
          text !== formattedText ? filename : colors.gray(filename),
          `${Math.round(performance.now() - start)}ms`
        );
        resolve();
      }
    );

    worker.on("error", reject);

    worker.on("exit", (code: number) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

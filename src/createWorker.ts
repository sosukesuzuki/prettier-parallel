import { join } from "path";
import colors from "colors/safe";
import { Worker } from "worker_threads";
import { performance } from "perf_hooks";

export default function(filename: string): void {
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
    }
  );

  worker.on("error", (err: Error) => {
    throw err;
  });

  worker.on("exit", (code: number) => {
    if (code !== 0) {
      throw new Error(`Worker stopped with exit code ${code}`);
    }
  });
}

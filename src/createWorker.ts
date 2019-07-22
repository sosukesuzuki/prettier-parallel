import { join } from "path";
import { Worker } from "worker_threads";

export default function(filename: string): void {
  const worker = new Worker(join(__dirname, "./worker.js"), {
    workerData: { filename }
  });

  worker.on("message", (time: number) => {
    worker.postMessage(time);
  });

  worker.on("error", (err: Error) => {
    console.error(err);
    process.exit(1);
  });

  worker.on("exit", (code: number) => {
    if (code !== 0) {
      throw new Error(`Worker stopped with exit code ${code}`);
    }
  });
}

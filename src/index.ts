import path from "path";
import { Worker } from "worker_threads";

function formatWithWorker(filename: string) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, "./lib/formatWorker.js"), {
      workerData: { filename }
    });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code: number) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

export default async function(filenames: string[]) {
  await Promise.all(
    filenames.map(async filename => {
      try {
        await formatWithWorker(filename);
      } catch (error) {
        throw error;
      }
    })
  );
}

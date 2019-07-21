import { Worker, isMainThread, parentPort } from "worker_threads";

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on("message", (msg: string) => {
    console.log(msg);
  });
} else {
  if (parentPort) {
    parentPort.postMessage("Hello world!");
  }
}

import prettier from "prettier";
import { workerData, parentPort } from "worker_threads";

async function format({ text, parser }: { text: string; parser: string }) {
  const formattedText = prettier.format(text, {
    parser: parser as any
  });

  if (parentPort) {
    parentPort.postMessage(formattedText);
  }
}

format(workerData);

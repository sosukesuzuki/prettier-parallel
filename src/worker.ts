import prettier, { getFileInfo } from "prettier";
import { workerData, parentPort } from "worker_threads";
import { readFileSync, writeFileSync } from "fs";

const { filename } = workerData;

const { ignored, inferredParser } = getFileInfo.sync(filename);

if (ignored && !inferredParser) {
  if (parentPort) {
    parentPort.close();
  }
}

const text = readFileSync(filename, "utf8");

const formattedText = prettier.format(text, {
  parser: inferredParser as any
});

writeFileSync(filename, formattedText);

if (parentPort) {
  parentPort.postMessage({ text, formattedText });
}

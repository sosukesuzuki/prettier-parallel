import prettier, { getFileInfo } from "prettier";
import colors from "colors/safe";
import { workerData, parentPort } from "worker_threads";
import { readFileSync, writeFileSync } from "fs";

const { filename } = workerData;

const { ignored, inferredParser } = getFileInfo.sync(filename);

if (ignored || !inferredParser) {
  if (parentPort) {
    console.warn(colors.gray(`${filename} could not be formatted`));
    process.exit();
  }
}

const text = readFileSync(filename, "utf8");

const formattedText = prettier.format(text, {
  parser: inferredParser as any
});

writeFileSync(filename, formattedText);

if (parentPort) {
  parentPort.postMessage({ text, formattedText });
  process.exit();
}

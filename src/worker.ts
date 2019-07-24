import prettier, { getFileInfo, resolveConfig } from "prettier";
import colors from "colors/safe";
import { workerData, parentPort } from "worker_threads";
import { readFileSync, writeFileSync } from "fs";
import { PerformanceObserver, performance } from "perf_hooks";

const obs = new PerformanceObserver(list => {
  const time = list.getEntries()[0].duration;
  if (parentPort) {
    parentPort.postMessage(time);
  }
  performance.clearMarks();
});
obs.observe({ entryTypes: ["measure"] });

const { filename } = workerData;

performance.mark("A");
const { ignored, inferredParser } = getFileInfo.sync(filename);

if (ignored) {
  process.exit();
}

if (!inferredParser) {
  console.warn(colors.gray(`${filename} could not be formatted`));
  process.exit();
}

const text = readFileSync(filename, "utf8");

const options = resolveConfig.sync(filename);

const formattedText = prettier.format(text, {
  parser: inferredParser as any,
  ...options
});

writeFileSync(filename, formattedText);
performance.mark("B");
performance.measure("A to B", "A", "B");

if (parentPort) {
  parentPort.on("message", (time: number) => {
    console.log(
      text !== formattedText ? filename : colors.gray(filename),
      `${Math.round(time)}ms`
    );
    process.exit();
  });
}

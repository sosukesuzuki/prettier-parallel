import prettier from "prettier";
import colors from "colors/safe";
import { workerData } from "worker_threads";
import readFile from "./fs/readFile";
import writeFile from "./fs/writeFile";
import { performance } from "perf_hooks";

async function format(filename: string) {
  const start = performance.now();

  const { ignored, inferredParser } = await prettier.getFileInfo(filename);
  if (ignored || !inferredParser) {
    return;
  }
  const text = await readFile(filename);
  const formattedText = prettier.format(text, {
    parser: inferredParser as any
  });

  await writeFile(filename, formattedText);

  console.log(
    text === formattedText ? colors.gray(filename) : filename,
    `${Math.round(performance.now() - start)}ms`
  );
}

format(workerData.filename);

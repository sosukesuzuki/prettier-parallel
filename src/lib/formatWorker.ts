import prettier from "prettier";
import { workerData } from "worker_threads";
import readFile from "./fs/readFile";
import writeFile from "./fs/writeFile";

async function format(filename: string) {
  const text = await readFile(filename);
  const formattedText = prettier.format(text, { parser: "typescript" });
  await writeFile(filename, formattedText);
}

format(workerData.filename);

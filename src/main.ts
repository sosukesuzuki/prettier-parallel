import colors from "colors/safe";
import formatWithWorker from "./formatWithWorker";
import { getFileInfo } from "prettier";
import readFile from "./fs/readFile";
import writeFile from "./fs/writeFile";
import { performance } from "perf_hooks";

export default async function(filenames: string[]) {
  filenames.forEach(async filename => {
    try {
      const start = performance.now();

      const { ignored, inferredParser } = await getFileInfo(filename);
      if (ignored || !inferredParser) {
        return;
      }

      const text = await readFile(filename);

      const formattedText = await formatWithWorker(text, inferredParser);

      await writeFile(filename, formattedText);

      console.log(
        text !== formattedText ? filename : colors.gray(filename),
        `${Math.round(performance.now() - start)}ms`
      );
    } catch (error) {
      throw error;
    }
  });
}

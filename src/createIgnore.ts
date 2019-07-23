import { join } from "path";
import fs from "fs";
import { promisify } from "util";
import ignore from "ignore";

const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);

export default async function(
  dir: string,
  ignoreFilename = ".prettierignore"
): Promise<(path: string) => boolean> {
  const filePath = join(dir, ignoreFilename);

  const isExists = await exists(filePath);

  if (isExists) {
    const text = await readFile(filePath, "utf8");

    return ignore()
      .add(text)
      .createFilter();
  }

  return () => true;
}

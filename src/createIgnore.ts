import { join } from "path";
import { existsSync, readFileSync } from "fs";
import ignore from "ignore";

export default function(
  dir: string,
  ignoreFilename = ".prettierignore"
): (path: string) => boolean {
  const filePath = join(dir, ignoreFilename);

  const isExists = existsSync(filePath);

  if (isExists) {
    const text = readFileSync(filePath, "utf8");

    return ignore()
      .add(text)
      .createFilter();
  }

  return () => true;
}

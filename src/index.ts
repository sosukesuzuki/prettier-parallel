import glob from "glob";
import createWorker from "./createWorker";
import { promisify } from "util";
import createIgnore from "./createIgnore";

function isVersionCheck(arg: string): boolean {
  return arg === "--version" || arg === "-v";
}

const runGlob = promisify(glob);

export async function run(args: string[]) {
  if (args.length === 0) {
    process.exit();
  }

  if (isVersionCheck(args[0])) {
    console.log("1.0.0");
    process.exit();
  }

  try {
    const files = await runGlob(args[0]);

    if (files.length === 0) {
      console.log(`There are no files matched to ${args[0]}`);
      process.exit();
    }

    const rootIgnore = await createIgnore(process.cwd());

    const targetFiles = files.filter(rootIgnore);

    for (let i = 0; i < targetFiles.length; i++) {
      createWorker(targetFiles[i]);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

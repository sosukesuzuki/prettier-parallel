import globby from "globby";
import minimist from "minimist";
import createWorker from "./createWorker";
import createIgnore from "./createIgnore";

export function run(args: string[]) {
  if (args.length === 0) {
    process.exit();
  }

  const options = minimist(args);

  const isVersionCheck = options.version || options.v;
  const ignorePath = options["ignore-path"];

  if (isVersionCheck) {
    console.log("1.0.0");
    process.exit();
  }

  try {
    const files = globby.sync(args, { dot: true });

    if (files.length === 0) {
      console.log(`There are no files matched to ${files[0]}`);
      process.exit();
    }

    const rootIgnore = createIgnore(process.cwd(), ignorePath);

    const targetFiles = files.filter(rootIgnore);

    for (let i = 0; i < targetFiles.length; i++) {
      createWorker(targetFiles[i]);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

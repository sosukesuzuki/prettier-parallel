import glob from "glob";
// import createWorker from "./createWorker";

function isVersionCheck(arg: string): boolean {
  return arg === "--version" || arg === "-v";
}

function runGlob(pattern: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(pattern, (err, matches) => {
      if (err) {
        reject(err);
      }
      resolve(matches);
    });
  });
}

export function run(args: string[]) {
  if (args.length === 0) {
    process.exit();
  }

  if (isVersionCheck(args[0])) {
    console.log("1.0.0");
    process.exit();
  }

  runGlob(args[0])
    .then(files => {
      if (files.length === 0) {
        console.log(`There are no files matched to ${args[0]}`);
        process.exit();
      }
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });

  // program.version("1.0.0").parse(process.argv);

  // for (let i = 0; i < program.args.length; i++) {
  //   createWorker(program.args[i]);

  // }
}

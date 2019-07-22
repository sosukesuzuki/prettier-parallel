import program from "commander";
import createWorker from "./createWorker";

export function run() {
  program.version("1.0.0").parse(process.argv);

  for (let i = 0; i < program.args.length; i++) {
    createWorker(program.args[i]);
  }
}

import program from "commander";
import formatWithWorker from "./formatWithWorker";

export function run() {
  program
    .version("1.0.0")
    .arguments("<filename>")
    .parse(process.argv);

  for (let i = 0; i < program.args.length; i++) {
    formatWithWorker(program.args[i]);
  }
}

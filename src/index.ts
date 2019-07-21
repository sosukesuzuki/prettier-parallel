import program from "commander";
import formatWithWorker from "./formatWithWorker";

export function run() {
  program
    .version("1.0.0")
    .arguments("<filename>")
    .parse(process.argv);

  program.args.map(filename => formatWithWorker(filename));
}

import program from "commander";
import main from "./main";

export function run() {
  program
    .version("1.0.0")
    .arguments("<filename>")
    .parse(process.argv);

  if (program.args.length === 0) return;

  const filenames = program.args;

  main(filenames);
}

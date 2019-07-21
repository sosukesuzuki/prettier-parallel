import program from "commander";

export default function() {
  program
    .version("1.0.0")
    .arguments("<filename>")
    .parse(process.argv);

  if (program.args.length === 0) return;

  const filenames = program.args;

  import("..").then(main => {
    main.default(filenames);
  });
}

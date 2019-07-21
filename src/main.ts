import formatWithWorker from "./formatWithWorker";

export default function(filenames: string[]) {
  filenames.map(filename => formatWithWorker(filename));
}

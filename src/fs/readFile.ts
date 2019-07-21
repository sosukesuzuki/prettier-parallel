import { readFile } from "fs";

export default function(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(path, "utf8", (error, data) => {
      if (error) {
        reject(error);
      }
      return resolve(data);
    });
  });
}

import { writeFile } from "fs";

export default function(path: string, data: string): Promise<void> {
  return new Promise((resolve, reject) => {
    writeFile(path, data, error => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

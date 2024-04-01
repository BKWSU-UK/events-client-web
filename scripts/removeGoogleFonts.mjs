import { resolve } from "path";
import { readdirSync, readFileSync, writeFileSync } from "fs";

async function getFiles(dir) {
  const dirents = readdirSync(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }),
  );
  return Array.prototype.concat(...files);
}

const allFiles = await getFiles("./build");

function replaceInFiles(replaceStr) {
  for (const file of allFiles) {
    if (file.match(/.+\.css/)) {
      console.log("file", file);
      const text = readFileSync(file);
      if (text.includes(replaceStr)) {
        console.log("file", file, "contains", replaceStr);
        const replaced = text.toString().replace(replaceStr, "");
        console.log("replaced", replaced);
        writeFileSync(file, replaced);
      }
    }
  }
}

replaceInFiles(
  "@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700);",
);
replaceInFiles(
  '@import\\"https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700\\";',
);

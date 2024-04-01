import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const scriptDir = path.dirname(__filename);
const basePath = path.resolve(scriptDir, "..");
const loaderPath = path.resolve(basePath, "examples", "loader");
const packageJsonPath = path.resolve(basePath, "package.json");

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const version = packageJson.version;

const exampleFiles = fs.readdirSync(loaderPath);
for (const exampleFile of exampleFiles) {
  if (exampleFile.endsWith(".html")) {
    const content = fs.readFileSync(
      path.resolve(loaderPath, exampleFile),
      "utf8",
    );
    const newContent = content.replace(
      /v[^\/]+\/(starter|loader).js/g,
      `v${version}/$1.js`,
    );
    fs.writeFileSync(path.resolve(loaderPath, exampleFile), newContent, "utf8");
  }
}

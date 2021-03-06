import * as fs from "fs";

/**
 * Typing for the fields of package.json we care about
 */
export interface PackageJson {
  main: string;
}

/**
 * @param  packageJsonPath Path to package.json
 * @param  loadPackageJson Function that reads and parses package.json.
 * @param  fileExists Function that checks for existance of a file.
 * @returns string
 */
export function readPackage(
  packageJsonPath: string,
  // tslint:disable-next-line:no-any
  loadPackageJson: (file: string) => any = loadJsonFromDisk,
  fileExists: (path: string) => boolean = fs.existsSync
): PackageJson | undefined {
  return (
    (packageJsonPath.match(/package\.json$/) &&
      fileExists(packageJsonPath) &&
      loadPackageJson(packageJsonPath)) ||
    undefined
  );
}

function loadJsonFromDisk(file: string): {} {
  const packageJson = require(file);

  return packageJson;
}

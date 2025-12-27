import { fileURLToPath } from "url";
import { dirname } from "path";

/**
 * Returns the directory name and file name from a file URL.
 * @param {string} fileUrl - The file URL, usually `import.meta.url`.
 * @returns {{ __dirname: string, __filename: string }} An object containing the directory and file name.
 */
export default function fileToDirName(fileUrl) {
  const __filename = fileURLToPath(fileUrl);
  const __dirname = dirname(__filename);

  return { __dirname, __filename };
}

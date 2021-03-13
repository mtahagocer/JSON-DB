import { promises as fs } from 'fs';
import * as path from 'path';

class File {
    static checkDirectory = async (destination) => {
        const directory = path.join(destination)
        if (!fs.is(directory)) {
            await fs.mkdir(directory, { recursive: true });
        }
    };

    static readFile = async (sourcePath) => await fs.readFile(sourcePath, 'utf8');

    static copyFile = async (source, destination) => {
        await this.checkDirectory(destination);
        await fs.copyFile(source, destination);
    };

    static replaceInFile = async (sourcePath, destinationPath, replacements = []) => {
        await this.checkDirectory(destinationPath);
        let file = fs.readFileSync(sourcePath, 'utf8');
        replacements.forEach(({ oldContent, newContent }) => {
            file = file.replace(oldContent, newContent);
        });
        return fs.writeFile(destinationPath, file);
    };

    static applyPatch = async (sourcePath, params) => {
        const { pattern, patch } = params;
        if (!await this.readFile(sourcePath).includes(patch)) {
            await fs.writeFile(
                sourcePath,
                fs
                    .readFileSync(sourcePath, 'utf8')
                    .replace(pattern, (match) => `${match}${patch}`),
            );
        }
    };

    static writeFileAsync = async (path, content) => await fs.writeFile(path, content);
}

export default File

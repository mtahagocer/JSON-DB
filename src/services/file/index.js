import { promises as fs } from 'fs';
import * as path from 'path';

class File {
    static checkDirectory = async (destination) => {
        const directory = path.dirname(destination);
        if (!fs.is(directory)) {
            await fs.mkdir(directory, { recursive: true });
        }
    };

    static readFile = async (sourcePath) => await fs.readFile(sourcePath, 'utf8');

    static copyFile = async (source, destination) => {
        return fs.copyFile(source, destination);
    };

    static copyFile = async (source, destination) => {
        this.checkDirectory(destination);
        await fs.copyFileSync(source, destination);
    };

    static applyPatch = async (path, params) => {
        const { pattern, patch } = params;
        if (!this.readFile(path).includes(patch)) {
            await fs.writeFileSync(
                path,
                fs
                    .readFileSync(path, 'utf8')
                    .replace(pattern, (match) => `${match}${patch}`),
            );
        }
    }

    static replaceInFile = async (sourcePath, destinationPath, replacements = []) => {
        await this.checkDirectory(destinationPath);
        let fileContent = await fs.readFileSync(sourcePath, 'utf8');
        replacements.map(({ oldContent, newContent }) => {
            fileContent = fileContent.replace(oldContent, newContent);
        });
        await fs.writeFileSync(destinationPath, fileContent);
    };

    static replaceInFileAsync = async (sourcePath, destinationPath, replacements = []) => {
        await this.checkDirectory(destinationPath);
        let fileContent = fs.readFileSync(sourcePath, 'utf8');
        replacements.forEach(({ oldContent, newContent }) => {
            fileContent = fileContent.replace(oldContent, newContent);
        });
        return fs.writeFile(destinationPath, fileContent);
    };

    static applyPatchAsync = (sourcePath, params) => {
        const { pattern, patch } = params;
        if (!await this.readFile(sourcePath).includes(patch)) {
            return fs.writeFile(
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

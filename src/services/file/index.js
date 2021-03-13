import { promises as fs } from 'fs';
import * as path from 'path';

class File {
    static async checkDirectory(destination) {
        const directory = path.join(destination)
        if (!fs.is(directory)) {
            await fs.mkdir(directory, { recursive: true });
        }
    };

    static async readFile(sourcePath) {
        await fs.readFile(sourcePath, 'utf8');
    }

    static async copyFile(source, destination) {
        await this.checkDirectory(destination);
        await fs.copyFile(source, destination);
    };

    static async replaceInFile(sourcePath, destinationPath, replacements = []) {
        await this.checkDirectory(destinationPath);
        let file = fs.readFileSync(sourcePath, 'utf8');
        replacements.forEach(({ oldContent, newContent }) => {
            file = file.replace(oldContent, newContent);
        });
        return fs.writeFile(destinationPath, file);
    };

    static async applyPatch(sourcePath, params) {
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

    static async writeFileAsync(path, content) {
        await fs.writeFile(path, content);
    }
}

export default File

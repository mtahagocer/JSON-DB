import * as fs from 'fs';
import * as path from 'path';

class File {
    static isExist(sourcePath) {
        return fs.existsSync(sourcePath);
    }

    static async checkDirectory(destination) {
        const directory = path.join(__dirname, destination);

        if (!this.isExist(directory)) {
            await fs.mkdir(directory, { recursive: true });
        }
    }

    static async readFile(sourcePath) {
        await fs.readFile(sourcePath, 'utf8');
    }

    static async copyFile(source, destination) {
        await this.checkDirectory(destination);
        await fs.copyFile(source, destination);
    }

    static async replaceInFile(sourcePath, destinationPath, replacements = []) {
        await this.checkDirectory(destinationPath);
        let file = fs.readFileSync(sourcePath, 'utf8');

        replacements.forEach(({ oldContent, newContent }) => {
            file = file.replace(oldContent, newContent);
        });
        return fs.writeFile(destinationPath, file);
    }

    static async applyPatch(sourcePath, params) {
        const { pattern, patch } = params;

        if (!await this.readFile(sourcePath).includes(patch)) {
            await fs.writeFile(
                sourcePath,
                fs.readFileSync(sourcePath, 'utf8').replace(pattern, (match) => `${match}${patch}`)
            );
        }
    }

    static async writeFile(filePath, content) {
        await fs.writeFile(filePath, content);
    }

    static async mkdir(filePath) {
        await fs.mkdir(path.join(filePath), { recursive: true });
    }

}

export default File;

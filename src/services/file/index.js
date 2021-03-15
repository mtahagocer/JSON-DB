import * as fs from 'fs';
import * as path from 'path';
class File {
    static resolveBasePath = (destinationPath) => path.join(__dirname, '../../../', destinationPath)
    static isExist(sourcePath) {
        return fs.existsSync(sourcePath);
    }

    static async checkDirectory(destination) {
        const directory = this.resolveBasePath(destination);
        console.log({ directory });
        if (!this.isExist(directory)) {
            await fs.mkdir(directory, { recursive: true }, (err) => {
                if (err) throw err;
            });
        }
    }

    static async readFile(sourcePath) {
        await fs.readFile(sourcePath, 'utf8');
    }

    static async copyFile(source, destination) {
        await this.checkDirectory(destination);
        await fs.copyFile(this.resolveBasePath(source), this.resolveBasePath(destination));
    }

    static async replaceInFile(sourcePath, destinationPath, replacements = []) {
        await this.checkDirectory(destinationPath);
        let file = fs.readFileSync(this.resolveBasePath(sourcePath), 'utf8');

        replacements.forEach(({ oldContent, newContent }) => {
            file = file.replace(oldContent, newContent);
        });
        return fs.writeFile(this.resolveBasePath(destinationPath), file, (err) => {
            if (err) throw err;
        });
    }

    static async applyPatch(sourcePath, params) {
        const { pattern, patch } = params;

        if (!await this.readFile(this.resolveBasePath(sourcePath)).includes(patch)) {
            await fs.writeFile(
                this.resolveBasePath(sourcePath),
                fs.readFileSync(sourcePath, 'utf8').replace(pattern, (match) => `${match}${patch}`)
            );
        }
    }

    static async writeFile(filePath, content) {
        await fs.writeFile(this.resolveBasePath(filePath), content, (err) => {
            if (err) throw err;
        });
    }

    static async mkdir(filePath) {
        await fs.mkdir(this.resolveBasePath(filePath), { recursive: true });
    }

}

export default File;

import * as fs from 'fs';
import * as path from 'path';
class File {
    static resolveBasePath = (destinationPath) => path.join(__dirname, '../../../', destinationPath)
    static isExist(sourcePath) {
        return fs.existsSync(sourcePath);
    }

    static async checkDirectory(sourcePath) {
        const directory = this.resolveBasePath(sourcePath);
        if (!this.isExist(directory)) {
            await fs.mkdir(directory, { recursive: true }, (err) => {
                if (err) throw err;
            });
        }
    }

    static readFile(sourcePath) {
        const directory = this.resolveBasePath(sourcePath);

        return new Promise((resolve, reject) => {
            fs.readFile(directory, (err, readedData) => {
                // throw new CustomError(err.message);
                if (err) reject(err);
                resolve(JSON.parse(readedData));
            });
        });
    }

    static async deleteFile(sourcePath, force = false) {
        const directory = this.resolveBasePath(sourcePath);
        await fs.rmdirSync(directory, { recursive: force });
    }

    static async copyFile(source, destination) {
        await this.checkDirectory(destination);
        await fs.copyFile(this.resolveBasePath(source), this.resolveBasePath(destination));
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

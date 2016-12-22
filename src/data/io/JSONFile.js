import fs from 'pn/fs';

class JSONFile {
    static read(filepath) {
        return fs.readFile(filepath)
            .then((data) => {
                return JSON.parse(data);
            });
    }

    static write(filepath, data) {
        return fs.writeFile(filepath, JSON.stringify(data));
    }
}

export default JSONFile;
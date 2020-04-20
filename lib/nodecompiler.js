const styles = require('./styles');
const log = require('./log');
const path = require('path');
const fs = require('fs-extra');
const parser = require('comments-parser');
const bytenode = require('bytenode');

const status = {
    success: {
        message: 'success',
        color: styles.FgGreen
    },
    error: {
        message: 'error',
        color: styles.FgRed
    }
};


class NodeCompiler {
    _roules = {
        to: "./NodeCompiler",
        compile: {
            items: [],
            ignore: []
        },
        copy: {
            items: [],
            ignore: [],
            overwrite: {
                items: [],
                contents: []
            },
        }
    };

    constructor() {
        if (this._initialize()) {
            if (!fs.existsSync(this._roules.to))
                fs.mkdirSync(this._roules.to);

            for (let i in this._roules.compile.items)
                this._compile(this._roules.compile.items[i]);

            for (let i in this._roules.copy.items)
                this._copy(this._roules.copy.items[i]);
        }
    }

    _initialize(callback) {
        let projetcPath = process.cwd();
        let roulesPath = path.normalize(projetcPath.concat('/', 'nodecompiler.json'));

        if (!fs.existsSync(roulesPath)) {
            log(status.error, 'nodecompiler.json file not found in ' + projetcPath);
            return false;
        }

        log();

        Object.assign(this._roules, require(roulesPath));
        this._roules.to = path.normalize(this._roules.to);

        return true;
    }

    _compile(from) {
        if (this._ignore('compile', from)) return;

        this._copyRecursive(from, (i, toItemPath) => {
            if (path.extname(toItemPath) == '.js') {
                bytenode.compileFile(toItemPath);
                this._dumpComments(toItemPath);
                fs.unlink(toItemPath);
            }

            log(status.success, toItemPath)
        });
    }

    _copy(from) {
        if (this._ignore('copy', from)) return;

        this._copyRecursive(from, (i, toItemPath) => {
            this._overwrite(this._roules.copy.overwrite.items.indexOf(from));
            log(status.success, toItemPath)
        });
    }

    _copyRecursive(from, callback) {
        let counter = 0;
        let copy = (from) => {
            let baseTo = path.normalize(this._roules.to.concat('/', from));

            if (fs.lstatSync(from).isFile()) {
                fs.writeFileSync(baseTo, fs.readFileSync(from));
                callback(1);
                return;
            }

            if (!fs.existsSync(baseTo))
                fs.mkdirSync(baseTo);

            let fromItems = fs.readdirSync(path.normalize(from));

            for (let i in fromItems) {
                let fromItem = fromItems[i];
                let fromItemPath = path.normalize(from.concat('/', fromItem));
                let toItemPath = path.normalize(this._roules.to.concat('/', from, '/', fromItem));

                if (fs.lstatSync(fromItemPath).isDirectory()) {
                    if (!fs.existsSync(toItemPath)) {
                        fs.mkdirSync(toItemPath);
                    }

                    copy(fromItemPath);
                    continue;
                }

                fs.writeFileSync(toItemPath, fs.readFileSync(fromItemPath));

                counter++;
                callback(counter, toItemPath);
            }
        };

        copy(from);
        return counter;
    }

    _ignore(action, from) {
        let ignore = this._roules[action].ignore.filter((item) => {
            let a = from.includes(item);
            let b = item.includes(from);

            return a || b;
        });

        return ignore.length > 0;
    }

    _overwrite(itemIndex) {
        if (itemIndex < 0) return;

        let overwritePath = path.normalize(this._roules.to.concat('/', this._roules.copy.overwrite.items[itemIndex]));
        let overwriteContent = this._roules.copy.overwrite.contents[itemIndex];

        fs.truncateSync(overwritePath);
        fs.appendFileSync(overwritePath, JSON.stringify(overwriteContent, null, "   "));
    }

    _dumpComments(filename) {
        let comments = parser(fs.readFileSync(filename));
        let mapFilename = filename.replace('.js', '.map');

        fs.writeJsonSync(mapFilename, comments);
    }
}

module.exports = () => {
    return new NodeCompiler();
}



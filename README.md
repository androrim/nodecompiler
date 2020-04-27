# Node Compiler

Node Compiler is powered by [bytenode](https://github.com/OsamaAbbas/bytenode "bytenode").

Compile your Node JavaScript. It is fast and simple.

PS.: Node Compiler runs only on JavaScript files, other files will be copied.

## Install

In your project, run:

NPM: `$ npm i @androrim/nodecompiler --save-dev`

Yarn: `$ yarn add @androrim/nodecompiler -D`

Or globally:

NPM: `$ npm install -g @androrim/nodecompiler`

Yarn: `$ yarn global add @androrim/nodecompiler`

## Configure

In the root folder of your project, create a nodecompiler.json.

Example:

    {
        "to": "../NodeCompiler", // Absolute or relative path to compiled result
        "compile": {
            "items": [
                "./app",
                "./bootstrap",
                "./public",
                "./config"
            ],
            "ignore": []
        },
        "copy": {
            "items": [
                "./database",
                "./resources",
                "./main.js",
                "./package.json",
            ],
            "ignore": [],
            "overwrite": {
                "items": [
                    "./package.json"
                ],
                "contents": [
                    {
                        "name": "nodecompiler",
                        "version": "1.0.0",
                        "description": "Node Compiler",
                        "main": "index.js"
                    }
                ]
            }
        }
    }

## Run Node Compiler

If Node Compiler is installed globally, run in the root folder:

`$ nodecompiler`

If it is installed as local dependency, create a new script entry on your package.json like:
```
...
"scripts" : {
    ...other commands
    "nodecompiler" : "nodecompiler"
}
```

And then run:

NPM: `$ npm run nodecompiler`

Yarn: `$ yarn nodecompiler`

## Details

Annotations of JavaScript files will be extracted and saved in FileName.map in same origin file folder.

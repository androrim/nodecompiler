# Node Compiler
Node Compiler is powered with [bytenode](https://github.com/OsamaAbbas/bytenode "bytenode").

Compile your Node JavaScript project. Is fast an simple.

PS.: Node Compiler run only JavaScript files. Other files is copied.

## Install
In your projec
`$ npm i @androrim/nodecompiler --save-dev`

Or globally
`$ npm install -g @androrim/nodecompiler`

## Configure 
In root folder of your project, create a nodecompiler.json.

Example:

    {
        "to": "../NodeCompiler", // Absolute or relative path to compliled result
        "compile": {
            "items": [ 
                "./app",
                "./bootstrap",
                "./public",
                "./config"
            ],
            "ignore": [
            ]
        },
        "copy": {
            "items": [
                "./database",
                "./resources",
                "./.env",
                "./main.js",
                "./index.js",
                "./package.json",
                "./spinner.html"
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
In root folder execute Node Compiler.

`$ nodecompiler`

## Details 
Annotations of JavaScript files will be extractd an save in FileName.map in same origin file folder.
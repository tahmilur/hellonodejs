https://nodejs.org/en/
https://nodejs.dev/learn
https://nodejs.dev/learn/the-package-json-guide
https://code.visualstudio.com/docs/nodejs/nodejs-tutorial


// remove modules folders including subfolder. add few lines inside package.json:
rmdir /s /q node_modules

"scripts": {
  ...
  "clean": "rmdir /s /q node_modules",
  "reinstall": "npm run clean && npm install",
  "rebuild": "npm run clean && npm install && rmdir /s /q dist && npm run build --prod",
  ...
}

// npm package manager
-----------------------------------------------------------------------------------------------------------------------
a. node --version                               -> version of the nodejs
b. npm --version                                -> version of the nodejs package manager
c. npx <packagename>                            -> find the package location

a. node <filename>                              -> run the application
b. npm run <task-name>                          -> run the application

0. npm root -g                                  -> global package location in your machine
0. npm list                                     -> all installed local npm packages
0. npm list -g                                  -> all installed global npm packages
0. npm list --depth=0                           -> display only top-level packages
0. npm list minimist                            -> dependencies of packages you installed
0. npm list <package-name>                      -> get the information of a specific package

0. npm view <package-name> version             	-> get the version of a specific package
0. npm view <package-name> versions             -> view versions of a package available

0. npm outdated                                 -> To discover new releases of the packages
0. npm update                                   -> Updating packages
0. npm install -g npm-check-updates             -> To update to a new major version all the packages, install globally, then run
   ncu -u

1. npm install                                  -> Installing all dependencies in node_modules folder
1. npm install <package>@<version>              -> install specific version
2. npm install <package-name>                   -> Installing a single package in node_modules folder
3. npm install -g <package-name>                -> Installing a single package in global module folder
4. npm install <package-name> --save            -> installs and adds the entry to the package.json file dependencies
5. npm install <package-name> --save-dev        -> installs and adds the entry to the package.json file devDependencies

0. npm uninstall <package-name>                 -> unstall package. use flag: -S/--save , -D/----save-dev, -g  : remove from file and globally
0. npm uninstall -S <package-name>		-> -S / --save
0. npm uninstall -D <package-name>		-> -D / --save-dev
0. npm uninstall -g <package-name> 		-> -g / --global

6. npm update                                   -> Updating packages
7. npm update <package-name>                    -> single package to update
8. npm run <task-name>                          -> Running Tasks

    package.json
    {
        "scripts": {
            "start-dev": "node lib/server-development",
            "start": "node lib/server-production"
        },
    }

1. create a siple nodejs application
Let's get started by creating the simplest Node.js application, "Hello World".
--------------------------------------------------------------------------------
mkdir hello
cd hello
code .

filename: app.js
--------------------------------------------------------------------------------
var msg = 'Hello World';
console.log(msg);

Running Hello World
--------------------------------------------------------------------------------
node app.js

2. An Express application

a) npm install -g express-generator
b) express myExpressApp --view pug
c) cd myExpressApp
d) npm install
e) npm start
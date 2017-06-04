# chibitronics target for PXT

This target allow to program a [Chibitronics](https://www.chibitronics.com/) using 
PXT ([Microsoft Programming Experience Toolkit](https://github.com/Microsoft/pxt)).

* Currently hosted at https://makecode.chibitronics.com

## Local server

The local server allows to run the editor and the documentation from your computer.

### Setup

The following commands are a 1-time setup after synching the repo on your machine.

* See requirements for [pxt](https://github.com/Microsoft/pxt)
* [clone this repo](https://help.github.com/articles/cloning-a-repository/) to your computer and go in the project folder
```
git clone https://github.com/microsoft/pxt-chibitronics
cd pxt-chibitronics
```
* install the PXT command line (add ``sudo`` for Mac/Linux shells).
```
npm install -g pxt
```
* install the dependencies
```
npm install
```
* To compile locally, install platformio and dependencies
```
pip install -U platformio
platformio platform install https://github.com/xobs/platformio-ltc

### Developing

To develop, go into one of the lib directories and run ``pxt build``.  For example, to work on the *core* library, go to *libs/core/* and run ``pxt build``.

### Running

Run this command to open a local web server (add ``sudo`` for Mac/Linux shells)
```
pxt serve
```
If the local server opens in the wrong browser, make sure to copy the URL containing the local token. 
Otherwise, the editor will not be able to load the projects.

If you need modify the `.cpp` files, turn on yotta compilation with the ``-yt`` flag (add ``sudo`` for Mac/Linux shells):
```
pxt serve -yt
```

## Updates

To update your PXT version and make sure you're running the latest tools, run (add ``sudo`` for Mac/Linux shells)
```
pxt update
```

More instructions at https://github.com/Microsoft/pxt#running-a-target-from-localhost

## Jenkins build
https://ci2.dot.net/job/Private/job/pxt_project_yellow/job/master/

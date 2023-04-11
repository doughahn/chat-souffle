# Chat Soufflé

This is a Twine project that integrates xAPI. It requires [Tweego](https://github.com/tmedwards/tweego) and uses [Sugarcube 2](https://www.motoslave.net/sugarcube/2/docs/). 

## Tweego

### Requirements

You'll need [NodeJS](docs/installing-node.md) and [Tweego](docs/installing-tweego.md).  We used the [Tweego boilerplate](https://github.com/ChapelR/tweego-setup) to start this project. Please refer to their readme for full documentation. 

### Installation

Clone or download this repo.  Open a command prompt and navigate to the root directory (where the `package.json` file is) and run the command `npm install`. 

### Structure

#### Compiler Output

`dist` is where Tweego's `index.html` file compiles to *by default*. You can change this in `/package.json.` 

This project uses custom settings: an `index.html` in the root with a landing page, and a a production file with the twine at `/souffle.html.` GitHub pages deploys from these files.

#### Source Files

The `project` folder contains passages.

The `src` contains the source JavaScript and CSS. There are several JS files in there, they need to be added and loaded in order:

![](https://i.imgur.com/TvhBJzl.png)

### CLI

There are more commands in the original docs. These are the ones I find useful. 
* `npm run build`: Compiles everything with Tweego and drops the compiled `index.html` file in the `dist` directory.)

* `npm run build:test`: As `npm run build`, but compiles your story in test mode to the `src` directory. I intend to change this to `/test` at some point. 

## xAPI Integration

You can add raw code to passages in Sugarcube or use `<<script>></script>` shortcode. We have two external libraries: the [ADL xAPI 1-11 wrapper](https://github.com/adlnet/xAPIWrapper) hosted on a teammate's digital ocean server, and [crypto.js](https://github.com/brix/crypto-js), which is a dependency of the ADL wrapper itself. 

All the xAPI statements are located in `src/scripts/js/xapi-statements`.

### Verbs

Our project's verb list can be found [here](https://docs.google.com/spreadsheets/d/1qf47gYZWVAjUKNVpsd0DShU309cwUStDkfxgojpdWrY/edit?usp=sharing). The `scripts` directory has a `verbs` dir with each verb.  

## Wiki

We're builfing out a wiki. Refer to that for more!
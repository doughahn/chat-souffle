# Chat Soufflé

This is a [Learning Guild project for the Spring 2023 xAPI Cohort](https://xapicohort.com/?utm_campaign=xapi-s23).

## Overview

This interactive LX is built in Twine, connected to a [Veracity LRS](https://lrs.io), and enabled with a lot of hand-crafted xAPI. The project aims to get using ChatGPT in a structured way, while collecting anonymized data about their sentiments to AI.

## Requirements

This is a Twine project that's pretty heavy on custom javascript, html, and css. It requires [Tweego](https://github.com/tmedwards/tweego) and uses [Sugarcube 2](https://www.motoslave.net/sugarcube/2/docs/). 

## Get Tweego Up and Running

You'll need [NodeJS](docs/installing-node.md) and should follow the [Installing Tweego](docs/installing-tweego.md) guide. We used the [Tweego boilerplate](https://github.com/ChapelR/tweego-setup) to start this project. Please refer to their readme for full documentation. 

### Installation

Clone or download this repo.  Open a command prompt and navigate to the root directory (where the `package.json` file is) and run the command `npm install`. 

### Compiler Output

`dist` is where Tweego's `index.html` file compiles to *by default*. You can change this in `/package.json.` 

This project uses custom settings: an `index.html` in the root with a landing page, and the twine experience at `/souffle.html.` GitHub pages deploys from these files.

### Source Files

The `project` folder contains the passages. 

The `src` contains the source JavaScript and CSS. There are several JS files in there, they need to be added and loaded in order:

![](https://i.imgur.com/2DCMXdF.png)

### Building the Project

* `npm run build` Compiles everything with Tweego and drops the compiled `souffle.html` file in the `/` directory.)

* `npm run build:test`: As `npm run build`, but compiles your story in test mode to the `dist` directory. (I intend to change this to `/test` at some point).

## xAPI Integration

You can add raw code to passages in Sugarcube or use `<<script>><</script>>` shortcode. 

We have two external libraries: the [ADL xAPI 1-11 wrapper](https://github.com/adlnet/xAPIWrapper) hosted on a teammate's digital ocean server, and [crypto.js](https://github.com/brix/crypto-js), which is a dependency of the ADL wrapper itself. 

### Verbs

Our project's verb list can be found [here](https://docs.google.com/spreadsheets/d/1qf47gYZWVAjUKNVpsd0DShU309cwUStDkfxgojpdWrY/edit?usp=sharing). The `scripts` directory has a `statements` dir with each verb.  


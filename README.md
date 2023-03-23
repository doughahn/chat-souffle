# Chat Soufflé

This is a Twine project that integrates xAPI. It requires [Tweego](https://github.com/tmedwards/tweego) and uses [Snowman 2](https://videlais.github.io/snowman/#/) as it makes decent use of custom code rather than Twee shortcodes. 

## Tweego

### Requirements

You'll need [NodeJS](docs/installing-node.md) and [Tweego](docs/installing-tweego.md).  We used the [Tweego boilerplate](https://github.com/ChapelR/tweego-setup) to start this project. Please refer to his readme for full documentaiton about getting going with Tweego. 

### Installation

Clone or download this repo.  Open a command prompt and navigate to the root directory (where the `package.json` file is) and run the command `npm install`.

### Structure

`dist` is where the project `index.html` file compiles to. Note that this github repo also has a `index.html` in the root; GitHub pages deploys from that file, and it can be manually copied from the `dist` folder to there and pushed when ready to deploy. Not ideal but it works for now.\

The `project` folder contains passages

The `src` contains the JavaScript and CSS. There are several JS files in there, they need to be added and loaded in order!

![](https://i.imgur.com/TvhBJzl.png)

### CLI

There are more commands in the original docs. These are the ones I find useful. 
* `npm run build`: Compiles everything with Tweego and drops the compiled `index.html` file in the `dist` folder.
* `npm run build:test`: As `npm run build`, but compiles your story in test mode.

## xAPI Integration

You can add raw code to passages in Snowman with the `<% your_code_here %>` shortcode. We have two external libraries: the [ADL xAPI 1-11 wrapper](https://github.com/adlnet/xAPIWrapper) hosted on a teammate's digital ocean server, and [crypto.js](https://github.com/brix/crypto-js), which is a dependency of the ADL wrapper itself. 

All the xAPI statements are located in `src/scripts/js/xapi-statements`.

### Verbs

Out project's verb list can be found [here](https://docs.google.com/spreadsheets/d/1qf47gYZWVAjUKNVpsd0DShU309cwUStDkfxgojpdWrY/edit?usp=sharing).

## Deploying Changes to Github Pages

I just put the `index.html` file in the root directory. I can't seem to get thins building quite right with go & twee, and I can;t seem to get Github to respect the `/dist` directory. Copying it from there fine for now. 

## Style Guide

Lots of hand coding here. I want to normalize asa much as I can so we have an easier time.

<details>
<summary>Multiple-Choice Forms</summary>

replace formName and form-name with the form's names, and options.

```js
  const formNameChoice = document.querySelector('input[name="mc-self-assess-choice"]:checked').value;

  var statement = {
    "actor": {
      "mbox": "mailto:doughahn@gmail.com",
      "name": actor,
      "objectType": "Agent"
    },
    "verb": {
      "id": "verb_id",
      "display": { "en-US": "answered" }
    },
    "object": {
      "id": "https://doughahn.github.io/chat-souffle/function_name",
      "definition": {
        "name": { "en-US": "" },
        "description": { "en-US": "" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": formNameChoice
    }
  };
```

```html
<form id="form-name" class="pure-form">
    <label for="form-name-opt-one" class="pure-checkbox">
        <input type="radio" name="form-name-choice" id="form-name-opt-one" value="No Experience" />No experience: I have never written a multiple choice assessment.
    </label>
    <label for="form-name-opt-two" class="pure-checkbox">
        <input type="radio" name="form-name-choice" id="form-name-opt-two" value="Novice" />Novice: I have sufficient knowledge of developing multiple choice assessments but I have not performed this task.
    </label>
    <label for="form-name-opt-three" class="pure-checkbox">
        <input type="radio" name="form-name-choice" id="form-name-opt-three" value="Beginner" />Beginner: I have performed this task occasionally. 
    </label>
    <label for="form-name-opt-four" class="pure-checkbox">
        <input type="radio" name="form-name-choice" id="form-name-opt-four" value="Intermediate" />Intermediate: This task has been a central part of my work. I have performed it myself routinely without any supervision. 
    </label>
    <label for="form-name-opt-five" class="pure-checkbox">
        <input type="radio" name="form-name-choice" id="form-name-opt-five" value="Advanced" />I have trained others in performance of this task and/or others have consulted me as an expert for assistance in performing this task.
    </label>
    <button type="button" onclick="send_form_name()" id="form-name-submit" class="pure-button pure-button-primary">Submit Your Choice</button>
</form>
```
</details>
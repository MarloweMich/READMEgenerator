const inquirer = require("inquirer");
const fs = require("fs");
const Choices = require("inquirer/lib/objects/choices");
const { createContext } = require("vm");
// const generateMarkdown = require("./utils/generateMarkdown.js");

const features = [];
const contributors = [];
var license = {};

//Array of questions for user input
const questionSet1 = [
  {
    type: "input",
    message: "What is the name of the project?",
    name: "name",
  },
  {
    type: "editor",
    message:
      "Briefly describe the project. Mention what problem it solves or what use it fills.",
    name: "desc",
  },
  {
    type: "editor",
    message: "Describe how to install and use the application",
    name: "usage",
  },
];
const questionSet2 = [
  {
    type: "input",
    message: "Specify a feature of this application",
    name: "feats",
  },
  {
    type: "confirm",
    message: "Add another feature?",
    name: "featsConfirm",
  },
];
const questionSet3 = [
  {
    type: "input",
    message: "Specify one contributor's github homepage.",
    name: "conts",
  },
  {
    type: "confirm",
    message: "Add another contributor?",
    name: "contsConfirm",
  },
];

const questionSet4 = [
  {
    type: "list",
    message: "How can people get involved in the project?",
    name: "help",
    choices: [
      "Email a contributor about getting involved",
      "Make a pull request to get involved",
      "Message a contributor on social media to get involved",
      "No contributions will be accepted",
    ],
  },
  {
    type: "list",
    message: "What type of license will you be using for this project?",
    name: "license",
    choices: ["MIT", "ISC", "Unlicense", "WTFPL"],
  },
  {
    type: 'input',
    message: 'Copy and paste path to screenshot of application for the README.md, here.',
    name: 'image',
  },
];

//FUNCTIONS RUNNING THROUGH QUESTIONS AND STORING DATA
async function answerSet() {
  const data_1 = await inquirer.prompt(questionSet1);
  return featAnswer();

  async function featAnswer() {
    const data_2 = await inquirer.prompt(questionSet2);
    features.push(data_2.feats);
    if (data_2.featsConfirm === false) {
      return contsAnswer();
    } else {
      return featAnswer();
    }

    async function contsAnswer() {
      const data_3 = await inquirer.prompt(questionSet3);
      contributors.push(data_3.conts);
      console.log(contributors);
      if (data_3.contsConfirm === false) {

        const data_4 = await inquirer.prompt(questionSet4);
        if (data_4.license === "MIT") {
          license = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;} 
          else if (data_4.license === "ISC") {
          license = `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`;} 
          else if (data_4.license === "Unlicense") {
          license = `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)`;} 
          else if (data_4.license === "WTFPL") {
          license = `[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)`;}

        const ansObj = {
          name: (data_1.name),
          desc: (data_1.desc),
          usage: (data_1.usage),
          features: (features),
          contributors: (contributors),
          license: (license),
          help: (data_4.help),
          image: (data_4.image)
        };
        return ansObj;
      } else {
        return contsAnswer();
      }
    }
  }
}

//Function to write README file
function writeToFile(ansObj) {
  const generateMarkdown = function (ansObj) {
    const data = ansObj;
    let contsSplit = '';
    for (let i=0; i<contributors.length; i++){
      contsSplit+=`[${contributors[i]}](${contributors[i]})<br>  `
    }
    let featsSplit = '';
    for (let i=0; i<features.length; i++){
      featsSplit+=features[i]+'<br>  '
    }
    return `# ${data.name.trim('"')}

  ## Table of Contents
  [Description](##-description)\n
  [Usage](##-usage)\n
  [Credits](##-credits)\n
  [Features](##-features)\n
  [How to Contribute](##-how-to-contribute)\n

  ## Description
  
  - ${data.desc.trim('"')}
  
  ## Usage
  
  - ${data.usage.trim('"')}
  
  ## Credits
  ${contsSplit}

  ## Features

  ${featsSplit}
  
  ## How to Contribute 
  
  - ${data.help.trim('"')}"\n
  \n
  ${license}
  \n
  ![Screenshot](${data.image.trim('"')})`;
  };
  {
    fs.writeFile("README.md", generateMarkdown(ansObj), (err) => {
      if (err) throw err;
      console.log("Successfully wrote to README.md");
    });
  }
}

//Function to initialize app
const init = () => {
  answerSet().then(writeToFile);
};

// Function call to initialize app
init();

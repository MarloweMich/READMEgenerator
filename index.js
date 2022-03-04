// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const Choices = require("inquirer/lib/objects/choices");
// const generateMarkdown = require("./utils/generateMarkdown.js");

const features = [];
const contributors = [];
// const answers = [];
// TODO: Create an array of questions for user input

const questionSet1 = [
  {
    type: "input",
    message: "What is the name of the project?",
    name: "name",
  },
  {
  type: 'editor',
  message: 'Briefly describe the project. Mention what problem it solves or what use it fills.',
  name: 'desc'
  },
  {
  type: 'editor',
  message: 'Describe how to install and use the application',
  name: 'usage'
  }
];

const questionSet2 =
  [
    {
      type: "input",
      message: "Specificy a feature of this application",
      name: "feats",
    },
    {
      type: "confirm",
      message: "Add another feature?",
      name: "featsConfirm",
    },
  ];
const questionSet3 =
  [
    {
      type: "input",
      message: "Specify first contributor and their github homepage. Format as: (contributor, github)",
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
      "email me",
      "just make a pull request",
      "message me on social media",
    ],
  },
  {
    type: "list",
    message: "What type of license will you be using for this project?",
    name: "license",
    choices: ["MIT", "ISC", "Unlicense", "WTFPL"],
  },
]


async function answerSet() {
  const data_1 = await inquirer.prompt(questionSet1);
//   const set1Arr = [data_1.name, data_1.desc, data_1.usage];
  // const set1Arr = [data_1.name];
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
      if (data_3.contsConfirm === false) {
        const data_4 = await inquirer.prompt(questionSet4);
        // const set4Arr = [data_4.help, data_4.license]
        // console.log(`feats: ${features}`);
        // console.log(`conts: ${contributors}`);
        // console.log(`set1arr: ${set1Arr}`);
        // console.log(`set4arr: ${set4Arr[1]}`);
        // answers.splice(0, 0, set1Arr, features, contributors, set4Arr);
        // const dataArr = answers.concat(set1Arr, features, contributors, set4Arr);
        // const bigData = new ansObj(set1Arr[0].value, set1Arr[1], set1Arr[2], features, contributors, set4Arr[0], set4Arr[1])
        // const bigData = new ansObj(answers);
        // console.log(data_1.name);
        // console.log(data_1);
        // console.log(data_4);
        // console.log(answers);
        // console.log(answers[0]);
        const ansObj = {
              name: JSON.stringify(data_1.name),
              desc: JSON.stringify(data_1.desc),
              usage: JSON.stringify(data_1.usage),
              features: JSON.stringify(features),
              contributors: JSON.stringify(contributors),
              license: JSON.stringify(data_4.license),
              help: JSON.stringify(data_4.help),
              }
        const ansTring = JSON.stringify(ansObj);
        // console.log(ansTring);
        // console.log(typeof ansTring);
        // console.log(ansTring.name)
        // console.log(JSON.parse(ansTring))
        // console.log(JSON.parse(ansTring.name))
          // console.log(typeof ansObj)
          // console.log(ansObj.name)
          // console.log(ansObj)
        
        return ansTring;
      } else {
        return contsAnswer();
      } 
    } 
  }
}

// TODO: Create a function to write README file
function writeToFile(ansTring) {
const generateMarkdown = function(ansTring) {
  const data = JSON.parse(ansTring);
  return`# ${data.name}

  ## Description
  
  - ${data.desc}
  
  ## Table of Contents
  -Usage\n
  -Credits\n
  -License\n
  -Features\n
  -Contribute\n
  
  ## Usage
  
  - ${data.usage}
  
  ## Credits
  ${contributors[0]}\n
  ${contributors[1]}\n
  ${contributors[2]}\n
  ${contributors[3]}\n
  ${contributors[4]}\n

  ## License
  
  -badge
  
  ## features
  ${features[0]}\n
  ${features[1]}\n
  ${features[2]}\n
  ${features[3]}\n
  ${features[4]}\n
  
  
  ## contribute 
  
  - ${data.help}`;
}
{fs.writeFile('README.md', generateMarkdown(ansTring), (err) => {
  if (err) throw err; console.log('Successfully wrote to README.md')})}
}

// TODO: Create a function to initialize app
const init = () => {
answerSet()
    .then(writeToFile)
}

// Function call to initialize app
init();




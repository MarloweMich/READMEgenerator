// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
const index = require('../index.js')

// const MITbadge = 

function renderLicenseBadge(license) {
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
const generateMarkdown = (data) => {
//   const data = JSON.parse(ansTring);
  return `# ${data.name}

  ## Description
  
  - ${data.desc}
  
  ## Table of Contents
  -Usage
  -Credits
  -License
  -Features
  -Contribute
  
  ## Usage
  
  - ${data.usage}
  
  ## Credits
  
  -create list all contributors
  ${data.contributors[0]}
  ${data.contributors[1]}
  ${data.contributors[2]}
  ${data.contributors[3]}
  ${data.contributors[4]}

  ## License
  
  -badge
  
  ## features
  
  -create list for each feature 
  ${data.features[0]}
  ${data.features[1]}
  ${data.features[2]}
  ${data.features[3]}
  ${data.features[4]}
  
  
  ## contribute 
  
  - ${data.help}`;
}

module.exports = generateMarkdown;



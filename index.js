// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = ['Provide a title for your project', 'What was your motivation?', 'What did you learn?', 'What are the steps required to install your project?', 'Provide instructions and examples for use.', 'Choose a license.'];

const getAnswer = () => {
    return inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: questions[0],
      },
    {
      type: 'input',
      name: 'motivation',
      message: questions[1],
    },
    {
      type: 'input',
      name: 'learning',
      message: questions[2],
    },
    {
      type: 'input',
      name: 'steps',
      message: questions[3],
    },
    {
      type: 'input',
      name: 'instructions',
      message: questions[4],
    },
    {
        type: 'list',
        name: 'license',
        message: questions[5],
        choices: ["Apache", "IBM", "MIT", "Mozilla", "Unlicense", "None"]
      },
  ])}; 


// TODO: Create a function to write README file
function writeToFile(filename, data) {
fs.writeFile(filename, data, (err) => {}
  );
};


// TODO: Create a function to initialize app
function init() {
    getAnswer()
    .then ((data) => writeToFile('README.md', generateMarkdown(data)))
    .then(() => console.log('Successfully wrote to README.md'))
    .catch((err) => console.error(err));
}

// Function call to initialize app
init();

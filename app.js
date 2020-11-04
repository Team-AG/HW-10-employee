// Below has NPM Packages
const inquirer = require("inquirer");
const path = require("path");

// Write file fs to .html
const fs = require("fs");


// Going to Output Folder
const OUTPUT_DIR = path.resolve(__dirname, "output");
// make a folder in the output and create a team.html file
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Job Titles
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//const mainHTML = require('./templates/mainHTML');


const render = require("./lib/htmlRenderer");


//arrays
const employersId = []
const dreamTeam = []


// Main Initial prompt
function appMain() {

    // CALLS OUT FUNCTION FOR PROMOTING MANGER QUESTIONS
    managerInput()

    // PROMPTS MANAGER QUESTIONS
    function managerInput() {

        // CONSOLE LOG A MESSAGE 
        console.log('Please provide your information as you will be prompted to answer personal question, in which you will have the opportunity to add to your dream team. ');

        // GENERATE QUESTIONS WHILE COLLECTING data
        inquirer.prompt([{
                    type: "input",
                    name: "managerFullLegalName",
                    message: "First and last name:"
                },
                {
                    type: "input",
                    name: "managerEmploymentId",
                    message: "Please provide your employment Id number"
                },
                {
                    type: "input",
                    name: "managerWorkEmail",
                    message: "Please provide us your work email?"
                },
                {
                    type: "input",
                    name: "managerDayTimeNumber",
                    message: "Please provide us your day time contact number"
                },
            ])
            // AFTER QUESTIONS GENERATE A NEW MANAGER INTO DREAM-TEAM array
            .then(data => {
                // THIS LETS THE SYSTEM KNOW THAT A VARIABLE MANAGER INTO A NEW MANAGER 
                const manager = new Manager(data.managerFullLegalName, data.managerEmploymentId, data.managerWorkEmail, data.managerDayTimeNumber);
                // PUSHES MANAGER INTO DREAM-TEAM array
                dreamTeam.push(manager);
                // CONSOLE LOG AND GENERATE NAME BASE ON DATA USER input
                console.log(`Congratulations ${data.managerFullLegalName} you have successfully been added as a manager role!`);
                // PUSH EMPLOYEE ID INTO THE array
                employersId.push(data.managerEmploymentId);
                addNewMember();
            });
    };

    // THIS FUNCTION PROMOTE TO ADD NEW MEMBERS INTO 
    function addNewMember() {
        // console log a message 
        console.log(`Your making tremendous process, lets build your dream team!`);
        // inquirer a and prompt question while collecting data
        inquirer.prompt([{
                type: "list",
                name: "employeeOptions",
                message: "Please choose from the following options: What member you would like to add?",
                choices: ["Engineer", "Intern", "none"],
            }, ])
            // collect the user input and re direct the user to the user into the correspondence function base on user input
            .then((data) => {
                // select engineer - redirect to add engineer function
                if (data.employeeOptions === "Engineer") {
                    return addEngineer();
                    // select intern redirect to add intern function
                } else if (data.employeeOptions === "Intern") {
                    return addIntern();
                    // output html file in output team function
                } else
                    return (addToTheDreamTeam());
            });
    };

    // generate a validate function 
    function validation(input) {
        if (!input) {
            return false;
        } else {
            return true;
        }
    };


    // input function 
    function addEngineer() {
        // PROMPT INQUIRER QUESTIONS BASE ON ENGINEER TO BE ADDED
        inquirer.prompt([{
                type: "input",
                name: "engineerFullLegalName",
                message: "Please provide the full legal name of the engineer:",
                validate: validation
            },
            {
                type: "input",
                name: "engineerEmploymentId",
                message: "Please provide the engineer employment Id:",
                validate: validation
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "Please Provide a valid Email for the engineer:",
                validate: validation
            },
            {
                type: "input",
                name: "engineerGithubUserName",
                message: "Please provide the Engineers GitHub username:",
                validate: validation
            },
            // COLLECTS USERS DATA TO GENERATE A NEW ENGINEER IN THE ARRAY DREAM Team
        ]).then(function (data) {
            // THIS VARIABLE TURNS ENGINEER INTO NEW ENGINEER
            const engineer = new Engineer(data.engineerFullLegalName, data.engineerEmploymentId, data.engineerEmail, data.engineerGithubUserName);
            // THIS PUSHES THE NEW ENGINEER DATA INTO THE DREAM TEAM ARRAY
            dreamTeam.push(engineer);
            // CONSOLE LOG USER ENGINEER NAME A WITH A SUCCESS STATEMENT
            console.log(`You have successfully added ${data.engineerFullLegalName} as a new Engineer!`);
            // THIS PUSHES EMPLOYEE ID INTO THE ARRAY 
            employersId.push(data.engineerEmploymentId);
            // console.log and generates a employee id into array
            console.log(`${data.engineerFullLegalName} employment ID is ${data.engineerEmploymentId}`);
            // after function then return into add to the dreamTeam
            return addToTheDreamTeam();
        })
    };

    // functions to add a Intern
    function addIntern() {
        // inquire a prompt input base on intern
        inquirer.prompt([{
                type: "input",
                name: "internFullLegalName",
                message: "Please provide the full legal name of the intern:",
                validate: validation
            },
            {
                type: "input",
                name: "internEmploymentId",
                message: "Please provide the intern employment Id:",
                validate: validation
            },
            {
                type: "input",
                name: "internEmail",
                message: "Please Provide a valid Email for the intern:",
                validate: validation
            },
            {
                type: "input",
                name: "internEducationalSchool",
                message: "Please provide the school of the intern in which he/she is attending:",
                validate: validation
            },
            // This collects the data and generate a intern into dream team array
        ]).then(function (data) {
            // Tells intern is = to new intern data which is collected base on the users input
            const intern = new Intern(data.internFullLegalName, data.internEmploymentId, data.internEmail, data.internEducationalSchool);
            // this pushes the new intern in the array dreamTeam
            dreamTeam.push(intern);
            // This makes a console log with users intern name and school
            console.log(`You have successfully added ${data.internFullLegalName} as a new intern from ${data.internEducationalSchool}!`);
            // this pushes the intern  employment id into array
            employersId.push(data.internEmploymentId);
            // Push users input data into the array of opID
            console.log(`${data.internFullLegalName} employment ID is ${data.internEmploymentId}`);
            // return the user to create a new employee or save and exit
            return addToTheDreamTeam();
        })

    };

    // Lets user add another person or save
    function addToTheDreamTeam() {
        // this prompts questions for the user
        inquirer.prompt([{
                type: 'list',
                name: 'addAnotherEmployee',
                message: 'Lets add more employees to the dream-team! If not you can save and always save your process and return later!',
                choices: ['Add to Dream-Team', 'Finish & Save'],
            }, ])
            // this collects the data dn redirects the user to the correct correspondence functions base on reposes
            .then(function (data) {
                // this directs to user to add another employee function add new member
                switch (data.addAnotherEmployee) {
                    case 'Add to Dream-Team': {
                        addNewMember();
                        break;
                    }
                    // if finish and save collect direct to save 
                    case "Finish & Save": {
                        save();
                        break;
                    }
                }
            });
    };

    // save function and starts function to create a html file function output team
    function save() {
        // save function and console log and return output team
        for (let i = 0; i < dreamTeam.length; i++) {
            console.log(`Check out your Dream-Team!! ${dreamTeam[i].name}.`);
            return outputTeam()
        };
    };
};


// This function creates an Html Document
const outputTeam = () => {
    const outputHTML = render(dreamTeam)
    // this generate the data into a fs file in html
    fs.writeFileSync(outputPath, outputHTML, "utf-8", (err) => {
        if (err)
            throw "notValid";
        console.log(err);
    });

};

// Operate the full function
appMain();

/*
    (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
        console.log("Success!")
    } else {
    
    */
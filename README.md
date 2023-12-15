# Technology used

The tech stacks used in this project were selected in accordance with the role requirements. They are:
- Typescript
- Nodejs 
- Nestjs
- typeOrm
- PostgreSQL

## Setting It up

To setup and run this project, you will need Nodejs, PostgreSQL and NPM installed on your environment. If you can also install Nestjs CLI, fine but if not, NPM will sufice.

With your environmment configured,make a copy of the example.env file to a new file called .env - this is where the configuration variables will be kept. After copying them, replace the placeholder values with your enviroment related values. After then run the following commands from the root of the project to get the project up and running

-  npm install  (this will install the project dependencies)
- npm run migration:run (this will create your database tables)
- nest start --watch(if you have Nest cli installed),else, run 'npm run start'. This will spin up the development server for you to be able test the project

## Available API Resources

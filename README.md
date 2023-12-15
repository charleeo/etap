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
4550 is the .env provided port. replace it with your port if you are using something different

- (`http://127.0.0.1:4550/api/v1/config`) To create the dependency data, call this API first before calling the rest

- (`http://127.0.0.1:4550/api/v1/reservation/book`) Use this to create a new reservation with any checkin_time  and expected_checkout_time of your choice. Also, proide the ID of the customer you are creating a reservation for. This is assumed to have exited. 

- (`http://127.0.0.1:4550/api/v1/reservation/checkout`) This is the main test agenda. When you provide a reservation ID as you will see in the collection documentation, the overstay charges will returned if any or 0 will be returned

## Assumption:
- Room rates were calculated from the sample data using the difference in hours between the checkin time and the expected checkout time. This gave the values per hour for the three rooms categories
- Also, if a customer was expected to checkout on a weekday, and overstayed to weekend, the weekend overstay hours are calculated differently from the other workdays overstay hours using their various rates.

### API POSTMAN Documentation/Collections
 (`https://documenter.getpostman.com/view/9486037/2s9Ykn7gZM`)

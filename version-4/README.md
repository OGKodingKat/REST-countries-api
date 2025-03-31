# Version 4
Countries- API Project Folder
- version-1
- version-2
- version-3
- version-4
- server
- Database - (Laura likes to start with the database so she can use Postman to ensure it's working.)
1. Create the table schema for the tables that I will need in my databse.
    1. saved_countries, users, country_count (Those are the tables, check to see how I set mine up)
    2. I can reference my airtable project for the table structure + data types.
(CREATE TABLE commands, listing the columns + data types)
2. Connect to our local databas using PGadmin
3. Run the commands to create our data tables.
- Web Server/API
1. Create a webserver folder inside the root countries-API folder, called 'server'
2. Inside the 'server' folder, create the web server instance:
    1. Adding NPM = package. json, installing express, installing pg, adding .gitignore, adding the src folder (see full list in ________)
3. Add the config file to connect to our database (same one used in our programming_languages in our ________)
4. Build our express app (in our index.js file), starting with our imports and the Express boilerplate code.
5. Reference our API endpoint document (that we created that listed out the different API endpdoints) create the endpoints and helper functions for each user action. POST - user submit form, POST - user adds a saved country, GET- get user data, POST - updates country count for each country. Be sure to have an API request for each of these user actions.
6. Test your endpoints using Postman (Optional) Ex: If I'm submitting the users info, you can send it in postman as a JSON object, and when you're running your server locally, ensure the user data has been added as a new row of data in the database. (You can check this by clicking "View All Data in PGAdmin).
- Frontend
1. Refactor the code (either local storage or Firebase) so that the user actions are tied to calling an API fetch request to the "localhost:3000/end-point". Ex: in the form component, you have an onsubmit where the user adds their user profile infor - you'd want to use a fetch - localhost:3000/add-user-profile to send user profile data. * Do this everywhere the user interacts with website: All POSTS and GET requests.
2. If you get to this step and you're seeing a "CORS" issue in the console, reach out to Laura, she will help trouble shoot







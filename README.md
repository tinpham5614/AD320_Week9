# AirBnB Search App
This application allows users to search AirBnB listings based on property type, number of bedrooms and number of beds.

## Usage
1. Clone this repository to your local machine.
2. In the terminal, navigate to the cloned repository and run npm install to install dependencies.
3. Create a .env file in the root of the project and add your MongoDB database credentials:
    MONGO_DB_USERNAME=<your-mongodb-username>
    MONGO_DB_PASSWORD=<your-mongodb-password>
    MONGO_DB_URL=<your-mongodb-url>
4. Run the server with the command npm start.
5. Open index.html in your browser.
6. Enter the desired search criteria in the input fields (property type, bedrooms, beds).
7. Click the "Search" button.
8. The application will make a fetch request to the server with the specified search criteria and display the results as a list of HTML elements containing the listing URL, name, summary, property type, number of bedrooms and number of beds.
## Technologies
Node.js
Express
MongoDB
HTML
CSS
JavaScript
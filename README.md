# UI Reminders Code Test

The project has been deployed [here](https://ui-reminders.netlify.app/)

## Technical Requirements

## Implemented user stories

- ​I as a user can create to-do items, such as a grocery list
- I as a user can mark to-do items as “done” - so that I can avoid clutter and focus on things that are still pending
- I as a user can filter the to-do list and view items that were marked as done - so that I can retrospect on my prior progress
- I as a user can create multiple to-do lists where each list has it's unique URL that I can share with my friends - so that I could have separate to do lists for my groceries and work related tasks

## Approach and process

#### Initial set up

- I began by planning the project on Miro with some initial ideas with an outline structure and functionality that needed to be implemented and on which component. I then created basic wireframes in Figma to outline essential design decisions
- I then set up the initial structure of the project by creating a React-App with the TypeScript template in a 'client' project folder and the server in a separate 'server' project folder
- I installed [Express JS](https://expressjs.com/) in the server to help the process of making requests to and responses from the backend quicker. After doing this I performed a basic test requesting data from the frontend and sending the data from the backend before moving on to the next step
- I installed [Axios](https://axios-http.com/docs/intro) for making requests as this works better than fetch across all browsers and also has built in features for transfomring requests and response data
- I also installed [CORS](https://www.npmjs.com/package/cors) in the server to easily enable cross origin resources
- In the client, I created the basic structure of a header, navbar and a component where a list form could be added

#### Creating a list

- Moving on to the 'create a list' component which would include the form for creating a list object. I first created a dummy object in the client component and tested this could be sent to the backend. As the project was created with TypeScript I created an interface for the list object which could be passed in as a type to the form
- After successfully passing an object to the backend I needed to ifnd a way of storing the objects so they could be edited and shared later on
- I created a [MongoDB](https://www.mongodb.com/) database where the list collection could be stored and installed [Mongoose](https://mongoosejs.com/docs/) as a way to manage the data with its schema validation and relationships
- At this early stage, I also structured the server folder with model, routes and controller folders
- After saving a list item to the database and rendering the newly added list in the frontend, I moved on to adding routes for adding to, deleting and editing list items with added reminder items
- I decided to deploy the project early with the frontend deployed to Netlify and the backend to Heroku

#### Storage of state

- When data was fetched from the database, I needed a state management system and initially went with useState. I quickly realised that this was not going to fulfill my requirements so decided to use Redux and [Redux Toolkit](https://redux-toolkit.js.org/) for storing and sharing state across the app
- Redux allowed me to share state and functionality easily across all components

#### Adding a reminder

- After successfully creating a list in the frontend, sending it to the backend and saving the list to the database, I moved on to adding reminders to the lists
- As with the list objects, I created a schema for reminders to validate the object when it was sent to the database. The list schema included a property for reminders as an array. Using the Mongoose 'put' method, I could easily add the reminder to the array in the list object
- I was following a mobile first approach to designing this app so implemented a modal to add a reminder. This was also a way to minimise changing pages
- I ensured I could add a reminder to the list array, then after that ensured I could delete a reminder from the list object
- At this point I also added a new route using React Router that would load a specific list so a direct link to the list could be shared
- Towards the end of the project I implemented the functionality for visibily showing when a reminder is complete along with the functionality for filtering complete and incomplete reminders

#### Modals and Responsiveness

- I had initially planned for all list data, as well as creating lists and adding reminders to take place within a modal and this suited the mobile first approach. However on a desktop I felt that a modal actually made the experience more complicated. For this reason, on a desktop information is displayed differently. I have tried to make the app as responsive and therefore as smooth possible, with minimal page changing or scrolling outside a page
- I prioritised using the CSS grid system as a way of controlling responsiveness and how elements adapt to screen sizes
- In addition to using the screen-width property in CSS, I also utilised the window.innerWidth tool for making some state responsive within the app itself and further improve responsiveness

#### Styling

- I intentionally kept styling quite minal, but took inspiration from classic textbooks which display textual information clearly
- I installed [sass](https://sass-lang.com/) as this would allow me to use variables for consistency such as spacing and fonts

#### Socket.IO

- When the first requirement was met, I moved on to trying to make the app collaborative in real time. I realised that how and where this functionality should be implemented had not been fully thought through and it proved difficult to decide how and where it could be utilised at a later stage
- In principle the process of using socket.io was straightforward, however I realised that I had multiple components which would need to be connected and it could get very messy
- I decided to move all of the socket related functionality into a separate file, with functions being called directly from components when events were performed

## Challenges

- I tried to avoid using type 'any', however have used it twice in the app - both in the state management when trying to assign a type to the payload which would change the state
- The collaboration in real time functionality has yet to be added, but I will continue to work on this app to implement this feature
- There were some challenges in passing data, state and functionality to a modal which resulted in a rather messy 'ListItem' file. This is the current solution for rendering a different element based on the size of the screen which could perhaps be broken down into multiple files and I will continue to explore this and what cleaner solution I can come up with
- I realised that the way I had been storing reminders could have been beter, and they should have been stored in a seprate collection and linked to the list collection and its reminder array through their unique IDs. This then made it more difficult to query and edit the nested arrays, but is not best practise so will be fixed

## Future improvements

- Referencing collections better
- List Item file performs too many functions and needs to be separated
- Ensuring the correct types are used
- Planning around how real-time collaboration could be utilised and where

## Packages used

- **CORS** - for cross origin resources
- **Express** - for routing
- **React Router** - for navigation in the client facing part of the project
- **UUID** - for generating unique IDs
- **Axios** - for cross origin resources
- **@reduxjs/toolkit** and **react-redux**- for state management
- **node-sass** and **@types/node-sass** - for additional features with styling

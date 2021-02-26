# a11ytweet is deployed here https://clever-kare-b13870.netlify.app/

This project uses the [Github REST API](https://docs.github.com/en/rest) to call up links to repos with 'a11y' in the title. 
If you want to raise awareness of accessible code you can sign up and retweet the repos using the button on the link list.
You can also save your favorites to a personal list. 

Tests are in frontend/src/__tests__ and in the backend folder under the files they test. 
You can run them using `jest` on the 
backend or `jest -u` to update the snapshots on the frontend. 

I used node express to build the routes on the backend, along with bcrypt to
encrypt passwords and JSON web tokens to authorize user routes. 

I installed CORS to allow the frontend to use the backend routes. 

I built the frontend using React, React-Redux 
(this holds the state of the user's favorited links, much like a shopping cart holds items) and tailwind for styling.
I made sure to use axios to allow me to make requests to Github's API as well as the routes on my backend.
I used redux-persist as well, to make sure that the user favorites persisted on refresh.

I also installed axe, a dev-tool to help with accessibility testing. 




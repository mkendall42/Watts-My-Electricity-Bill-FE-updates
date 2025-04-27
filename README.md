<h1 align="center">Watts My Electricity Bill</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Version">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/CSS-264de4?style=for-the-badge&logo=css3&logoColor=white" alt="CSS">
</p>

Watts My Electricity Bill? is an application that takes in user-specified parameters and returns information about the price of electricity in the area specified by the user.

It's seperated into many different components, which are detailed below.

-HomeContainer: this is the main view for a 'guest' user (i.e. someone who does not have an account / is not logged in).  This means that the main state var `user` is set to `''` during this time.  HomeContainer displays appropriate navigation links (which track active status / location) to SearchContainer (in case desiring to return) and the LoginContainer.  Within it is housed the SearchContainer and the ResultsContainer.  Please see detailed descriptions below.
- SearchContainer: this has a form that once filled out, sends a request to the backend (BE) with the user specified parameters. Basic validation and error handling occurs in the form, some during the form and some during an attempt at submission (when the button is clicked).  Crucially, the 'nickname' value must be unique for a user (if a guest, it is irrelevant).  Upon submission and successful processing, the BE will respond with a lot of data, captured in the state variable `results`.  This is then passed onto the ResultsContainer.
- ResultsContainer: this handles dynamic displaying of all received results.  Crucial information that is communicated here includes:
  - Basic text message with `'nickname` is present at the top
  - Two dropdown menus (handled by DropdownMenuContainer) allow for selecting timeframe (annual vs monthly) and type of utility rates (residential / commercial / industrial).  Based on the selections made here, different information is provided for the guest/user.
  - There is a save button at the bottom.  If a user is logged in, 


 The HomeContainer holds the SearchContainer and the ResultsContainer, with navLinks (tabs) to the SearchContainer and the LoginContainer.

The SearchContainer has a form that once filled out, sends a request to the backend with the user specified parameters. The results are displayed in the ResultsContainer, and state is updated upon each form submission.

The LoginContainer, '/login', has a dropdown list of users. Selecting a user and logging in will replace the HomeContainer with the UserContainer. This will contain another SearchContainer and ResultsContainer, but with a navLink to the UserReportsContainer and a 'save report' button. '/:user_id'.

The UserReportsContainer holds a list of buttons corresponding with the saved reports from the user. Clicking each button will update the ResultsContainer with the saved results. '/:user_id/:userReportsId'.

The UserContainer has a Logout button that returns the page back to the HomeContainer, '/'.

<h1 align="center">Watts My Electricity Bill</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Version">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/CSS-264de4?style=for-the-badge&logo=css3&logoColor=white" alt="CSS">
</p>

Watts My Electricity Bill? is an application that takes in user-specified parameters and returns information about the price of electricity in the area specified by the user.

It's seperated into a couple different components. The HomeContainer holds the SearchContainer and the ResultsContainer, with navLinks (tabs) to the SearchContainer and the LoginContainer.

The SearchContainer has a form that once filled out, sends a request to the backend with the user specified parameters. The results are displayed in the ResultsContainer, and state is updated upon each form submission.

The LoginContainer, '/login', has a dropdown list of users. Selecting a user and logging in will replace the HomeContainer with the UserContainer. This will contain another SearchContainer and ResultsContainer, but with a navLink to the UserReportsContainer and a 'save report' button. '/:user_id'.

The UserReportsContainer holds a list of buttons corresponding with the saved reports from the user. Clicking each button will update the ResultsContainer with the saved results. '/:user_id/:userReportsId'.

The UserContainer has a Logout button that returns the page back to the HomeContainer, '/'.

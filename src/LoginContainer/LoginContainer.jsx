import './LoginContainer.css'
import { NavLink } from 'react-router-dom'
import DropdownMenuContainer from '../DropdownMenuContainer/DropdownMenuContainer';
import { useState } from 'react'

//This still needs to be properly implemented (it's not technically even capturing a specific user; and we need IDs)
const LoginContainer = () => {
    const [userItems, setUserItems] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)

    //Get all usernames for the dropdown
    //NOTE: later, if we have an empty user list, should probably give message before rendering dropdown (this is also why 'null' vs '[]' used initially)
    if (!userItems) {
        fetch("http://localhost:3000/api/v1/users", {
            //Maybe I don't even need these {} here?
        })
        .then(response => response.json())
        .then(data => {
            //Update userItems (note that JSON top-level is not usual {} but instead []) - had to do via function, apparently userItems isn't in scope???
            let mappedUserItems = data.map((user) => {
                return user.username
            })

            setUserItems(mappedUserItems)
        })
        .catch(error => {
            console.error("Error: ", error)
        })
    }

    const processUserSelection = (username) => {
        //Not exactly sure how to best handle this...
        console.log("Newly selected user: ", username)
        setSelectedUser(username)
    }

    return (
        <div>

            <nav>
                <NavLink to="/" className="nav">Search</NavLink>
                <NavLink to="/login" className="nav">Login</NavLink>
            </nav>

            <p>
                {"User:  "} 
            </p>
            {userItems && (
                <DropdownMenuContainer key="login-menu" itemsList={userItems} defaultText="Select username" processSelection={processUserSelection} />
            )}
            <br></br>

            {/* {if (selectedUser === 1) {

            } && (

            )} */}
            {/* <button disabled={!selectedUser} onClick={() => console.log("Selected user: ", selectedUser)}>Login!</button> */}
            {selectedUser ? (
                <button onClick={() => console.log("Selected user: ", selectedUser)}>Login!</button>
            ) : (
                <button className="button-disabled" disabled={true}>Pick a user...</button>
            )}

            {/* <form>
                <input className ="userName"/>
            <NavLink to="/:user_id" className="nav">Login</NavLink>
            </form> */}

        </div>
    )
}
export default LoginContainer;

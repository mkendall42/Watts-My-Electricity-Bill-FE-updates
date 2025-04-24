import './LoginContainer.css'
import { NavLink, useNavigate } from 'react-router-dom'
import DropdownMenuContainer from '../DropdownMenuContainer/DropdownMenuContainer';
import { useState } from 'react'

//This still needs to be properly implemented (it's not technically even capturing a specific user; and we need IDs)
const LoginContainer = ({ user, setUser }) => {
    const [userItems, setUserItems] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)

    const navigateToPage = useNavigate()

    //Get all usernames for the dropdown
    //NOTE: later, if we have an empty user list, should probably give message before rendering dropdown (this is also why 'null' vs '[]' used initially)
    if (!userItems) {
        fetch("http://localhost:3000/api/v1/users", {
            //Maybe I don't even need these {} here?
        })
        .then(response => response.json())
        .then(data => {
            setUserItems(data)
        })
        .catch(error => {
            console.error("Error: ", error)
        })
    }

    const processUserSelection = (username) => {
        //Later: can replace this method simply with setSelectedUser().  This was just for testing / consistency check
        console.log("Newly selected user: ", username)
        setSelectedUser(username)
    }

    const processLogin = () => {
        console.log("Logging in user: ", selectedUser)
        console.log(`${selectedUser}'s ID: `, findUserId(selectedUser))
        setUser(selectedUser)
        navigateToPage("/user")
    }

    const findUserId = (username) => {
        return userItems.find((user) => {
            return user.username === username
        }).id
    }

    //Need the if since call was async
    let usernames = []
    if (userItems) {
        usernames = userItems.map((user) => {
            return user.username
        })
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
                <DropdownMenuContainer key="login-menu" itemsList={usernames} defaultText="Select username" processSelection={processUserSelection} />
            )}
            <br></br>
            {selectedUser ? (
                <button onClick={() => processLogin()}>Login!</button>
            ) : (
                <button className="button-disabled" disabled={true}>Pick a user...</button>
            )}
        </div>
    )
}

export default LoginContainer;

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
            //Update userItems (note that JSON top-level is not usual {} but instead []) - had to do via function, apparently userItems isn't in scope???
            // let mappedUserItems = data.map((user) => {
            //     return user.username
            // })

            // setUserItems(mappedUserItems)
            setUserItems(data)                      //This preserves the id associated with the name, which we need once a user is selected to login
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

    const processLogin = () => {
        //Set the user state var (how do we get the setUser() prop sent here from HomeContainer via NavLink / whatever/)
        console.log("Logging in user: ", selectedUser)
        console.log(`${selectedUser}'s ID: `, findUserId(selectedUser))
        //setUser(selectedUser)
        navigateToPage(`/${findUserId(selectedUser)}`)       //Is this where we want to go (ReportsContainer)?  Also, once other actions taken, user is lost (need to set state somehow I'm guessing)
        //I think we need to move user to App so that setUser() can be passed to LoginContainer and we can set it here...
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

			{/* <form>
				<input className="userName"
					type='text'
					placeholder='Username'
					name='user'
					value={user}
					onChange={e => setUser(e.target.value)}
				/>
				<Link to="/user" className="nav">Login</Link>
			</form> */}

            <p>
                {"User:  "} 
            </p>
            {userItems && (
                <DropdownMenuContainer key="login-menu" itemsList={usernames} defaultText="Select username" processSelection={processUserSelection} />
            )}
            <br></br>

            {/* {if (selectedUser === 1) {

            } && (

            )} */}
            {/* <button disabled={!selectedUser} onClick={() => console.log("Selected user: ", selectedUser)}>Login!</button> */}
            {selectedUser ? (
                <button onClick={() => processLogin()}>Login!</button>
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

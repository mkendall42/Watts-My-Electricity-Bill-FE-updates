
import './LoginContainer.css'
import { NavLink, useNavigate } from 'react-router-dom'
import DropdownMenuContainer from '../DropdownMenuContainer/DropdownMenuContainer';
import { useState } from 'react'


const LoginContainer = ({ user, setUser }) => {
    const [userItems, setUserItems] = useState(null)
    // const [selectedUser, setSelectedUser] = useState(null)
    const [selectedUser, setSelectedUser] = useState({})

    const navigateToPage = useNavigate()

    //Get all usernames for the dropdown
    if (!userItems) {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users`)
        .then(response => response.json())
        .then(data => {
            setUserItems(data)
            //For some reason, I can't access userItems here...why???
            //However, 'data' looks good
            // debugger

        })
        .catch(error => {
            console.error("Error: ", error)
        })
    }

    const processUserSelection = (username) => {
        console.log("Newly selected user: ", username)
        setSelectedUser(username)
    }

    const processLogin = () => {
        // const userId = findUserId(selectedUser)
        // console.log("Logging in user:", selectedUser)
        // console.log(`${selectedUser}'s ID:`, userId)
        
        // setUser(userId)
        // navigateToPage(`/user/${userId}/saved`)

        
        // setUser(selectedUser)
        //Extract ID as well from username first (again, this is tedious...)
        // const userID = findUserId(selectedUser)
        // const tmpUser = {name: selectedUser, id: userID}

        // debugger

        // console.log(`Logging in user with name ${tmpUser.name} and ID ${tmpUser.id}`)
        // setUser(tmpUser)
        // console.log(`Logging in user with name ${user.name} and ID ${user.id}`)
        // console.log("Just to check, here is 'user': ", user)
        // // setUser(user)

        const userID = findUserId(selectedUser)
        setUser({name: selectedUser, id: userID})
        //For some reason, it doesn't seem like 'user' gets set immediately...?
        //Is this b/c user sent as a prop is only a copy of the actual state var or something?
        //Or is there a small 'delay' of processing via the hook?
        // console.log(`Logging in user with name ${user.name} and ID ${user.id}`)
        console.log(`Logging in user with name ${selectedUser} and ID ${userID}`)
        navigateToPage(`/user/${userID}/saved`)
      }
      
    const findUserId = (username) => {
        return userItems.find((user) => {
            return user.username === username
        }).id
    }

    //Can this be incorporatd into earlier if() statement (better practice at least)
    //Also, this may not be needed anymore given restructuring plan of 'user' state var
    let usernames = []
    if (userItems) {
        usernames = userItems.map((user) => {
            return user.username
        })
    }

    return (
        <div className='loginContainer'>
            <div className='loginInfo'>
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
        </div>
    )
}

export default LoginContainer;


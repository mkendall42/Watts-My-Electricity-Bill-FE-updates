import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomeContainer from './HomeContainer/HomeContainer'
import UserReportsContainer from './UserReportsContainer/UserReportsContainer'
import ResultsContainer from './ResultsContainer/ResultsContainer'
import LoginContainer from './LoginContainer/LoginContainer'
import UserContainer from './UserContainer/UserContainer'

function App() {
	const [user, setUser] = useState('')
	const [results, setResults] = useState(null)
    const [isNewSearch, setIsNewSearch] = useState(false)       //Tracks if the search is new and therefore 'saveable' (not best naming scheme due to prior var issues)

    //Detect a route change; if returning to HomeContainer, clear user and results (I think this always makes sense...perhaps there is a specific route where it doesn't?)
    const location = useLocation()
    useEffect(() => {
        // console.log("Route changed to: ", location.pathname)
        if (location.pathname === "/") {
            setUser('')
            setResults(null)
        }
        // else if (location.pathname === "/user") {
        //     //This one is harder; probably need to see if it is /user/* but NOT /user/*/saved
        //     //This can wait until later / if we have time.
        //     setResults(null)
        // }
    }, [location])

	return (
		<main className='App'>
			<h1>Watts My Electrical Bill</h1>
			<Routes>
				<Route path="/" element={<HomeContainer user={user} results={results} setResults={setResults} isNewSearch={isNewSearch} setIsNewSearch={setIsNewSearch} />} />
				<Route path='/login' element={<LoginContainer user={user} setUser={setUser} />} />
				<Route path='/user' element={<UserContainer />} />
				<Route path="/user/:user_id" element={<UserContainer user={user} results={results} setResults={setResults} isNewSearch={isNewSearch} setIsNewSearch={setIsNewSearch} />} />
				<Route path="/user/:user_id/saved" element={<UserReportsContainer results={results} setResults={setResults} isNewSearch={isNewSearch} setIsNewSearch={setIsNewSearch} />}>
					<Route path=":id" element={<ResultsContainer />} />
				</Route>
			</Routes>
		</main>
	);
}

export default App;

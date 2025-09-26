import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomeContainer from './HomeContainer/HomeContainer'
import UserReportsContainer from './UserReportsContainer/UserReportsContainer'
import ResultsContainer from './ResultsContainer/ResultsContainer'
import LoginContainer from './LoginContainer/LoginContainer'
import UserContainer from './UserContainer/UserContainer'

function App() {
	// const [user, setUser] = useState('')
	const [user, setUser] = useState({})
	const [results, setResults] = useState(null)
    const [isNewSearch, setIsNewSearch] = useState(false)

    const location = useLocation()
    useEffect(() => {
        if (location.pathname === "/") {
            setUser({})
            setResults(null)
        }
    }, [location])

	return (
		<main className='App'>
			<h1>Watts My Electrical Bill</h1>
			<Routes>
				<Route path="/" element={<HomeContainer user={user} results={results} setResults={setResults} isNewSearch={isNewSearch} setIsNewSearch={setIsNewSearch} />} />
				<Route path='/login' element={<LoginContainer user={user} setUser={setUser} />} />
				<Route path='/user' element={<UserContainer user={user}/>} />
				<Route path="/user/:user_id" element={<UserContainer user={user} results={results} setResults={setResults} isNewSearch={isNewSearch} setIsNewSearch={setIsNewSearch} />} />
				<Route path="/user/:user_id/saved" element={<UserReportsContainer user={user} results={results} setResults={setResults} isNewSearch={isNewSearch} setIsNewSearch={setIsNewSearch} />}>
					<Route path=":id" element={<ResultsContainer />} />
				</Route>
			</Routes>
		</main>
	);
}

export default App;

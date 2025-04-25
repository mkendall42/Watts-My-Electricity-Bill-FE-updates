import './App.css'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeContainer from './HomeContainer/HomeContainer'
import UserReportsContainer from './UserReportsContainer/UserReportsContainer'
import ResultsContainer from './ResultsContainer/ResultsContainer'
import LoginContainer from './LoginContainer/LoginContainer'
import UserContainer from './UserContainer/UserContainer'

function App() {
	const [user, setUser] = useState('')

	return (
		<main className='App'>
			<h1>Watts My Electrical Bill</h1>
			<Routes>
				<Route path="/" element={<HomeContainer user={user} />} />
				<Route path='/login' element={<LoginContainer user={user} setUser={setUser} />} />
				<Route path='/user' element={<UserContainer />} />
				<Route path="/user/:user_id" element={<UserReportsContainer />}>
					<Route path=":id" element={<ResultsContainer />} />
				</Route>
			</Routes>
		</main>
	);
}

export default App;

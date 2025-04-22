import './HomeContainer.css'
import SearchContainer from '../SearchContainer/SearchContainer'
import ResultsContainer from '../ResultsContainer/ResultsContainer'
import { NavLink, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'

function HomeContainer() {
	const [user, setUser] = useState([])
	const [results, setResults] = useState([])
	return (
		<div className='HomeContainer'>
			<div className="left-side">
				<nav>
					<NavLink to="/" className="nav">Search</NavLink>
					<NavLink to="/login" className="nav">Login</NavLink>
				</nav>

				<SearchContainer
					user={user}
					setResults={setResults}
				/>
			</div>

			<ResultsContainer
				user={user}
				results={results}
			/>

		</div>
	);
}
export default HomeContainer

import './HomeContainer.css'
import SearchContainer from '../SearchContainer/SearchContainer'
import ResultsContainer from '../ResultsContainer/ResultsContainer'
import { NavLink, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'

function HomeContainer({ user, results, setResults }) {

	// if(results) {
	// 	setResults(null)
	// }
	// setResults(null)			//This is causing double-rendering component errors, but only occasionally...can't really tell why.

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

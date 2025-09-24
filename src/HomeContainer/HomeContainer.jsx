import './HomeContainer.css'
import SearchContainer from '../SearchContainer/SearchContainer'
import ResultsContainer from '../ResultsContainer/ResultsContainer'
import { NavLink, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'

function HomeContainer({ user, results, setResults, isNewSearch, setIsNewSearch }) {
	return (
		<div className='HomeContainer'>
			{/* <div className="left-side"> */}
			<nav>
				<NavLink to="/" className="nav">Search</NavLink>
				<NavLink to="/login" className="nav">Login</NavLink>
			</nav>

			<div className="left-right-sides">
				<SearchContainer
					user={user}
					setResults={setResults}
					isNewSearch={isNewSearch}
					setIsNewSearch={setIsNewSearch}
				/>
			{/* </div> */}

				<ResultsContainer
					user={user}
					results={results}
					isNewSearch={isNewSearch}
					setIsNewSearch={setIsNewSearch}
				/>
			</div>
		</div>
	);
}
export default HomeContainer

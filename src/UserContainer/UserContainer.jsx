import { useParams, NavLink, Link } from 'react-router-dom'
import './UserContainer.css'
import SearchContainer from '../SearchContainer/SearchContainer'
import ResultsContainer from '../ResultsContainer/ResultsContainer'

const UserContainer = ({ results, user,  setResults, isNewSearch, setIsNewSearch }) => {

	return (
		// <div className='UserContainer'>
		// 	<div className="left-side">
		// 		<nav>
		// 			<NavLink to={`/user/${user}`} className="nav">Search</NavLink>
		// 			<NavLink to={`/user/${user}/saved`} className="nav">Saved Reports</NavLink>
		// 			<Link to="/" className="nav">Log out</Link>
		// 		</nav>

		// 		<SearchContainer
		// 			user={user}
		// 			setResults={setResults}
		// 			isNewSearch={isNewSearch}
		// 			setIsNewSearch={setIsNewSearch}
		// 		/>
		// 	</div>

		// 	<ResultsContainer
		// 		user={user}
		// 		results={results}
		// 		isNewSearch={isNewSearch}
		// 		setIsNewSearch={setIsNewSearch}
		// 	/>
		// </div>

		<div className='UserContainer'>
			{/* <div className="left-side"> */}
			<nav>
				{/* <div className="nav-bar"> */}
				{/* <NavLink to="/" className="nav">Search</NavLink>
				<NavLink to="/login" className="nav">Login</NavLink> */}
				<NavLink to={`/user/${user}`} className="nav-item">Search</NavLink>
				<NavLink to={`/user/${user}/saved`} className="nav-item">Saved Reports</NavLink>
				<NavLink to="/" className="nav-item">Log out</NavLink>
				{/* </div> */}
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
	)
}
export default UserContainer


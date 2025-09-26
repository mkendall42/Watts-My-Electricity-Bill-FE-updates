import { useParams, NavLink, Link } from 'react-router-dom'
import './UserContainer.css'
import SearchContainer from '../SearchContainer/SearchContainer'
import ResultsContainer from '../ResultsContainer/ResultsContainer'

const UserContainer = ({ results, user,  setResults, isNewSearch, setIsNewSearch }) => {

	return (
		<div className='UserContainer'>
			<nav>
				<NavLink to={`/user/${user.id}`} className="nav-item">Search</NavLink>
				<NavLink to={`/user/${user.id}/saved`} className="nav-item">Saved Reports</NavLink>
				<Link to="/" className="nav-item">Log out</Link>
			</nav>

			<div className="left-right-sides">
				<SearchContainer
					user={user}
					setResults={setResults}
					isNewSearch={isNewSearch}
					setIsNewSearch={setIsNewSearch}
				/>

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


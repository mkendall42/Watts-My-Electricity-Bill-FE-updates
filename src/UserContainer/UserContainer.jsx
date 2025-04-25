import { useParams, NavLink, Link } from 'react-router-dom'
import './UserContainer.css'
import SearchContainer from '../SearchContainer/SearchContainer'
import ResultsContainer from '../ResultsContainer/ResultsContainer'
// import 

const UserContainer = ({ user, results, setResults }) => {
	const { userId } = useParams()

	return (
		<div className='UserContainer'>
			<div className="left-side">
				<nav>
					<NavLink to={`/user/${user}`} className="nav">Search</NavLink>
					<NavLink to={`/user/${user}/saved`} className="nav">Saved Reports</NavLink>
					<Link to="/" className="nav">Log out</Link>
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
	)
}
export default UserContainer


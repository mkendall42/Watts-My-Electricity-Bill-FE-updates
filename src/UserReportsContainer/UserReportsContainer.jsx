import { NavLink, Link } from 'react-router-dom'
import './UserReportsContainer.css'

const UserReportsContainer = () => {
	return (
		<nav>
			<NavLink to="/user" className="nav">Search</NavLink>
			<NavLink to="/reports" className="nav">Saved Reports</NavLink>

			<Link to="/" className="nav">Log out</Link>
		</nav>
	)
}
export default UserReportsContainer

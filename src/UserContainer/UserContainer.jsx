import { NavLink, Link } from 'react-router-dom'
import './UserContainer.css'

const UserContainer = () => {
	return (
		<div className='UserContainer'>
			<nav>
				<NavLink to="/user" className="nav">Search</NavLink>
				<NavLink to="/reports" className="nav">Saved Reports</NavLink>

				<Link to="/" className="nav">Log out</Link>
			</nav>
		</div>
	)
}
export default UserContainer


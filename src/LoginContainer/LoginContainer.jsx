import { NavLink, Link } from 'react-router-dom'


const LoginContainer = ({ user, setUser }) => {
	return (
		<div>
			<nav>
				<NavLink to="/" className="nav">Search</NavLink>
				<NavLink to="/login" className="nav">Login</NavLink>
			</nav>

			<form>
				<input className="userName"
					type='text'
					placeholder='Username'
					name='user'
					value={user}
					onChange={e => setUser(e.target.value)}
				/>
				<Link to="/user" className="nav">Login</Link>
			</form>

		</div>
	)
}
export default LoginContainer;

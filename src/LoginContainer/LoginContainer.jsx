import { NavLink } from 'react-router-dom'


const LoginContainer = () => {
    return (
        <nav>
        <NavLink to="/" className="nav">Search</NavLink>
        <NavLink to="/:user_id" className="nav">Login</NavLink>
        </nav>
    )
}
export default LoginContainer;
import { NavLink } from 'react-router-dom'


const LoginContainer = () => {
    return (
        <div>

            <nav>
                <NavLink to="/" className="nav">Search</NavLink>
                <NavLink to="/login" className="nav">Login</NavLink>
            </nav>

            <form>
                <input className ="userName"/>
            <NavLink to="/:user_id" className="nav">Login</NavLink>
            </form>

        </div>
    )
}
export default LoginContainer;

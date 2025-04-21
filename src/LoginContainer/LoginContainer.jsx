import { NavLink } from 'react-router-dom'


const LoginContainer = () => {
    return (
        <div>

            <nav>
                <NavLink to="/" className="nav">Search</NavLink>
                <NavLink to="/:user_id" className="nav">Login</NavLink>
            </nav>

            <form>
                <input className ="userName"/>
            <button type="submit">Submit</button>
            </form>

        </div>
    )
}
export default LoginContainer;
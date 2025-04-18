import { useState, useEffect } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import HomeContainer from './HomeContainer/HomeContainer'
import './App.css'
import UserReportsContainer from './UserReportsContainer/UserReportsContainer'
import ResultsContainer from './ResultsContainer/ResultsContainer'

function App() {
     const [user, setUser] = useState([])
     const [results, setResults] = useState([])
     return (
     <main className='App'>
        <h1>Watts My Electrical Bill</h1>
        <NavLink to="/" className="nav">Search</NavLink>
        <NavLink to="/login" className="nav">Login</NavLink>
        <NavLink to="/userId" className="nav">User</NavLink>
        <Routes>
            <Route path="/" element={<HomeContainer />}/>
            <Route path="/:userId" element={<UserReportsContainer />}>
                <Route path=":id" element={<ResultsContainer />}/>
            </Route>
        </Routes>
     </main>
          );
}

export default App;

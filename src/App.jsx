import { useState, useEffect } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import HomeContainer from './HomeContainer/HomeContainer'
import './App.css'
import UserReportsContainer from './UserReportsContainer/UserReportsContainer'
import ResultsContainer from './ResultsContainer/ResultsContainer'
import LoginContainer from './LoginContainer/LoginContainer'

function App() {
     const [user, setUser] = useState([])
     const [results, setResults] = useState([])
     return (
     <main className='App'>
        <h1>Watts My Electrical Bill</h1>
        
        <Routes>
            <Route path="/" element={<HomeContainer />}/>
               <Route path='/login' element={<LoginContainer />}/>
            <Route path="/:user_id" element={<UserReportsContainer />}>
                <Route path=":id" element={<ResultsContainer />}/>
            </Route>
        </Routes>
     </main>
          );
}

export default App;

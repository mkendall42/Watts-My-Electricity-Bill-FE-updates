import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeContainer from './HomeContainer/HomeContainer'
import './App.css'

function App() {
     const [user, setUser] = useState(null)
     const [results, setResults] = useState(null)
     return (

     <main className='App'>
          <h1>Watts My Electrical Bill</h1>

          <HomeContainer 
               user={user}
               results={results}
          />
     </main>
          );
}

export default App;

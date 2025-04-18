import './HomeContainer.css'
import SearchContainer from '../SearchContainer/SearchContainer'
import ResultsContainer from '../ResultsContainer/ResultsContainer'
import UserReportsContainer from '../UserReportsContainer/UserReportsContainer'
import { NavLink, Route, Routes } from 'react-router-dom'

function HomeContainer({ user, results }) {

    return (
        <div>
        <h1>Home container</h1>
        console.log("homeContainer")
        {/* <Routes>
            <Route path="*" element={<HomeContainer />}/>
            <Route path="/:id" element={<UserReportsContainer />}>
                <Route path=":id" element={<ResultsContainer />}/>
        </Route>
        </Routes> */}
        <SearchContainer
        
        user={user}
        results={results}
        />
        <ResultsContainer
        user={user}
        results={results}
        />
        </div>
    );
}
export default HomeContainer

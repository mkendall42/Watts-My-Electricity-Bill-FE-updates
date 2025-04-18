import './HomeContainer.css'
import SearchContainer from '../SearchContainer/SearchContainer'
import ResultsContainer from '../ResultsContainer/ResultsContainer'

function HomeContainer({ user, results }) {

    return (
        <p>
        <SearchContainer
        user={user}
        results={results}
        />
        <ResultsContainer
        user={user}
        results={results}
        />
        </p>
    );
}
export default HomeContainer

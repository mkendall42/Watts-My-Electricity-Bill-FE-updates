import './ResultsContainer.css';
import useState from 'react';

const ResultsContainer = ({ results }) => {
		let nickname = results.nickname
		let nameAndLocation = `Your Estimated Energy Usage for ${nickname}`
		
    return (
        <section className='results-window'>
            <p>{nameAndLocation}</p>
                <section className='values'>
                    <p className='results'>{ results.cost }</p>
                    <p className='results'>{ results.energy_consumption }</p>
                </section>
        </section>
    )
}
export default ResultsContainer

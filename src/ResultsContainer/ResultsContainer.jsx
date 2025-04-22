import './ResultsContainer.css';
import useState from 'react';

const ResultsContainer = ({ results }) => {
		
		let nickname = results.nickname
		let nameAndLocation = `Your Estimated Energy Usage for ${nickname} at :`
		
    return (
        <section className='results'>
            <p>{nameAndLocation}</p>
                <section className='values'>
                    <p>{ results.cost }</p>
                    <p>Y Timeframe</p>
                    <p>Z Energy Unit Output</p>
                </section>
        </section>
    )
}
export default ResultsContainer

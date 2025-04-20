import './ResultsContainer.css'

const ResultsContainer = () => {
    let nickname = 'default nickname'
    let location = 'default location'
    let nameAndLocation = `Your Estimated Energy Usage for ${nickname} at ${location}:`
    
    return (
        <section className='results'>
            <p>{nameAndLocation}</p>
                <section className='values'>
                    <p>X Price</p>
                    <p>Y Timeframe</p>
                    <p>Z Energy Unit Output</p>
                </section>
        </section>
    )
}
export default ResultsContainer
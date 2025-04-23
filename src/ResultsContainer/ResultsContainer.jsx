import './ResultsContainer.css';
import useState from 'react';

//Need to add the "Save these results" button.  Should it live with this container, or outside of it?  (Kinda a matter of bookkeeping, but might need to nest a container)
//Later: will also want to list average utility rates for the state - will make BE call to get this info (either its own controller, or another action from UtilitiesController)
//For now: button will reside within this container (hopefully can format it to put it in the right place)

const ResultsContainer = ({ results }) => {

    // debugger

    let nickname = results.nickname
    let nameAndLocation = `Your Estimated Energy Usage for ${nickname}`

    //Ensure proper display if erroneous / incopmlete results
    if (results === null || results.status === 422) {
        nameAndLocation = "Error and/or nothing searched for yet (placeholder)"
    }
		
    return (
        <section className='results-window'>
            <p>{nameAndLocation}</p>
            <section className='values'>
                <p className='results'>{ `Energy consumption: ${results.cost} kWh` }</p>
                <p className='results'>{ `Energy cost: $${results.energy_consumption}` }</p>
                <p className='results'>{ "Average state rate: <value goes here> $/kWh" }</p>
            </section>
            <button>Save these results!</button>
        </section>
    )
}
export default ResultsContainer

import DropdownMenuContainer from '../DropdownMenuContainer/DropdownMenuContainer';
import './ResultsContainer.css';
import { useState } from 'react';

//Need to add the "Save these results" button.  Should it live with this container, or outside of it?  (Kinda a matter of bookkeeping, but might need to nest a container)
//Later: will also want to list average utility rates for the state - will make BE call to get this info (either its own controller, or another action from UtilitiesController)
//For now: button will reside within this container (hopefully can format it to put it in the right place)

const ResultsContainer = ({ user, results }) => {
    const [timeframe, setTimeframe] = useState("")

    // debugger

    let nickname = results.nickname
    let nameAndLocation = `Your Estimated Energy Usage and Costs for ${nickname}`
    //Later: add zip code and state (based on BE return?)
    //Later later: add utility company associated with this...

    const timeframeList = ["Annual", "Monthly"]
    const utilityRateType = ["Residential", "Commercial", "Industrial"]

    //Ensure proper display if erroneous / incopmlete results (NOTE: still not displaying correctly on first page load; works after that)
    if (results === null || results.status === 422) {
        nameAndLocation = "Error and/or nothing searched for yet (placeholder)"
    }
    const saveResults = () => {
        //Collect appropriate results to form JSON body
        const reportData = {
            nickname: results.nickname,
            energy_consumption: results.energy_consumption,
            cost: results.cost,
            user_id: user.id                //This needs to be checked, this is just a placeholder (verify how we're getting the user info, is it an object/what) - user_id: user.id or similar
        }
        const parameters = {
			method: "PATCH",
			body: JSON.stringify(reportData),
			headers: { "Content-Type": "application/json" }
		}

        //BE POST call to create new report
        fetch("http://localhost:3000/api/v1/reports", parameters, {
            //Maybe I don't even need these {} here?
        })
        .then(response => response.json())
        .then(data => {
            //Check successful; if so, provide text for updating save button and disable it (maybe call function here)
        })
        .catch(error => {
            console.error("Error: ", error)
            //Update the button appropriately with error / notification (same function?)
        })
    }

    const processTimeframeSelection = (item) => {
        setTimeframe(item)
        console.log("Item selected: ", item)
    }
	
    const processUtilityRateTypeSelection = (item) => {
        // setTimeframe(item)
        console.log("Utility rate type selected: ", item)
    }
    
    return (
        <section className='results-window'>
            <p>{nameAndLocation}</p>
            {/* Call a dropdown container here; then probably need to conditionally render stuff below this */}
            <DropdownMenuContainer key="timeframe" itemsList={timeframeList} defaultText="Select timeframe" processSelection={processTimeframeSelection} />
            <DropdownMenuContainer key="utility" itemsList={utilityRateType} defaultText="Select utility type" processSelection={processUtilityRateTypeSelection} />
            <section className='values'>
                <p className='results'>{ `Energy consumption: ${results.cost} kWh` }</p>
                <p className='results'>{ `Energy cost: $${results.energy_consumption}` }</p>
                <p className='results'>{ "Average state rate: <value goes here> $/kWh" }</p>
            </section>
            <button onClick={() => saveResults()}>Save these results!</button>
        </section>
    )
}
export default ResultsContainer

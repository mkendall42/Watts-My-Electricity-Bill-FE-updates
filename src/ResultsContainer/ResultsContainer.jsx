import DropdownMenuContainer from '../DropdownMenuContainer/DropdownMenuContainer';
import './ResultsContainer.css';
import { useState } from 'react';

//Need to add the "Save these results" button.  Should it live with this container, or outside of it?  (Kinda a matter of bookkeeping, but might need to nest a container)
//Later: will also want to list average utility rates for the state - will make BE call to get this info (either its own controller, or another action from UtilitiesController)
//For now: button will reside within this container (hopefully can format it to put it in the right place)

const ResultsContainer = ({ user, results }) => {
    const [timeframe, setTimeframe] = useState("")
    const [utilityRateType, setUtilityRateType] = useState("")      //Is this really necessary?  I think so (to ensure render happens when it changes, but I don't know)
    const [isSaveable, setIsSaveable] = useState(false)

    // debugger

    let nickname = results.nickname
    let nameAndLocation = `Your Estimated Energy Usage and Costs for "${nickname}"`
    let stateUtilText = ""
    let localUtilText = ""
    if (utilityRateType != "") {
        stateUtilText = `Average ${utilityRateType.toLowerCase()} rate for ${results.state}: $${results.state_average[utilityRateType.toLowerCase()].toFixed(2)}/kWh`
        localUtilText = `Local ${utilityRateType.toLowerCase()} rate: $${results.zip_average[utilityRateType.toLowerCase()].toFixed(2)}/kWh`
    } 
    //Later: add zip code and state (based on BE return?)
    //Later later: add utility company associated with this...

    const timeframeList = ["Annual", "Monthly"]
    const utilityRateTypeList = ["Residential", "Commercial", "Industrial"]

    //Things to take care of first:
    //Ensure proper display if erroneous / incopmlete results (NOTE: still not displaying correctly on first page load; works after that)
    if (results === null || results.status === 422) {
        nameAndLocation = "Error and/or nothing searched for yet (placeholder)"
    }

    if (user !== '' && results) {
        //User must be logged in, and results must be valid (which implies it's already been checked against BE for unique nickname, etc.)
        setIsSaveable(true)
    }

    const saveResults = () => {
        //Collect appropriate results to form JSON body

        // debugger
        
        const reportData = {
            nickname: results.nickname,
            energy_usage: results.energy_consumption,       //Might rename later (here or BE) if confusion
            energy_cost: results.cost,
            user_id: 5                           //This needs to be checked, this is just a placeholder (verify how we're getting the user info, is it an object/what) - user_id: user.id or similar
            // user_id: user.id               
        }
        const parameters = {
			method: "POST",
			body: JSON.stringify(reportData),
			headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": true }
		}

        //BE POST call to create new report
        fetch("http://localhost:3000/api/v1/reports", parameters, {
            //Maybe I don't even need these {} here?
        })
        .then(response => response.json())
        .then(data => {
            //Check successful; if so, provide text for updating save button and disable it (maybe call function here)
            console.log("Result of save request: ", data)
        })
        .catch(error => {
            console.error("Error: ", error)
            //Update the button appropriately with error / notification (same function?)
        })
    }

    const processTimeframeSelection = (item) => {
        //Later: could just pass the set_ hook
        setTimeframe(item)
        console.log("Item selected: ", item)
    }
	
    const processUtilityRateTypeSelection = (item) => {
        //Same here
        setUtilityRateType(item)
        console.log("Utility rate type selected: ", item)
    }

    const calcValueForTimeframe = (value) => {
        let adjustedValue = 0

        switch (timeframe) {
            case "Annual":
                adjustedValue = value
                break
            case "Monthly":
                adjustedValue = value / 12
                break
        }       

        return adjustedValue
    }

    //Things that set button behavior:
    //Enable IF valid results AND user logged in
    //Disable IF neither of the above.
    //If save is clicked when enabled, briefly display message on button e.g. "SAVED!" or similar
    //Maybe track this with isSaveable state var.

    //For reference - 'results' structure:
    // {
    //     "nickname": (string) name of place,
    //     "energy_consumption": (float) energy consumption,
    //     "state": (string) state of the zipcode,
    //     "state_average": {
    //         "residential": (float) residential rate for month,
    //         "industrial":(float) industrial rate for month,
    //         "commercial": (float) commercial rate for month 
    //     },
    //     "zip_average": {
    //         "residential": (float),
    //         "industrial": (float),
    //         "commercial": (float) 
    //     }
    // }
    
    return (
        <section className='results-window'>
            <p>{nameAndLocation}</p>
            {/* Call a dropdown container here; then probably need to conditionally render stuff below this */}
            <DropdownMenuContainer key="timeframe" itemsList={timeframeList} defaultText="Select timeframe" processSelection={processTimeframeSelection} />
            <DropdownMenuContainer key="utility" itemsList={utilityRateTypeList} defaultText="Select utility type" processSelection={processUtilityRateTypeSelection} />
            <section className='values'>
                <p className='results'>{ `Energy consumption (${timeframe.toLowerCase()}): ${calcValueForTimeframe(results.cost).toFixed(1)} kWh` }</p>
                <p className='results'>{ `Energy cost (${timeframe.toLowerCase()}): $${calcValueForTimeframe(results.energy_consumption).toFixed(2)}` }</p>
                <p className='results'>{stateUtilText}</p>
                <p className='results'>{localUtilText}</p>
            </section>
            {isSaveable ? (
                <button onClick={() => saveResults()}>Save these results!</button>
            ) : (
                <button className="button-disabled" disabled={true}>Results already saved</button>
            )}
        </section>
    )
}
export default ResultsContainer

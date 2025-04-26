import DropdownMenuContainer from '../DropdownMenuContainer/DropdownMenuContainer';
import './ResultsContainer.css';
import { useState, useEffect } from 'react';

const ResultsContainer = ({ user, results, isNewSearch, setIsNewSearch }) => {
    const [timeframe, setTimeframe] = useState("")
    const [utilityRateType, setUtilityRateType] = useState("")      //Is this really necessary?  I think so (to ensure render happens when it changes, but I don't know)
    const [isSaveable, setIsSaveable] = useState(false)
    const [saveButtonMessage, setSaveButtonMessage] = useState("Save these results!")

    //NOTE: may no longer need isSaveable state var given the enhanced role of isNewSearch.  Check again during final refactors / cleanup!

    let nameAndLocation = ""
    let stateUtilText = ""
    let localUtilText = ""

    if (results) {
        nameAndLocation = `Your Estimated Energy Usage and Costs for "${results.nickname}"`
        stateUtilText = ""
        localUtilText = ""
        if (utilityRateType != "") {
            stateUtilText = `Average ${utilityRateType.toLowerCase()} rate for ${results.state}: $${results.state_average[utilityRateType.toLowerCase()].toFixed(2)}/kWh`
            localUtilText = `Local ${utilityRateType.toLowerCase()} rate: $${results.zip_average[utilityRateType.toLowerCase()].toFixed(2)}/kWh`
        } 
    }

    const timeframeList = ["Annual", "Monthly"]
    const utilityRateTypeList = ["Residential", "Commercial", "Industrial"]

    //Things to take care of first:
    //Ensure proper display if erroneous / incopmlete results (NOTE: still not displaying correctly on first page load; works after that)
    if (results === null || results.status === 422) {
        // nameAndLocation = "Error and/or nothing searched for yet (placeholder)"
    }

    useEffect(() => {
        if (user === '') {
            setSaveButtonMessage("Login to save results")
        // } else if (isSaveable && isNewSearch) {
        } else if (isNewSearch) {
            setSaveButtonMessage("Save these results!")
        } else {
            //This is a problem when a search as a guest is done, then a login is completed.  Need to fix this - perhaps by building in setIsSaveable() into processLogin(), which will require pre-validating unique report
            setSaveButtonMessage("Results already saved")
        }
    }, [user, results, isSaveable])

    const saveResults = () => {
        const reportData = {
            nickname: results.nickname,
            energy_consumption: results.energy_consumption,
            energy_cost: results.cost,
            user_id: user,
            state: results.state,
            state_residential_avg: results.state_average.residential,
            state_commercial_avg: results.state_average.commercial,
            state_industrial_avg: results.state_average.industrial,
            zip_residential_avg: results.zip_average.residential, 
            zip_commercial_avg: results.zip_average.commercial, 
            zip_industrial_avg: results.zip_average.industrial
        }
        const parameters = {
			method: "POST",
			body: JSON.stringify(reportData),
			headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": true }
		}

        //BE POST call to create new report
        fetch("http://localhost:3000/api/v1/reports", parameters)
        .then(response => response.json())
        .then(data => {
            //Check successful; if so, provide text for updating save button and disable it (maybe call function here)
            console.log("Result of save request: ", data)
            setIsSaveable(false)
            setSaveButtonMessage("Results saved!")
            setIsNewSearch(false)
            setTimeout(() => {
                console.log("Timeout reached!")
                setSaveButtonMessage("Results already saved")
            }, 2000)

        })
        .catch(error => {
            console.error("Error: ", error)
            //Update the button appropriately with error / notification (same function?)
        })
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

    if (results) {
        return (
            <section className='results-window'>
                <p>{nameAndLocation}</p>
                <DropdownMenuContainer key="timeframe" itemsList={timeframeList} defaultText="Select timeframe" processSelection={setTimeframe} />
                <DropdownMenuContainer key="utility" itemsList={utilityRateTypeList} defaultText="Select utility type" processSelection={setUtilityRateType} />
                <section className='values'>
                    <div>
                        {timeframe !== "" ? (
                            <div>
                                <p className='results'>{ `Energy consumption (${timeframe.toLowerCase()}): ${calcValueForTimeframe(results.energy_consumption).toFixed(1)} kWh` }</p>
                                <p className='results'>{ `Energy cost (${timeframe.toLowerCase()}): $${calcValueForTimeframe(results.cost).toFixed(2)}` }</p> 
                            </div>
                        ) : (
                            <p>Select timeframe dropdown to display information</p>
                        )}
                        {utilityRateType !== "" ? (
                            <div>
                                <p className='results'>{stateUtilText}</p>
                                <p className='results'>{localUtilText}</p>
                            </div>
                        ) : (
                            <p>Select utility type dropdown to display information</p>
                        )}
                    </div>
                </section>
                {/* {isSaveable ? ( */}
                {(isNewSearch && user !== '') ? (
                    // <button onClick={() => saveResults()}>Save these results!</button>
                    <button onClick={() => saveResults()}>{saveButtonMessage}</button>
                ) : (
                    <button className="button-disabled" disabled={true}>
                        {/* {user === '' ? "Login to save results" : "Results already saved"} */}
                        {saveButtonMessage}
                    </button>
                )}
            </section>
        )
    } else {
        return (
            <section className='results-window'>
                <p>Results will appear here once you submit a valid search or view a saved report!</p>
            </section>
        )
    }
}
export default ResultsContainer

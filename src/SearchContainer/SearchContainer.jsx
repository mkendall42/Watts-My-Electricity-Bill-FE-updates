import { useState, useEffect } from 'react';
import './SearchContainer.css';

const SearchContainer = ({ user, setResults, isNewSearch, setIsNewSearch }) => {
	const [nickname, setNickname] = useState('');
	const [zipcode, setZipcode] = useState('');
  const [residenceType, setResidenceType] = useState('');
  const [occupants, setOccupants] = useState('');
  const [energyUsage, setEnergyUsage] = useState(5);    //Assuming a 1-10 range
  const [reportNicknames, setReportNicknames] = useState([]);
  const [error, setError] = useState("");

  //If user is logged in, load all report nicknames for that user to have on hand for checking uniqueness upon form submission
  useEffect(() => {
    if (user !== '') {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${user}/reports`)
        .then(res => res.json())
        .then(data => {
          console.log("Loading existing report nicknames")
          let nicknames = data.map((report) => {
            return report.nickname
          })

          setReportNicknames(nicknames)
        })
        .catch(err => console.error('Error fetching reports:', err));
    }
  }, [])

  function submitSearch(event) {
    event.preventDefault();

    setError("")

    if (user !== '' && reportNicknames.includes(nickname)) {
      setError("Error: attempted duplicate nickname; try again!")
    } else if (zipcode.length !== 5) {
      setError("Error: Invalid zip code, try 5 digits!")
    } else if (occupants < 1) {
      setError ("Error: There must be at least 1 occupant!")
      return
    }

		const queryParams = new URLSearchParams({
			nickname: nickname,
			zipcode: zipcode,
			residence_type: residenceType,
			num_residents: occupants,
			efficiency_level: energyUsage
		}).toString();

		console.log(queryParams)

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/utilities?${queryParams}`)
			.then(response => response.json())
			.then(data => setResults(data))
			.then(data => {
				console.log('Success:', data);
        setIsNewSearch(true)
				clearInput();
			})
			.catch(error => console.error('Error:', error));

  }

  function clearInput() {
		setNickname('');
		setZipcode('');
    setResidenceType('');
    setOccupants('');
    setEnergyUsage('');
  }

  return (
    <div>

    <form onSubmit={submitSearch}>
      <input
        type='text'
        placeholder='Nickname'
        name='nickname'
        value={nickname}
        onChange={e => setNickname(e.target.value)}
      />

      <input
        type='text'
        placeholder='Zip code'
        name='zipcode'
        value={zipcode}
        onChange={e => setZipcode(e.target.value)}
      />
      
      <input
        type='number'
        placeholder='Number of Occupants'
        name='occupants'
        value={occupants}
        onChange={e => setOccupants(e.target.value)}
      />

      <div className="energy-slider-container">
        <label htmlFor="energyUsage">Energy Usage Priority</label>
        <div className="slider-labels">
          <span>Eco-Friendly</span>
          <span>Comfort</span>
        </div>
        <input
          type="range"
          id="energyUsage"
          name="energyUsage"
          min="1"
          max="10"
          step="1"
          value={energyUsage}
          onChange={e => setEnergyUsage(e.target.value)}
          className="energy-slider"
        />
      </div>

      <div className="residence-type">
        <label>
          <input
            type="radio"
            name="residenceType"
            value="apartment"
            checked={residenceType === "apartment"}
            onChange={e => setResidenceType(e.target.value)}
          />
          Apartment
        </label>

        <label>
          <input
            type="radio"
            name="residenceType"
            value="house"
            checked={residenceType === "house"}
            onChange={e => setResidenceType(e.target.value)}
          />
          House
        </label>
      </div>

      <button type='submit'>SUBMIT</button>
    </form>
      <p>{error}</p>
    </div>
  );
};

export default SearchContainer;

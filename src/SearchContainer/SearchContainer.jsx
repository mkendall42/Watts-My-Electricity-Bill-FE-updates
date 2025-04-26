import { useState, useEffect } from 'react';
import './SearchContainer.css';

const SearchContainer = ({ user, setResults }) => {
	const [nickname, setNickname] = useState('');
	const [zipcode, setZipcode] = useState('');
  // const [lat, setLat] = useState('');
  // const [long, setLong] = useState('');
  const [residenceType, setResidenceType] = useState('');
  const [occupants, setOccupants] = useState('');
  const [energyUsage, setEnergyUsage] = useState('');
  const [reportNicknames, setReportNicknames] = useState([]);

  //IMPORTANT NOTE: this next line is important to set for ensuring the ResultsContainer gives the empty response.
  //HOWEVER, it seems to be occassionally (not nearly always) cause an error:
  //"Cannot update a component (`App`) while rendering a different component (`SearchContainer`)".
  //No idea why it only sometimes triggers, and the page still seems to load correctly as far as I can tell...
  // setResults(null)

  //If user is logged in, load all report nicknames for that user to have on hand for checking uniqueness upon form submission
  // let reportNicknames = []
  useEffect(() => {
    if (user !== '') {
      fetch(`http://localhost:3000/api/v1/users/${user}/reports`)
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

    //Could we hijack this to first check to see if the nickname is unique, assuming a user is logged in?
    //This way, we could abort the search before running external API call(s); also, simplifies code in ResultsContainer
    //Check that nickname is unique, and abort now if not!
    if (user !== '' && reportNicknames.includes(nickname)) {
      console.log("Error: attempted duplicate nickname; try again!")
      //NOTE: we should also provide user feedback here!
      return
    }

		const queryParams = new URLSearchParams({
			nickname: nickname,
			zipcode: zipcode,
			// latitude: lat,
			// longitude: long,
			residence_type: residenceType,
			num_residents: occupants,
			efficiency_level: energyUsage
		}).toString();

		console.log(queryParams)

		fetch(`http://localhost:3000/api/v1/utilities?${queryParams}`, {
		})
			.then(response => response.json())
			.then(data => setResults(data))
			.then(data => {
				console.log('Success:', data);
				clearInput();
			})
			.catch(error => console.error('Error:', error));

  }

  function clearInput() {
		setNickname('');
		setZipcode('');
    // setLat('');
    // setLong('');
    setResidenceType('');
    setOccupants('');
    setEnergyUsage('');
  }

  return (
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
        type='text'
        placeholder='Type of Residence'
        name='residenceType'
        value={residenceType}
        onChange={e => setResidenceType(e.target.value)}
      />

      <input
        type='number'
        placeholder='Number of Occupants'
        name='occupants'
        value={occupants}
        onChange={e => setOccupants(e.target.value)}
      />

      <input
        type='number'
        placeholder='Energy Usage Priority (Cost/Comfort)'
        name='energyUsage'
        value={energyUsage}
        onChange={e => setEnergyUsage(e.target.value)}
      />

      <button type='submit'>SUBMIT</button>
    </form>
  );
};

export default SearchContainer;

import { useState } from 'react';
import './SearchContainer.css';

const SearchContainer = ({ setResults }) => {
	const [nickname, setNickname] = useState('');
	const [zipcode, setZipcode] = useState('');
  // const [lat, setLat] = useState('');
  // const [long, setLong] = useState('');
  const [residenceType, setResidenceType] = useState('');
  const [occupants, setOccupants] = useState('');
  const [energyUsage, setEnergyUsage] = useState('');

  function submitSearch(event) {
    event.preventDefault();

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
        type='number'
        placeholder='Zipcode'
        name='zipcode'
        value={zipcode}
        onChange={e => setLat(e.target.value)}
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

import { useState } from 'react';
import './SearchContainer.css';

const SearchContainer = () => {
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [residenceType, setResidenceType] = useState('');
  const [occupants, setOccupants] = useState('');
  const [energyUsage, setEnergyUsage] = useState('');

  function submitSearch(event) {
    event.preventDefault();

    const newSearch = {
			latitude: lat,
      longitude: long,
      residence_type: residenceType,
      num_residents: occupants,
      energy_usage: energyUsage,
    };

    fetch('http://localhost:3000/api/utilities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSearch)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      clearInput();
    })
    .catch(error => console.error('Error:', error));
  }

  function clearInput() {
    setLat('');
    setLong('');
    setResidenceType('');
    setOccupants('');
    setEnergyUsage('');
  }

  return (
    <form onSubmit={submitSearch}>
      <input
        type='text'
        placeholder='Latitude'
        name='lat'
        value={lat}
        onChange={e => setLat(e.target.value)}
      />

      <input
        type='text'
        placeholder='Longitude'
        name='long'
        value={long}
        onChange={e => setLong(e.target.value)}
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

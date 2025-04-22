export const utilities = fetch('http://localhost:3000/api/utilities', {
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


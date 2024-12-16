import React, { useState } from 'react';
import axiosInstance from './axiosConfig';

const App = () => {
  const [drugIds, setDrugIds] = useState(''); // Comma-separated drug IDs
  const [interactions, setInteractions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchInteractions = async () => {
    try {
      // Split and parse the drug IDs
      const drugIdArray = drugIds.split(',').map((id) => parseInt(id.trim(), 10));
      if (drugIdArray.length < 2) {
        alert('Please enter at least two drug IDs.');
        return;
      }

      // API call to fetch interactions
      const response = await axiosInstance.post('/api/get_interactions_between/', {
        drug_ids: drugIdArray,
      });
      setInteractions(response.data);
      setErrorMessage(''); // Clear previous error
    } catch (error) {
      console.error('Error fetching interactions:', error);
      setErrorMessage('Failed to fetch interactions. Please try again.');
    }
  };

  return (
    <div>
      <h1>Drug Interaction Checker</h1>
      <div>
        <label>Enter Drug IDs (comma-separated): </label>
        <input
          type="text"
          value={drugIds}
          onChange={(e) => setDrugIds(e.target.value)}
          placeholder="e.g., 1, 2"
        />
      </div>
      <button onClick={fetchInteractions}>Check Interactions</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {interactions.length > 0 ? (
        <div>
          <h2>Interactions Found:</h2>
          <ul>
            {interactions.map((interaction, index) => (
              <li key={index}>
                <strong>{interaction.drug_name}</strong> interacts with{' '}
                <strong>{interaction.interaction_drug_name}</strong>: {interaction.description}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No interactions found.</p>
      )}
    </div>
  );
};

export default App;

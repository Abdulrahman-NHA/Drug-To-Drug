import React from 'react';

const InteractionResults = ({ interactionResults }) => {
  return (
    <div className="interaction-results-container">
      <h2>Interaction Results</h2>
      {interactionResults.length > 0 ? (
        <table className="interaction-results-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Severity</th>
              <th>Inferred</th>
            </tr>
          </thead>
          <tbody>
            {interactionResults.map((result, index) => (
              <tr key={index}>
                <td>{result.description || 'N/A'}</td>
                <td>{result.severity || 'N/A'}</td>
                <td>{result.inferred ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No interactions found.</p>
      )}
    </div>
  );
};

export default InteractionResults;

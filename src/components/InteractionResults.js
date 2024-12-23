import React from "react";

const InteractionResults = ({ interactionResults }) => {
  return (
    <div className="interaction-results-container">
      <h2>Specific Interactions Between Selected Drugs</h2>
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
            {interactionResults.map((interaction, index) => (
              <tr key={index}>
                <td>{interaction.description || "No description available."}</td>
                <td>{interaction.severity || "N/A"}</td>
                <td>{interaction.inferred ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No interactions found between the selected drugs.</p>
      )}
    </div>
  );
};

export default InteractionResults;

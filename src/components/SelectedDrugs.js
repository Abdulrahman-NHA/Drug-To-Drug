import React from "react";

const SelectedDrugs = ({ selectedDrugs, removeDrug }) => {
  return (
    <div className="scrollable-container">
      {selectedDrugs.length === 0 ? (
        <p>No drugs selected.</p>
      ) : (
        <ul>
          {selectedDrugs.map((drug) => (
            <li key={drug.drug_id} className="drug-card">
              <span className="drug-name">{drug.name}</span>
              <div className="drug-card-buttons">
                <button onClick={() => removeDrug(drug)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectedDrugs;

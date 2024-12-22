import React from "react";
import Text from "./Text";

const DrugList = ({ drugs, addDrug, showDetails }) => {
  return (
    <div className="scrollable-container">
      {drugs.length === 0 ? (
        <p>No results found. Try a different search term.</p>
      ) : (
        <ul>
          {drugs.map((drug) => (
            <li key={drug.drug_id} className="drug-card">
              <Text text={drug.name} className="drug-name" />
              <div className="drug-card-buttons">
                <button onClick={() => addDrug(drug)}>Add</button>
                <button onClick={() => showDetails(drug.drug_id)}>Details</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DrugList;

import React from "react";
import Card from "./Card";
import Text from "./Text";

const DrugList = ({ drugs, addDrug, showDetails }) => {
  return (
    <div className="drug-list">
      <Card>
        {drugs.length === 0 ? (
          <p>No results found. Try a different search term.</p>
        ) : (
          <ul>
            {drugs.map((drug) => (
              <li key={drug.drug_id} className="small-card">
                <Text text={drug.name} className="drug-name" />
                <div>
                  <button
                    className="button-small details-button"
                    onClick={() => showDetails(drug.drug_id)}
                  >
                    Details
                  </button>
                  <button
                    className="button-small add-button"
                    onClick={() => addDrug(drug)}
                  >
                    Add
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default DrugList;

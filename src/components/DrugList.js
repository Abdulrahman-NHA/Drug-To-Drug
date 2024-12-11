// src/components/DrugList.js

import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import Text from './Text';
// Removed TitleText import and any TitleText usage inside

const DrugList = ({ drugs, addDrug }) => {
  return (
    <div className="drug-list">
      <Card>
        {/* Remove or comment out TitleText line here if it existed */}
        {/* <TitleText text="Search Results" /> */}
        {drugs.length === 0 ? (
          <p>No results found. Try a different search term.</p>
        ) : (
          <ul>
            {drugs.map((drug) => (
              <li key={drug.drug_id} className="small-card">
                <Text text={drug.name} className="drug-name" />
                <div>
                  <Link to={`/drugs/${drug.drug_id}`} className="button-small details-button">
                    Details
                  </Link>
                  <button className="button-small add-button" onClick={() => addDrug(drug)}>
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

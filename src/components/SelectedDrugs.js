import React from 'react';
import Card from './Card';
import Text from './Text'; // Removed TitleText import

const SelectedDrugs = ({ selectedDrugs, removeDrug }) => {
  return (
    <Card>
      <ul>
        {selectedDrugs.map((drug) => (
          <li key={drug.drug_id} className="small-card">
            <Text text={drug.name} className="drug-name" />
            <button className="button-small delete-button" onClick={() => removeDrug(drug)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default SelectedDrugs;

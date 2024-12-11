// src/components/InteractionResults.js

import React from 'react';
import Card from './Card';
// Removed TitleText and any usage inside
import Text from './Text';

const InteractionResults = ({ interactionResults }) => {
  return (
    <Card>
      {/* Remove or comment out TitleText line if it existed inside the card */}
      {/* <TitleText text="Interaction Results" /> */}
      {interactionResults.length === 0 ? (
        <p>No interactions found.</p>
      ) : (
        <ul>
          {interactionResults.map((interaction, index) => (
            <li key={index}>
              <strong>{interaction.interaction_drug_name}:</strong> {interaction.description}
              {interaction.inferred && " (Inferred)"}
              {interaction.confidence_score && ` [Confidence: ${interaction.confidence_score}]`}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default InteractionResults;

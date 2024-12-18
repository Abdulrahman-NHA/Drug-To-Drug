import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Screen from './Screen';
import Card from './Card';
import TitleText from './TitleText';
import Text from './Text';
import axiosInstance from '../api/axiosConfig';
import Spinner from './Spinner';

const fetchDrugInteractions = async (drugId) => {
  try {
    const response = await axiosInstance.post('/get_drug_interactions/', {
      drug_id: drugId,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching drug interactions:', error);
    return [];
  }
};

const DrugDetail = () => {
  const [drug, setDrug] = useState(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        const response = await axiosInstance.get(`/drugs/${id}/`);
        const drugData = response.data;

        // Fetch interactions for this drug (if needed)
        const interactions = await fetchDrugInteractions(drugData.drug_id);

        setDrug({ ...drugData, interactions });
      } catch (error) {
        console.error('Error fetching drug details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDrugDetails();
  }, [id]);

  if (isLoading) return <Spinner />;

  if (!drug) return <p>Drug not found.</p>;

  return (
    <Screen>
      <Card>
        <TitleText text={drug.name} />
        <Text text={drug.description} />
        
        <dl>
          <dt>Drug ID</dt><dd>{drug.drug_id}</dd>
          <dt>Synonyms</dt><dd>{drug.synonyms || "N/A"}</dd>
          <dt>CAS Number</dt><dd>{drug.cas_number || "N/A"}</dd>
          <dt>UNII</dt><dd>{drug.unii || "N/A"}</dd>
          <dt>InChIKey</dt><dd>{drug.inchikey || "N/A"}</dd>
          <dt>Average Mass</dt><dd>{drug.average_mass || "N/A"}</dd>
          <dt>Monoisotopic Mass</dt><dd>{drug.monoisotopic_mass || "N/A"}</dd>
          <dt>State</dt><dd>{drug.state || "N/A"}</dd>
          <dt>Indication</dt><dd>{drug.indication || "N/A"}</dd>
          <dt>Pharmacodynamics</dt><dd>{drug.pharmacodynamics || "N/A"}</dd>
          <dt>Mechanism of Action</dt><dd>{drug.mechanism_of_action || "N/A"}</dd>
          <dt>Absorption</dt><dd>{drug.absorption || "N/A"}</dd>
          <dt>Protein Binding</dt><dd>{drug.protein_binding || "N/A"}</dd>
          <dt>Metabolism</dt><dd>{drug.metabolism || "N/A"}</dd>
          <dt>Route of Elimination</dt><dd>{drug.route_of_elimination || "N/A"}</dd>
          <dt>Half Life</dt><dd>{drug.half_life || "N/A"}</dd>
          <dt>Clearance</dt><dd>{drug.clearance || "N/A"}</dd>
        </dl>

        <h3>Interactions:</h3>
        <ul>
          {drug.interactions && drug.interactions.length > 0 ? (
            drug.interactions.map((interaction, index) => (
              <li key={index}>
                <strong>{interaction.interaction_drug_name}:</strong> {interaction.description}
                {interaction.inferred && ' (Inferred)'}
                {interaction.confidence_score && ` [Confidence: ${interaction.confidence_score}]`}
              </li>
            ))
          ) : (
            <li>No interactions found.</li>
          )}
        </ul>
      </Card>
    </Screen>
  );
};

export default DrugDetail;

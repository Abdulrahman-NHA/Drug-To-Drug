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
        <h3>Synonyms:</h3>
        <ul>
          {drug.synonyms &&
            drug.synonyms.map((synonym, index) => (
              <li key={index}>{synonym}</li>
            ))}
        </ul>
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

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import Card from "./Card";
import Spinner from "./Spinner";

const DrugDetailPage = () => {
  const { id } = useParams();
  const [drug, setDrug] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDrugDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/api/drugs/${id}/`);
        setDrug(response.data);
      } catch (error) {
        console.error("Error fetching drug details:", error);
        alert("Failed to load drug details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrugDetails();
  }, [id]);

  const getValue = (field) => (field ? field : "N/A");

  if (isLoading) return <Spinner />;
  if (!drug) return <p>No drug details available.</p>;

  return (
    <div className="drug-details-container">
      <h1 className="page-title">{getValue(drug?.name)}</h1>

      <Card>
        <h2 className="section-title">Identifiers</h2>
        <p><strong>Drug ID:</strong> {getValue(drug?.drug_id)}</p>
        <p><strong>Synonyms:</strong> {getValue(drug?.synonyms)}</p>
        <p><strong>CAS Number:</strong> {getValue(drug?.cas_number)}</p>
        <p><strong>UNII:</strong> {getValue(drug?.unii)}</p>
        <p><strong>InChIKey:</strong> {getValue(drug?.inchi_key)}</p>
      </Card>

      <Card>
        <h2 className="section-title">Mass Information</h2>
        <p><strong>Average Mass:</strong> {getValue(drug?.average_mass)}</p>
        <p><strong>Monoisotopic Mass:</strong> {getValue(drug?.monoisotopic_mass)}</p>
      </Card>

      <Card>
        <h2 className="section-title">Physical Properties</h2>
        <p><strong>State:</strong> {getValue(drug?.state)}</p>
      </Card>

      <Card>
        <h2 className="section-title">Pharmacodynamics</h2>
        <p>{getValue(drug?.pharmacodynamics)}</p>
      </Card>

      <Card>
        <h2 className="section-title">Interactions</h2>
        {drug?.interactions?.length > 0 ? (
          <ul>
            {drug.interactions.map((interaction, index) => (
              <li key={index}>{getValue(interaction.description)}</li>
            ))}
          </ul>
        ) : (
          <p>No interactions found.</p>
        )}
      </Card>

      <Card>
        <h2 className="section-title">Additional Information</h2>
        <p><strong>Mechanism of Action:</strong> {getValue(drug?.mechanism_of_action)}</p>
        <p><strong>Indication:</strong> {getValue(drug?.indication)}</p>
        <p><strong>Toxicity:</strong> {getValue(drug?.toxicity)}</p>
        <p><strong>Absorption:</strong> {getValue(drug?.absorption)}</p>
        <p><strong>Protein Binding:</strong> {getValue(drug?.protein_binding)}</p>
        <p><strong>Route of Elimination:</strong> {getValue(drug?.route_of_elimination)}</p>
        <p><strong>Half-Life:</strong> {getValue(drug?.half_life)}</p>
        <p><strong>Clearance:</strong> {getValue(drug?.clearance)}</p>
      </Card>
    </div>
  );
};

export default DrugDetailPage;

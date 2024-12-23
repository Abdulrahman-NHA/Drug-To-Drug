import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import Spinner from "./Spinner";

const DrugDetail = () => {
  const { id } = useParams(); // Get drug ID from URL
  const [drugDetails, setDrugDetails] = useState(null);
  const [geneInteractions, setGeneInteractions] = useState([]); // State for gene interactions
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://127.0.0.1:8000/api/drugs/details/${id}/`
        );
        setDrugDetails(response.data);
        console.log("Drug Details Response:", response.data);
      } catch (error) {
        console.error("Error fetching drug details:", error);
        alert("Failed to fetch drug details.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchGeneInteractions = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/drugs/${id}/gene-interactions/`
        );
        setGeneInteractions(response.data);
        console.log("Gene Interactions Response:", response.data);
      } catch (error) {
        console.error("Error fetching gene interactions:", error);
      }
    };

    fetchDrugDetails();
    fetchGeneInteractions();
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!drugDetails) {
    return <p>No drug details available.</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      {/* Drug Details */}
      <Card>
        <h1>{drugDetails.drug?.name || "Unknown Drug"}</h1>
        <p><strong>Description:</strong> {drugDetails.drug?.description || "No description available."}</p>
        <hr />
        <h3>Identifiers</h3>
        <p><strong>Drug ID:</strong> {drugDetails.drug?.drug_id || "N/A"}</p>
        <p><strong>CAS Number:</strong> {drugDetails.drug?.cas_number || "N/A"}</p>
        <p><strong>UNII:</strong> {drugDetails.drug?.unii || "N/A"}</p>
        <hr />
        <h3>Pharmacodynamics</h3>
        <p>{drugDetails.drug?.pharmacodynamics || "No information available."}</p>
      </Card>

      {/* Drug-Gene Interactions */}
      <Card>
        <h3>Drug-Gene Interactions</h3>
        {geneInteractions.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Gene Name</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Interaction Type</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Interaction Score</th>
              </tr>
            </thead>
            <tbody>
              {geneInteractions.map((interaction, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{interaction.gene_name || "N/A"}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{interaction.interaction_type || "N/A"}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{interaction.interaction_score || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No drug-gene interactions found for this drug.</p>
        )}
      </Card>
        {/* Additional Information */}
        <Card>
          <h3>Additional Information</h3>
          <p><strong>Absorption:</strong> {drugDetails.drug?.absorption || "No information available."}</p>
          <p><strong>Protein Binding:</strong> {drugDetails.drug?.protein_binding || "No information available."}</p>
          <p><strong>Route of Elimination:</strong> {drugDetails.drug?.route_of_elimination || "No information available."}</p>
          <p><strong>Half-Life:</strong> {drugDetails.drug?.half_life || "No information available."}</p>
        </Card>
      {/* Drug Interactions */}
      <Card>
        <h3>Drug Interactions</h3>
        {drugDetails.interactions?.length > 0 ? (
          <ul>
            {drugDetails.interactions.map((interaction, index) => (
              <li key={index}>
                <strong>{interaction.interaction_drug_name || "Unknown Drug"}:</strong>{" "}
                {interaction.description}
                <br />
                <em>Severity:</em> {interaction.severity || "N/A"}
                <br />
                {interaction.inferred && <em>(Inferred)</em>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No interactions found for this drug.</p>
        )}
      </Card>
      
    </div>
  );
};

export default DrugDetail;

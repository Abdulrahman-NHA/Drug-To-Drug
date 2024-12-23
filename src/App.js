import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axiosInstance from "./api/axiosConfig";
import "./App.css";
import Screen from "./components/Screen";
import Header from "./components/Header";
import DrugList from "./components/DrugList";
import SelectedDrugs from "./components/SelectedDrugs";
import InteractionResults from "./components/InteractionResults";
import DrugDetail from "./components/DrugDetail";
import PulseButton from "./components/PulseButton";
import TitleText from "./components/TitleText";

const App = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStateFilter, setSelectedStateFilter] = useState("");
  const [ordering, setOrdering] = useState("name");
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [interactionResults, setInteractionResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDrugs = async () => {
    setIsLoading(true);
    try {
      const params = {
        search: searchTerm,
        ordering: ordering,
      };
      if (selectedStateFilter) {
        params.state = selectedStateFilter;
      }

      const response = await axiosInstance.get("/api/drugs/", { params });
      setDrugs(response.data);
    } catch (error) {
      console.error("Error fetching drugs:", error);
      alert("Failed to fetch drugs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const addDrug = (drug) => {
    if (!selectedDrugs.some((d) => d.drug_id === drug.drug_id)) {
      setSelectedDrugs([...selectedDrugs, drug]);
      setDrugs(drugs.filter((d) => d.drug_id !== drug.drug_id));
    }
  };

  const removeDrug = (drug) => {
    setSelectedDrugs(selectedDrugs.filter((d) => d.drug_id !== drug.drug_id));
    setDrugs([...drugs, drug]);
  };

  const checkInteractions = async () => {
    const drugIds = selectedDrugs.map((d) => d.drug_id); // Collect selected drug IDs
    if (drugIds.length !== 2) {
      alert("Please select exactly two drugs to check interactions."); // Ensure only two drugs are selected
      return;
    }

    setIsLoading(true); // Show loading spinner
    try {
      const response = await axiosInstance.post('/api/get_interactions_between/', { drug_ids: drugIds });
      setInteractionResults(response.data); // Update interaction results state
    } catch (error) {
      console.error("Error fetching interactions:", error); // Log the error
      alert("Failed to fetch interactions. Please try again.");
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  return (
    <Router>
      <Screen>
        <Header />

        {/* Search Section */}
        <div className="search-container">
          <input
            className="input"
            placeholder="Search for drugs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="dropdown"
            onChange={(e) => setSelectedStateFilter(e.target.value)}
            value={selectedStateFilter}
          >
            <option value="">All States</option>
            <option value="Solid">Solid</option>
            <option value="Liquid">Liquid</option>
          </select>
          <select
            className="dropdown"
            onChange={(e) => setOrdering(e.target.value)}
            value={ordering}
          >
            <option value="name">Sort by Name</option>
            <option value="average_mass">Sort by Average Mass</option>
            <option value="-average_mass">Sort by Mass (Descending)</option>
          </select>
          <button className="search-button" onClick={fetchDrugs}>
            Search
          </button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="left-panel">
            <div className="scrollable-container">
              <TitleText text="Search Results" />
              <DrugList
                drugs={drugs}
                addDrug={addDrug}
                showDetails={(id) => (window.location.href = `/drug-details/${id}`)}
              />
            </div>
          </div>
          <div className="right-panel">
            <div className="scrollable-container">
              <TitleText text="Selected Drugs" />
              <SelectedDrugs
                selectedDrugs={selectedDrugs}
                removeDrug={removeDrug}
              />
            </div>
            <PulseButton onClick={checkInteractions}>
              Check Interactions
            </PulseButton>
          </div>
        </div>

        {/* Interaction Results Section */}
        <div className="interaction-results-container">
          <TitleText text="Interaction Results" />
          {isLoading ? (
            <p>Loading...</p>
          ) : interactionResults.length > 0 ? (
            <table className="interaction-results-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Severity</th>
                  <th>Inferred</th>
                </tr>
              </thead>
              <tbody>
                {interactionResults.map((interaction, index) => (
                  <tr key={index}>
                    <td>{interaction.description || "No description available."}</td>
                    <td>{interaction.severity || "N/A"}</td>
                    <td>{interaction.inferred ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No interactions found between the selected drugs.</p>
          )}
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<div>Welcome to the Drug Interaction App</div>} />
          <Route path="/drug-details/:id" element={<DrugDetail />} />
        </Routes>
      </Screen>
    </Router>
  );
};

export default App;

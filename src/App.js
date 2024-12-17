import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axiosInstance from "./api/axiosConfig";
import "./App.css";

import Screen from "./components/Screen";
import Header from "./components/Header";
import DrugList from "./components/DrugList";
import SelectedDrugs from "./components/SelectedDrugs";
import InteractionResults from "./components/InteractionResults";
import Card from "./components/Card";
import Spinner from "./components/Spinner";
import BarLoader from "./components/BarLoader";
import SkeletonCard from "./components/SkeletonCard";
import Modal from "./components/Modal";
import PulseButton from "./components/PulseButton";
import TitleText from "./components/TitleText";

const fetchInteractionsBetween = async (drugIds) => {
  try {
    const response = await axiosInstance.post("/api/get_interactions_between/", {
      drug_ids: drugIds,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching interactions:", error);
    alert("Failed to fetch interactions. Please try again later.");
    return [];
  }
};

const App = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStateFilter, setSelectedStateFilter] = useState("");
  const [ordering, setOrdering] = useState("name");
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [interactionResults, setInteractionResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [drugDetails, setDrugDetails] = useState(null);

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

  const fetchDrugDetails = async (drugId) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/api/drugs/${drugId}/`);
      setDrugDetails(response.data);
    } catch (error) {
      console.error("Error fetching drug details:", error);
      alert("Failed to fetch drug details. Please try again.");
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStateFilterChange = (e) => {
    setSelectedStateFilter(e.target.value);
  };

  const handleOrderingChange = (e) => {
    setOrdering(e.target.value);
  };

  const checkInteractions = async () => {
    const drugIds = selectedDrugs.map((d) => d.drug_id);
    if (drugIds.length < 2) {
      alert("Please select at least two drugs to check interactions.");
      return;
    }
    setIsLoading(true);
    const interactions = await fetchInteractionsBetween(drugIds);
    setInteractionResults(interactions);
    setIsLoading(false);
  };

  return (
    <Router>
      <Screen>
        <Header />

        <div className="search-container">
          <input
            className="input"
            placeholder="Search for drugs"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            className="dropdown"
            onChange={handleStateFilterChange}
            value={selectedStateFilter}
          >
            <option value="">All States</option>
            <option value="Solid">Solid</option>
            <option value="Liquid">Liquid</option>
          </select>
          <select
            className="dropdown"
            onChange={handleOrderingChange}
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

        <div className="main-content">
          <div className="left-panel">
            {isLoading ? (
              <Spinner />
            ) : drugs.length === 0 ? (
              <SkeletonCard />
            ) : (
              <Card>
                <TitleText text="Search Results" />
                <DrugList
                  drugs={drugs}
                  addDrug={addDrug}
                  showDetails={fetchDrugDetails}
                />
              </Card>
            )}

            <Card>
              <TitleText text="Interaction Results" />
              {drugDetails ? (
                <div>
                  <h3>{drugDetails.drug_name}</h3>
                  <p>{drugDetails.description}</p>
                  <ul>
                    {drugDetails.interactions.map((interaction) => (
                      <li key={interaction.drug_id}>
                        <strong>{interaction.drug_name}:</strong>{" "}
                        {interaction.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Drug not found.</p>
              )}
            </Card>
          </div>

          <div className="right-panel">
            <Card>
              <TitleText text="Selected Drugs" />
              <SelectedDrugs
                selectedDrugs={selectedDrugs}
                removeDrug={removeDrug}
              />
              <PulseButton onClick={checkInteractions}>
                Check Interactions
              </PulseButton>
            </Card>
          </div>
        </div>
      </Screen>
    </Router>
  );
};

export default App;

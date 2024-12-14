import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axiosInstance from "./api/axiosConfig";
import "./App.css";

import Screen from "./components/Screen";
import Header from "./components/Header";
import DrugList from "./components/DrugList";
import SelectedDrugs from "./components/SelectedDrugs";
import InteractionResults from "./components/InteractionResults";
import DrugDetail from "./components/DrugDetail";
import Card from "./components/Card";
import Spinner from "./components/Spinner";
import BarLoader from "./components/BarLoader";
import SkeletonCard from "./components/SkeletonCard";
import Modal from "./components/Modal";
import PulseButton from "./components/PulseButton";
import TitleText from "./components/TitleText";

const fetchInteractionsBetween = async (drugIds) => {
  try {
    const response = await axiosInstance.post("/get_interactions_between/", {
      drug_ids: drugIds,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching interactions:", error);
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDrugs = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/drugs/", {
        params: {
          search: searchTerm,
          state: selectedStateFilter,
          ordering: ordering,
        },
      });
      setDrugs(response.data);
    } catch (error) {
      console.error("Error fetching drugs:", error);
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

  // Removed the useEffect that called set_csrf here

  const checkInteractions = async () => {
    const drugIds = selectedDrugs.map((d) => d.drug_id);
    if (drugIds.length === 0) {
      alert("Please select at least one drug to check interactions.");
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
                <DrugList drugs={drugs} addDrug={addDrug} />
              </Card>
            )}

            {isLoading ? (
              <BarLoader />
            ) : (
              <Card>
                <TitleText text="Interaction Results" />
                <InteractionResults interactionResults={interactionResults} />
              </Card>
            )}
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

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="title-text">Modal Title</h2>
          <p className="text">This is a retro-styled modal.</p>
        </Modal>

        <Routes>
          <Route path="/" element={<div>Welcome to the Drug Interaction App</div>} />
          <Route path="/drugs/:id" element={<DrugDetail />} />
        </Routes>
      </Screen>
    </Router>
  );
};

export default App;

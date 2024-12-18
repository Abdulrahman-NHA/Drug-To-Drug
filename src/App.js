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
import Card from "./components/Card";
import Spinner from "./components/Spinner";
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
    alert("Failed to fetch interactions. Please try again.");
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        {/* Search Section */}
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

        {/* Main Content */}
        <div className="main-content">
          <div className="left-panel">
            {/* Drug Search Results */}
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

            {/* Interaction Results */}
            <Card>
              <TitleText text="Interaction Results" />
              {interactionResults.length > 0 ? (
                <InteractionResults interactionResults={interactionResults} />
              ) : (
                <p>No interactions found.</p>
              )}
            </Card>

            {/* Drug Details */}
            {drugDetails && (
              <Card>
                <TitleText text="Drug Details" />
                <div>
                  <h3>{drugDetails.name}</h3>
                  <p><strong>Description:</strong> {drugDetails.description || "N/A"}</p>
                  <dl>
                    <dt>Drug ID</dt><dd>{drugDetails.drug_id}</dd>
                    <dt>Synonyms</dt><dd>{drugDetails.synonyms || "N/A"}</dd>
                    <dt>CAS Number</dt><dd>{drugDetails.cas_number || "N/A"}</dd>
                    <dt>UNII</dt><dd>{drugDetails.unii || "N/A"}</dd>
                    <dt>InChIKey</dt><dd>{drugDetails.inchikey || "N/A"}</dd>
                    <dt>Average Mass</dt><dd>{drugDetails.average_mass || "N/A"}</dd>
                    <dt>Monoisotopic Mass</dt><dd>{drugDetails.monoisotopic_mass || "N/A"}</dd>
                    <dt>State</dt><dd>{drugDetails.state || "N/A"}</dd>
                    <dt>Indication</dt><dd>{drugDetails.indication || "N/A"}</dd>
                    <dt>Pharmacodynamics</dt><dd>{drugDetails.pharmacodynamics || "N/A"}</dd>
                    <dt>Mechanism of Action</dt><dd>{drugDetails.mechanism_of_action || "N/A"}</dd>
                    <dt>Absorption</dt><dd>{drugDetails.absorption || "N/A"}</dd>
                    <dt>Protein Binding</dt><dd>{drugDetails.protein_binding || "N/A"}</dd>
                    <dt>Metabolism</dt><dd>{drugDetails.metabolism || "N/A"}</dd>
                    <dt>Route of Elimination</dt><dd>{drugDetails.route_of_elimination || "N/A"}</dd>
                    <dt>Half Life</dt><dd>{drugDetails.half_life || "N/A"}</dd>
                    <dt>Clearance</dt><dd>{drugDetails.clearance || "N/A"}</dd>
                  </dl>
                </div>
              </Card>
            )}
          </div>

          {/* Selected Drugs */}
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

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="title-text">Modal Title</h2>
          <p className="text">This is a retro-styled modal.</p>
        </Modal>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<div>Welcome to the Drug Interaction App</div>} />
          <Route path="/drugs/:id" element={<DrugDetail />} />
        </Routes>
      </Screen>
    </Router>
  );
};

export default App;

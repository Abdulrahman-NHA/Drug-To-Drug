import React, { useState } from "react";
import Screen from "./components/Screen";
import Header from "./components/Header";
import Card from "./components/Card";
import SmallCard from "./components/SmallCard";
import TitleText from "./components/TitleText";
import Text from "./components/Text";

const App = () => {
  const [mockDrugs, setMockDrugs] = useState([
    "Aspirin",
    "Ibuprofen",
    "Paracetamol",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrugs, setSelectedDrugs] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const addDrug = (drug) => {
    if (!selectedDrugs.includes(drug)) {
      setSelectedDrugs([...selectedDrugs, drug]);
      setMockDrugs(mockDrugs.filter((d) => d !== drug));
    }
  };

  const removeDrug = (drug) => {
    setSelectedDrugs(selectedDrugs.filter((d) => d !== drug));
    setMockDrugs([...mockDrugs, drug]);
  };

  const filteredDrugs = mockDrugs.filter((drug) =>
    drug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const interactionDetails = [
    {
      type: "Risk",
      content:
        "Interaction between Aspirin and Ibuprofen: Increased risk of gastrointestinal bleeding. It is recommended to monitor the patient closely and consider alternative medications.",
    },
    {
      type: "Warning",
      content:
        "Interaction between Metformin and Lisinopril: Possible risk of lowering blood sugar levels. Monitor blood sugar levels regularly.",
    },
    {
      type: "Safe",
      content:
        "No interaction between Paracetamol and Ibuprofen. Safe to use together.",
    },
  ];

  return (
    <Screen>
      {/* Header */}
      <Header>
        <TitleText text="InteractMeds" />
      </Header>

      {/* Search Input */}
      <div className="search-container">
        <input
          className="input"
          placeholder="Search for drugs"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="search-button">Search</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Panel: Search Results */}
        <div className="left-panel">
          <Card>
            <TitleText text="Search Results" />
            {filteredDrugs.map((drug, index) => (
              <SmallCard key={index}>
                <Text text={drug} />
                <button
                  className="button-small add-button"
                  onClick={() => addDrug(drug)}
                >
                  Add
                </button>
              </SmallCard>
            ))}
          </Card>
        </div>

        {/* Right Panel: Selected Drugs */}
        <div className="right-panel">
          <Card>
            <TitleText text="Selected Drugs" />
            {selectedDrugs.map((drug, index) => (
              <SmallCard key={index}>
                <Text text={drug} />
                <button
                  className="button-small delete-button"
                  onClick={() => removeDrug(drug)}
                >
                  Delete
                </button>
              </SmallCard>
            ))}
          </Card>
        </div>
      </div>

      {/* Always Visible Check Interactions Button */}
      <div className="interaction-button-container">
        <button className="interaction-button">Check Interactions</button>
      </div>

      {/* Interaction Details */}
      <Card>
        <TitleText text="Interaction Details" />
        <div className="interaction-details">
          <div className="interaction-risk">
            <Text text={interactionDetails[0].content} />
          </div>
          <div className="interaction-warning">
            <Text text={interactionDetails[1].content} />
          </div>
          <div className="interaction-safe">
            <Text text={interactionDetails[2].content} />
          </div>
        </div>
      </Card>
    </Screen>
  );
};

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import Text from './Text';

const DrugList = ({ drugs = [], addDrug = () => console.warn("addDrug not provided") }) => {
    if (!Array.isArray(drugs)) {
        console.error("Drugs is not an array:", drugs);
        return <p>Error: Unable to display drug list.</p>;
    }

    return (
        <div className="drug-list">
            <Card>
                {drugs.length === 0 ? (
                    <div>
                        <p>No results found. Try a different search term.</p>
                    </div>
                ) : (
                    <ul>
                        {drugs.map((drug) => (
                            <li key={drug.drug_id} className="small-card">
                                <Text text={drug.name} className="drug-name" />
                                <div>
                                    <Link to={`/drugs/${drug.drug_id}`} className="button-small details-button">
                                        Details
                                    </Link>
                                    <button
                                        className="button-small add-button"
                                        onClick={() => addDrug(drug)}
                                    >
                                        Add
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </Card>
        </div>
    );
};

export default DrugList;

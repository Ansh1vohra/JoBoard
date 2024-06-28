import React, { useEffect, useState } from 'react';
import "./Internships.css";
import { Link } from "react-router-dom";
import Filter from "./Filter";

export default function Internships() {
    const [internships, setInternships] = useState([]);

    useEffect(() => {
        fetch('https://joboard-c8ya.onrender.com/api/jobs/internships')
            .then(response => response.json())
            .then(data => setInternships(data))
            .catch(error => console.error('Error fetching internships:', error));
    }, []);

    return (
        <main className="internshipsContainer">
            <Filter />
            <section className="cardGroup">
                <div>
                    <h3 className="p-3" style={{ textAlign: "center" }}>Find Internship that suits you well!</h3>
                </div>
                {internships.map(internship => (
                    <Link to="/intern-details" className="cardLink" key={internship._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{internship.jobTitle}</h5>
                                <span className="card-text">{internship.companyName || 'Unknown Company'}</span>
                                <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
                                    <span>{internship.jobLocation}</span>
                                    <span>{internship.duration || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </section>
        </main>
    );
}

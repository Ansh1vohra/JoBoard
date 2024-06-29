import React, { useEffect, useState } from 'react';
import "./Internships.css";
import { Link } from "react-router-dom";
import Filter from "./Filter";

export default function Internships() {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        keyword: '',
        profile: '',
        location: '',
        workFromHome: false,
        partTime: false,
    });

    useEffect(() => {
        fetch('https://joboard-c8ya.onrender.com/api/jobs/internships')
            .then(response => response.json())
            .then(data => {
                setInternships(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching internships:', error);
                setLoading(false);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFilters({
            ...filters,
            [name]: checked
        });
    };

    const clearFilters = () => {
        setFilters({
            keyword: '',
            profile: '',
            location: '',
            workFromHome: false,
            partTime: false,
        });
    };

    const filteredInternships = internships.filter(internship => {
        return (
            (filters.keyword === '' || internship.jobTitle.toLowerCase().includes(filters.keyword.toLowerCase())) &&
            (filters.profile === '' || internship.jobProfile.toLowerCase().includes(filters.profile.toLowerCase())) &&
            (filters.location === '' || internship.jobLocation.toLowerCase().includes(filters.location.toLowerCase())) &&
            (!filters.workFromHome || internship.workFromHome === filters.workFromHome) &&
            (!filters.partTime || internship.partTime === filters.partTime)
        );
    });

    return (
        <main className="internshipsContainer">
            <Filter
                filters={filters}
                handleInputChange={handleInputChange}
                handleCheckboxChange={handleCheckboxChange}
                clearFilters={clearFilters}
            />
            <section className="cardGroup">
                <div>
                    <h3 className="p-3" style={{ textAlign: "center" }}>Find Internship that suits you well!</h3>
                </div>
                {loading ? (
                    <div className="spinner-border" role="status" id="LoadSpinner">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    filteredInternships.map(internship => (
                        <Link to="/intern-details" className="cardLink" key={internship._id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{internship.jobTitle}</h5>
                                    <span className="card-text">{internship.companyName || 'Unknown Company'}</span>
                                    <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
                                        <span>{internship.jobLocation}</span>
                                        <span>{internship.duration || 'N/A'} Months</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </section>
        </main>
    );
}

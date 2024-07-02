import React, { useEffect, useState } from 'react';
import "./Internships.css";
import { Link } from "react-router-dom";
import Filter from "./Filter";

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        keyword: '',
        profile: '',
        location: '',
        workFromHome: false,
        partTime: false,
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/jobs/getjobs')
            .then(response => response.json())
            .then(data => {
                setJobs(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
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

    const filteredjobs = jobs.filter(job => {
        const jobTitle = job.jobTitle || '';
        const jobLocation = job.jobLocation || '';
        
        return (
            (filters.keyword === '' || jobTitle.toLowerCase().includes(filters.keyword.toLowerCase())) &&
            (filters.profile === '' || jobTitle.toLowerCase().includes(filters.profile.toLowerCase())) &&
            (filters.location === '' || jobLocation.toLowerCase().includes(filters.location.toLowerCase())) &&
            (!filters.workFromHome || jobLocation.toLowerCase() === 'work from home') &&
            (!filters.partTime || job.time.toLowerCase() === 'part time')
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
                    <h3 className="p-3" style={{ textAlign: "center" }}>Find Job that suits you well!</h3>
                </div>
                {loading ? (
                    <div className="spinner-border" role="status" id="LoadSpinner">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    filteredjobs.map(job => (
                        <Link to={`/job-details/${job.jobID}`} className="cardLink" key={job.jobID}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{job.jobTitle}</h5>
                                    <span className="card-text">{job.companyName || 'Unknown Company'}</span>
                                    <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
                                        <span>{job.jobLocation}</span>
                                        <span>{job.duration || 'N/A'} Months</span>
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

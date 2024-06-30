import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./InternDetails.css";

export default function InternDetails() {
    const { id } = useParams();
    const [internship, setInternship] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/api/jobs/internship/${id}`)
            .then(response => response.json())
            .then(data => {
                setInternship(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching internship details:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!internship) {
        return <div>Internship not found</div>;
    }

    return (
        <div className="internDetailsContainer">
            <h2>{internship.jobTitle}</h2>
            <span><i>{internship.companyName}</i></span>
            <p>{internship.description}</p>
            <p>Skills: {internship.skills.split(',').join(', ')}</p>
            <p>Duration: {internship.duration} Months</p>
            <p>Location: {internship.jobLocation}</p>
            <p>Type: {internship.time}</p>
            <p>Last Date to Apply: {new Date(internship.lastDate.$date).toLocaleDateString()}</p>
            <button className="btn btn-dark">Apply Now!</button>
        </div>
    );
}

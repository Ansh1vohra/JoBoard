import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./InternDetails.css";

export default function InternDetails() {
    const { id } = useParams();
    const [internship, setInternship] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://jo-board.vercel.app/api/jobs/internship/${id}`)
            .then(response => response.json())
            .then(data => {
                setInternship(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching internship:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="internDetailsContainer">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!internship) {
        return (
            <div className="internDetailsContainer">
                <h2>Internship not found</h2>
            </div>
        );
    }

    return (
        <div className="internDetailsContainer">
            <h2>{internship.jobTitle}</h2>
            <span className="companyName"><i>{internship.companyName}</i></span>
            <p className="description">{internship.description}</p>
            <p className="skills">
                <strong>Skills:</strong>
                <br />
                {internship.skills.join(', ')}
            </p>
            <p className="details">
                <strong>Duration:</strong> {internship.duration} Months
                <br />
                <strong>Location:</strong> {internship.jobLocation}
                <br />
                <strong>Time:</strong> {internship.time}
                <br />
                <strong>Last Date to Apply:</strong> {internship.lastDateToApply}
            </p>
            <button className="btn btn-dark">Apply Now!</button>
        </div>
    );
}

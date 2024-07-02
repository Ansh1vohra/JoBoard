import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "./InternDetails.css";

export default function InternDetails() {
    const { id } = useParams();
    const [job, setjob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/api/jobs/jobdetail/${id}`)
            .then(response => response.json())
            .then(data => {
                data.description = data.description.replace(/\\n/g, '\n');
                setjob(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching job details:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
        <div className='container'>
            <div className="internDetailsContainer  placeholder">
            <h2 className="placeholder">Front End Developer</h2>
            <span className=" placeholder"><i>ABC Company</i></span>
            <p style={{ whiteSpace: 'pre-line' }} className=" placeholder">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae modi quas laboriosam enim aperiam facere! Ipsum aperiam autem vero reprehenderit commodi sed nisi a corporis? Deleniti repellendus mollitia itaque qui.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae modi quas laboriosam enim aperiam facere! Ipsum aperiam autem vero reprehenderit commodi sed nisi a corporis? Deleniti repellendus mollitia itaque qui.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae modi quas laboriosam enim aperiam facere! Ipsum aperiam autem vero reprehenderit commodi sed nisi a corporis? Deleniti repellendus mollitia itaque qui.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae modi quas laboriosam enim aperiam facere! Ipsum aperiam autem vero reprehenderit commodi sed nisi a corporis? Deleniti repellendus mollitia itaque qui.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae modi quas laboriosam enim aperiam facere! Ipsum aperiam autem vero reprehenderit commodi sed nisi a corporis? Deleniti repellendus mollitia itaque qui.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae modi quas laboriosam enim aperiam facere! Ipsum aperiam autem vero reprehenderit commodi sed nisi a corporis? Deleniti repellendus mollitia itaque qui.</p>
            <p className=" placeholder">Skills: React,Next,TailWind CSS,Angular,Typescript</p>
            <p className=" placeholder">Duration: 3 Months</p>
            <p className=" placeholder">Location: Work From Home</p>
            <p className=" placeholder">Type: Part Time</p>
            <p className=" placeholder">Last Date to Apply: 13-11-2024</p>
            <button className="btn btn-danger placeholder">Apply Now!</button>
        </div>;
        </div>
        )
    }

    if (!job) {
        return <div>Job/Internship not found</div>;
    }

    return (
        <div className='container'>

        <div className="internDetailsContainer">
            <h2>{job.jobTitle}</h2>
            <span><i>{job.companyName}</i></span>
            <p style={{ whiteSpace: 'pre-line' }}>{job.description}</p>
            <p>Skills: {job.skills.split(',').join(', ')}</p>
            <p>Duration: {job.duration} Months</p>
            <p>Location: {job.jobLocation}</p>
            <p>Type: {job.time}</p>
            <p>Last Date to Apply: {new Date(job.lastDate.$date).toLocaleDateString()}</p>
            <Link style={{textDecoration:'none'}} to={`/job-details/${id}/apply`}>
                <button className="btn btn-danger">Apply Now!</button>
            </Link>
        </div>
        </div>
    );
}

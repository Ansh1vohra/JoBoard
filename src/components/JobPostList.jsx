import { Link } from 'react-router-dom';
import './HireDashboard.css';
import { useState, useEffect } from 'react';

export default function JobPostList({ companyDetails }) {
    const [jobs, setJobs] = useState([]);
    const [jobsError, setJobsError] = useState('');
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        if (!companyDetails || !companyDetails.companyId) {
            setJobsError('Company details are not available.');
            return;
        }

        const fetchJobsByCompanyId = async (companyId) => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/jobs/getJobByCID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ c_Id: companyId }),
                });

                if (!response.ok) {
                    setLoading(false);
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if (data){
                    setLoading(false);
                }
                setJobs(data.jobs);
                setJobsError('');
            } catch (error) {
                setJobsError(error.message);
                setJobs([]);
            }
        };

        fetchJobsByCompanyId(companyDetails.companyId);
    }, [companyDetails]);

    return (
        <div className="posts">
            {jobsError && <p className="error">{jobsError}</p>}
            {loading && <p>Loading.......</p>}
            {jobs.length > 0 ? (
                jobs.map((job) => (
                    <div className='jobCard' key={job._id} id={job._id} >
                        <b>{job.jobTitle}</b>
                        <i>{job.jobType}</i>
                        <i>{job.jobLocation}</i>
                        <i>Applications: {job.applicantCount}</i>
                        <Link to={`/applications/${job.jobID}`}><button className='btn btn-dark'>View Applications</button></Link>
                    </div>
                ))
            ) : (
                <p>No Jobs/Internships posted yet.</p>
            )}
        </div>
    );
}

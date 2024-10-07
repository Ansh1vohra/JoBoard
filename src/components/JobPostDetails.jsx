import './JobPostDetails.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ApplicationDetails() {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [applicationsError, setApplicationsError] = useState('');

    useEffect(() => {
        const fetchApplications = async (jobId) => {
            try {
                const response = await fetch('http://localhost:5000/api/application/getApplicationsByJobID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ jobID: jobId }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setApplications(data.applications);
                setApplicationsError('');
            } catch (error) {
                setApplicationsError(error.message);
                setApplications([]);
            }
        };

        fetchApplications(jobId);
    }, [jobId]);

    const viewResume = async (applicationId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/application/getResume/${applicationId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        } catch (error) {
            console.error('Error fetching resume:', error);
        }
    };

    return (
        <div className="applications">
            <h2 className='p-2 m-1'>Applications :</h2>
            {applicationsError && <p className="error">{applicationsError}</p>}
            {applications.length > 0 ? (
                applications.map((application) => (
                    <div className='applicationCard' key={application._id} id={application._id}>
                        <p><b>User Email:</b> {application.userMail}</p>
                        <p><b>Cover Letter:</b> {application.coverLetter}</p>
                        <button 
                            className='btn btn-outline-dark' 
                            onClick={() => viewResume(application._id)}>View Resume</button>
                    </div>
                ))
            ) : (
                <p>No applications found for this job.</p>
            )}
        </div>
    );
}

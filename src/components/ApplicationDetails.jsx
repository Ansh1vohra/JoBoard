import './JobPostDetails.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ApplicationDetails() {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [applicationsError, setApplicationsError] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchApplications = async () => {
            setIsLoading(true); // Start loading
            try {
                const response = await fetch('https://jo-board.vercel.app/api/application/getApplicationsByJobID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ jobID: jobId }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch applications');
                }

                const data = await response.json();
                setApplications(data.applications || []);
                setApplicationsError('');
            } catch (error) {
                setApplicationsError(error.message);
                setApplications([]);
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        fetchApplications();
    }, [jobId]);

    const viewResume = (applicationId) => {
        // alert(`View resume for application ID: ${applicationId}`);
        const application = applications.find(app => app._id === applicationId);
    
        if (application && application.resume) {
            // Decode the base64 string
            const byteCharacters = atob(application.resume);
            const byteNumbers = new Uint8Array(byteCharacters.length);
            
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
    
            // Create a Blob from the byte array
            const blob = new Blob([byteNumbers], { type: 'application/pdf' });
    
            // Create a URL for the Blob
            const blobUrl = URL.createObjectURL(blob);
    
            // Open the PDF in a new tab
            window.open(blobUrl, '_blank');
    
            // Optionally, revoke the object URL after some time to free up memory
            setTimeout(() => URL.revokeObjectURL(blobUrl), 100); // Revoke after 100ms
        } else {
            alert('No resume available for this application.');
        }
    };

    return (
        <div className="applications">
            <h2 className='p-2 m-1'>Applications :</h2>
            {applicationsError && <p className="error">{applicationsError}</p>}
            {isLoading ? (
                <p>Loading applications...</p> // Loading indicator
            ) : (
                applications.length > 0 ? (
                    applications.map((application) => (
                        <div className='applicationCard' key={application._id} id={application._id}>
                            <p><b>User Email:</b> {application.userMail}</p>
                            <p><b>Cover Letter:</b> {application.coverLetter}</p>
                            {/* Removed Similarity Score Display */}
                            <button 
                                className='btn btn-outline-dark' 
                                onClick={() => viewResume(application._id)}>View Resume</button>
                        </div>
                    ))
                ) : (
                    <p>No applications found for this job.</p>
                )
            )}
        </div>
    );
}

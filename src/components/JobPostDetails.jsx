import './JobPostDetails.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ApplicationDetails() {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [applicationsError, setApplicationsError] = useState('');
    // const [sortedApplications, setSortedApplications] = useState([]);
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
                // setIsLoading(false); // Stop loading
            }
        };

        fetchApplications();
    }, [jobId]);

    /*

    const getSimilarityScores = async (keywords) => {
        try {
            const requestData = {
                job_title: 'fxdgcbh',
                job_description: keywords, // Pass the job title or keywords as required
                resumes: applications.map(app => ({
                    filename: `${app._id}.pdf`,
                    content: app.resume, // Assuming resume is stored as base64 in 'resume'
                })),
            };

            const response = await fetch('http://127.0.0.1:5000/api/rank_resumes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const similarityData = await response.json();
            
            if (response.ok) {
                const sortedApps = applications.map((app, index) => ({
                    ...app,
                    similarity_score: similarityData.ranked_resumes[index].score,
                })).sort((a, b) => b.similarity_score - a.similarity_score);

                setSortedApplications(sortedApps);
                setIsLoading(false);
            } else {
                throw new Error('Failed to fetch similarity scores');
            }
        } catch (error) {
            console.error("Error fetching similarity scores:", error);
        }
     };*/

    useEffect(() => {
        // const keywords = "javascript, html, css, react, next.js"; 
        if (applications.length > 0) {
            // getSimilarityScores(keywords);
        }
    }, [applications]);

    const viewResume = (applicationId) => {
        // Implement the functionality to view the resume
        alert(`View resume for application ID: ${applicationId}`);
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
                            {/* <p><b>Similarity Score:</b> {application.similarity_score.toFixed(2)}%</p> */}
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

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./ApplicationForm.css";

export default function ApplicationForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [userMail, setUserMail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isApplicationExpired, setIsApplicationExpired] = useState(false);
    const [alreadyApplied,setAlreadyApplied] = useState(false);

    useEffect(() => {
        const isSignedIn = localStorage.getItem('SignIn') === 'true';
        if (isSignedIn) {
            setUserMail(localStorage.getItem('UserMail'));
        } else {
            navigate('/signin');
        }

        fetch(`https://jo-board.vercel.app/api/jobs/jobdetail/${id}`)
            .then(response => response.json())
            .then(data => {
                data.description = data.description.replace(/\\n/g, '\n');
                setJob(data);
                setLoading(false);

                // Check if the last date to apply has passed
                const lastDate = new Date(data.lastDate);
                const currentDate = new Date();
                setIsApplicationExpired(currentDate > lastDate);
            })
            .catch(error => {
                console.error('Error fetching job details:', error);
            });
    }, [id, navigate]);

    if (loading) {
        return <div className='error'>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    if (!job) {
        return <div className='error'>Job not found</div>;
    }

    const fileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.size > 2097152) {
            setShowModal(true);
            event.target.value = "";
        } else {
            setResume(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isApplicationExpired) return;

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('userMail', userMail);
        formData.append('jobID', id);
        formData.append('resume', resume);
        formData.append('coverLetter', coverLetter);

        fetch(`https://jo-board.vercel.app/api/application/applyJob`, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setIsSubmitting(false);
            if (data.message === 'Application Posted Successfully!') {
                navigate('/application-history');
            } else {
                console.log(data.message);
                if (data.message==="User Has Already Applied For this Job"){
                    setAlreadyApplied(true);
                }
                setIsSubmitting(false);
            }
        })
        .catch(error => {
            setIsSubmitting(false);
            console.error('Error submitting application:', error);
        });
    };

    return (
        <div className='d-flex justify-content-center'>
            <div className="applicationFormContainer">
                <h2>Submit Your Application</h2>
                <p><strong>Job Title:</strong> {job.jobTitle}</p>
                <p><strong>Company Name:</strong> {job.companyName || 'Company Name!'}</p>

                {/* Display message if the application period has expired */}
                {isApplicationExpired && (
                    <p className="text-danger">The application period for this job has expired.</p>
                )}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Resume:</label>
                        <p style={{ textAlign: 'left' }}>Upload Your Resume (Max File Size: 2MB)</p>
                        <input
                            type="file"
                            name="resume"
                            id="resume"
                            onChange={fileUpload}
                            required
                            disabled={isApplicationExpired || isSubmitting}
                        />
                    </div>
                    <div>
                        <label>Cover Letter:</label>
                        <p style={{ textAlign: 'left' }}>Why you should be hired for this role?</p>
                        <textarea
                            name="coverLetter"
                            rows="10"
                            id="cv"
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            required
                            disabled={isApplicationExpired || isSubmitting}
                        ></textarea>
                    </div>
                    <p>Last Date to Apply: {new Date(job.lastDate).toLocaleDateString()}</p>

                    {/* Display loading state for submission */}
                    {isSubmitting ? (
                        <button type="button" disabled>
                            Submitting...
                        </button>
                    ) : (
                        <button type="submit" disabled={isApplicationExpired}>Submit Application</button>
                    )}
                    {alreadyApplied?(
                        <p>You Have Already Applied For this Job</p>
                    ):null}
                </form>
            </div>

            {showModal && (
                <div className="modal" id="FileSizeLimit">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger" id='modalTitle'>
                                    File Size Too Large
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                >
                                </button>
                            </div>
                            <div className="modal-body" id="modalBody">
                                <p>The File Limit is only 2MB.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

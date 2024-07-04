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
    let userMail = "";

    useEffect(() => {
        fetch(`https://jo-board.vercel.app/api/jobs/jobdetail/${id}`)
            .then(response => response.json())
            .then(data => {
                data.description = data.description.replace(/\\n/g, '\n');
                setJob(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching job details:', error);
            });
            if (localStorage.getItem('SignIn')=== true) {
                userMail = localStorage.getItem('UserMail');
            } else {
                navigate('/signin');
            }
    }, [id]);


    if (loading) {
        return <div className='error'>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
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
            if (data.message === 'Application Posted Successfully!') {
                alert('Application Submitted');
                navigate('/application-history');
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error submitting application:', error);
            alert("Error submitting application. Please try again later.");
        });
    };

    return (
        <div className='d-flex justify-content-center'>
            <div className="applicationFormContainer">
                <h2>Submit Your Application</h2>
                <p><strong>Job Title:</strong> {job.jobTitle}</p>
                <p><strong>Company Name:</strong> {job.companyName || 'Company Name!'}</p>
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
                        ></textarea>
                    </div>
                    <p>Last Date to Apply: {new Date(job.lastDate).toLocaleDateString()}</p>
                    <button type="submit">Submit Application</button>
                </form>
            </div>
            {showModal && (
                <div className="modal" id="FileSizeLimit">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-danger" id='modalTitle'>
                            File Size Too Large</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => {
                                setShowModal(false);
                            }}
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

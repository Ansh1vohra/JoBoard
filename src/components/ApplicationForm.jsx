import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./ApplicationForm.css";

export default function ApplicationForm() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/api/jobs/jobdetail/${id}`)
            .then(response => response.json())
            .then(data => {
                data.description = data.description.replace(/\\n/g, '\n');
                setJob(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching job details:', error);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!job) {
        return <div>Job not found</div>;
    }

    const fileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.size > 2097152) {
            alert("File is too big! Maximum size allowed is 2MB.");
            event.target.value = ""; // Clear the file input
        } else {
            setResume(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('jobID', id);
        formData.append('resume', resume);
        formData.append('coverLetter', coverLetter);

        fetch(`http://localhost:5000/api/jobdetail/${id}/apply`, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Application Posted Successfully!') {
                alert("Your application has been submitted successfully!");
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
                    <p>Last Date to Apply: {new Date(job.lastDate.$date).toLocaleDateString()}</p>
                    <button type="submit">Submit Application</button>
                </form>
            </div>
        </div>
    );
}

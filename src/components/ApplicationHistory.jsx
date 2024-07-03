import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import './ApplicationHistory.css';

export default function ApplicationHistory() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userMail = localStorage.getItem('UserMail');

        // Fetch the application history from the backend
        fetch('http://localhost:5000/api/application/userApplications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userMail }) // Send userMail in the body
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch applications');
            }
            return response.json();
        })
        .then(data => {
            setApplications(data.applications);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching applications:', error);
            setError(error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <main className='mainContainer placeholder'>

                    <div className="applicationHistoryContainer">
                        <h2 className='placeholder'>Application History</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th className='placeholder'>Job Title</th>
                                    <th className='placeholder'>Company Name</th>
                                    <th className='placeholder'>Applied On</th>
                                </tr>
                                <tr>
                                    <th className='placeholder'>Job Title</th>
                                    <th className='placeholder'>Company Name</th>
                                    <th className='placeholder'>Applied On</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td className='placeholder'>Test</td>
                                        <td className='placeholder'>Test</td>
                                        <td className='placeholder'>Test</td>
                                    </tr>
                                    <tr>
                                        <td className='placeholder'>Test</td>
                                        <td className='placeholder'>Test</td>
                                        <td className='placeholder'>Test</td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                    </main>;
    }

    if (error) {
        return <div className='error'>Error: {error.message}</div>;
    }

    if (applications.length === 0) {
        return <div className='error'>You have not applied for any jobs yet.
            <Link to='/jobs'><button className='btn btn-outline-dark'>Search for Jobs</button></Link>
        </div>;
    }

    return (
        <main className='mainContainer'>

        <div className="applicationHistoryContainer">
            <h2>Application History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Company Name</th>
                        <th>Applied On</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map(application => (
                        <tr key={application._id}>
                            <td>{application.jobTitle}</td>
                            <td>{application.companyName}</td>
                            <td>{new Date(application.appliedOn).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </main>
    );
}

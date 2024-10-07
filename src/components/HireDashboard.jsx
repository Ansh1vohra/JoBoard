import { useState,useEffect } from "react";
import './HireDashboard.css';
import PostJob from './PostJob';
import JobPostList from './JobPostList';

function Dashboard() {
    const [companyDetails, setCompanyDetails] = useState(null);
    const [error, setError] = useState('');
    const [loading,setLoading] = useState(false);
    const UserEmail = localStorage.getItem('UserMail');

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/company/details', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: UserEmail }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data){
                    setLoading(false);
                    setCompanyDetails(data);
                }else{
                    setLoading(false);
                    setCompanyDetails(null);
                }
                setError('');
            } catch (error) {
                setError(error.message);
                setCompanyDetails(null);
            }
        };

        fetchCompanyDetails();
    }, [UserEmail]);
    return (
        <div className="dashboard">
            <h1>Hiring Dashboard</h1>
            <nav className='m-3'>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                        <span style={{color:'black'}}>Home</span>
                    </button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                        <span style={{color:'black'}}>Status of Posted Jobs/Internships</span>
                    </button>
                    <button className="nav-link" id="nav-post-tab" data-bs-toggle="tab" data-bs-target="#nav-post" type="button" role="tab" aria-controls="nav-post" aria-selected="false">
                        <span style={{color:'black'}}>Post Job/Internship</span>
                    </button>
                </div>
            </nav>
            <div className="tab-content m-3" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                    {loading && 
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    }
                    <div className='h-200'>
                        {/* <p>Hello Company User!</p> */}
                        {error && <p className="error">{error}</p>}
                        {companyDetails && (
                            <div>
                                <h2>Hello! {companyDetails.companyName}</h2>
                                <p><b>Company Email:</b> {companyDetails.companyMail}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                    <JobPostList companyDetails={companyDetails} />
                </div>
                <div className="tab-pane fade show" id="nav-post" role="tabpanel" aria-labelledby="nav-post-tab" tabindex="0">
                    <PostJob companyDetails={companyDetails}/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

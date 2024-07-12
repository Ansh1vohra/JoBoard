import './HireDashboard.css';
import { useState } from "react";

function Dashboard() {
    const [isPosted, setisPosted]=useState(false);
    function postJob(e){
        e.preventDefault();
        setisPosted(true);
    }
    return (
        <div className="dashboard">
            <h1>Hiring Dashboard</h1>
            <nav className='m-3'>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                        <span style={{color:'black'}}>Post Job/Internship</span>
                    </button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                        <span style={{color:'black'}}>Status of Posted Jobs/Internships</span>
                    </button>
                </div>
            </nav>
            <div className="tab-content m-3" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                    <form onSubmit={postJob} className='jobform'>
                        <label>Job Title:</label>
                        <input className='form-control' placeholder='Job Title (eg. Front End Developer)' required />
                        <div className='d-flex flex-column flex-md-row gap-3'>
                            <select className='form-select' required>
                                <option selected>Choose Job Type</option>
                                <option value="Internship">Internship</option>
                                <option value="Job">Job</option>
                            </select>
                            <select className='form-select' required>
                                <option selected value="Work From Home">Work From Home</option>
                                <option value="On Site">On Site</option>
                            </select>
                        </div>
                        <label>Skills Required :</label>
                        <input className='form-control' placeholder='Skills Required (use "," between skills)' required/>
                        <label>Minimum Experience :</label>
                        <input className='form-control' placeholder='Minimum Experience Required(Leave this if not applicable)'/>
                        <label>Job/Internship Details :</label>
                        <textarea className='form-control' placeholder='Description (Mention about stipen/salary here itself)' rows={8} required></textarea>
                        <label>Location:</label>
                        <input className='form-control' placeholder='Location'></input>
                        <div className='lastDate'>
                            <label>Last Date To Apply:-</label>
                            <input className='form-control' type="date" placeholder='Last Date to Apply!'></input>
                        </div>
                        <button type="submit" className='btn btn-outline-dark'>Post</button>
                        {isPosted && 
                            <p className='alert alert-success' style={{ display: 'block' }}>Posted Sucessfully</p>
                        }
                    </form>
                    
                </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                    <div className="posts">
                        <div className='jobCard'>
                            <b>Front End Developer</b>
                            <i>Internship</i>
                            <i>Work From Home</i>
                        </div>
                        <div className='jobCard'>
                            <b>Front End Developer</b>
                            <i>Internship</i>
                            <i>Work From Home</i>
                        </div>
                        <div className='jobCard'>
                            <b>Front End Developer</b>
                            <i>Internship</i>
                            <i>Work From Home</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

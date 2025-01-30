import { useState } from "react";
import './HireDashboard.css';

export default function PostJob({ companyDetails }) {
    const [isPosted, setIsPosted] = useState(false);
    const [jobTitle, setJobTitle] = useState('');
    const [jobType, setJobType] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [skills, setSkills] = useState('');
    const [minExp, setMinExp] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [lastDate, setLastDate] = useState('');
    const [duration, setDuration] = useState('');
    const [time, setTime] = useState('');

    const handlePostJob = async (e) => {
        e.preventDefault();
        const newJob = {
            jobTitle,
            jobType,
            jobLocation,
            skills,
            minExp,
            description,
            location,
            lastDate,
            duration,
            time,
            CompanyId: companyDetails.companyId,
        };

        try {
            const response = await fetch('https://jo-board-server.vercel.app/api/jobs/postJob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newJob),
            });

            if (response.ok) {
                setIsPosted(true);
            } else {
                console.error('Failed to post job');
            }
        } catch (error) {
            console.error('Error posting job:', error);
        }
    };

    return (
        <form onSubmit={handlePostJob} className='jobform'>
            <label>Job Title:</label>
            <input 
                className='form-control' 
                placeholder='Job Title (eg. Front End Developer)' 
                required 
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
            />
            <div className='d-flex flex-column flex-md-row gap-3'>
                <select 
                    className='form-select' 
                    required 
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                >
                    <option value="">Choose Job Type</option>
                    <option value="Internship">Internship</option>
                    <option value="Job">Job</option>
                </select>
                <select 
                    className='form-select' 
                    required 
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                >
                    <option value="">Choose Job Location</option>
                    <option value="Work From Home">Work From Home</option>
                    <option value="On Site">On Site</option>
                </select>
                <select 
                    className='form-select' 
                    required 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                >
                    <option value="">Choose Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Full Time">Full Time</option>
                </select>
            </div>
            <label>Skills Required :</label>
            <input 
                className='form-control' 
                placeholder='Skills Required (use "," between skills)' 
                required
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
            />
            <label>Minimum Experience :</label>
            <input 
                className='form-control' 
                placeholder='Minimum Experience Required (Leave this if not applicable)'
                value={minExp}
                onChange={(e) => setMinExp(e.target.value)}
            />
            <label>Duration :</label>
            <input 
                className='form-control' 
                placeholder='Duration (in months)'
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
            />
            <label>Job/Internship Details :</label>
            <textarea 
                className='form-control' 
                placeholder='Description (Mention about stipend/salary here itself)' 
                rows={8} 
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label>Location:</label>
            <input 
                className='form-control' 
                placeholder='Location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <div className='lastDate'>
                <label>Last Date To Apply:</label>
                <input 
                    className='form-control' 
                    type="date" 
                    placeholder='Last Date to Apply!'
                    value={lastDate}
                    onChange={(e) => setLastDate(e.target.value)}
                />
            </div>
            <button type="submit" className='btn btn-outline-dark'>Post</button>
            {isPosted && 
                <p className='alert alert-success' style={{ display: 'block' }}>Posted Successfully</p>
            }
        </form>
    );
}

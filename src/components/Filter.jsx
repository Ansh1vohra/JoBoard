import React from 'react';
import "./Internships.css";

export default function Filter({ filters, handleInputChange, handleCheckboxChange, clearFilters }) {
    return (
        <section className="filterSection">
            <div>
                <span style={{ fontSize: "18px" }}>Apply Filters</span>
            </div>
            <div className="searchBars">
                <input
                    className="form-control"
                    placeholder="Keyword"
                    name="keyword"
                    value={filters.keyword}
                    onChange={handleInputChange}
                />
                <input
                    className="form-control"
                    placeholder="Profile"
                    name="profile"
                    value={filters.profile}
                    onChange={handleInputChange}
                />
                <input
                    className="form-control"
                    placeholder="Location"
                    name="location"
                    value={filters.location}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="workFromHome"
                        checked={filters.workFromHome}
                        onChange={handleCheckboxChange}
                        id="flexCheckDefault"
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Work From Home
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="partTime"
                        checked={filters.partTime}
                        onChange={handleCheckboxChange}
                        id="flexCheckChecked"
                    />
                    <label className="form-check-label" htmlFor="flexCheckChecked">
                        Part Time
                    </label>
                </div>
            </div>
            <button className="btn btn-outline-light" onClick={clearFilters}>Clear Filters</button>
        </section>
    );
}
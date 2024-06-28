import "./Internships.css";

export default function Filter(){
    return(
        <section className="filterSection">
                <div>
                    <span style={{ fontSize: "18px" }}>Apply Filters</span>
                </div>
                <div className="searchBars">
                    <input className="form-control" placeholder="Keyword" />
                    <input className="form-control" placeholder="Profile" />
                    <input className="form-control" placeholder="Location" />
                </div>
                <div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                            Work From Home
                        </label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                        <label class="form-check-label" for="flexCheckChecked">
                            Part Time
                        </label>
                    </div>
                </div>
                <button className="btn btn-outline-light">Clear Filters</button>
            </section>
    )
}
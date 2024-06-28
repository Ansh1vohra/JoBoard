import "./Internships.css";
import { Link } from "react-router-dom";
import Filter from "./Filter";

export default function Internships(){
    return(
        <main className="internshipsContainer">
            <Filter />
            <section className="cardGroup">
                <div>
                    <h3 className="p-3" style={{textAlign: "center" }}>Find Internship that suits you well!</h3>
                </div>
                <Link to="/intern-details" className="cardLink" ><div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Front End Development</h5>
                        <span className="card-text">Company ABC</span>
                        <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
                            <span>Work From Home</span>
                            <span>2 Months</span>
                        </div>
                    </div>
                </div></Link>
                <Link to="/intern-details" className="cardLink" ><div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Front End Development</h5>
                        <span className="card-text">Company ABC</span>
                        <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
                            <span>Work From Home</span>
                            <span>2 Months</span>
                        </div>
                    </div>
                </div></Link>
                <Link to="/intern-details" className="cardLink" ><div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Front End Development</h5>
                        <span className="card-text">Company ABC</span>
                        <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
                            <span>Work From Home</span>
                            <span>2 Months</span>
                        </div>
                    </div>
                </div></Link>
                <Link to="/intern-details" className="cardLink" ><div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Front End Development</h5>
                        <span className="card-text">Company ABC</span>
                        <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
                            <span>Work From Home</span>
                            <span>2 Months</span>
                        </div>
                    </div>
                </div></Link>
                <Link to="/intern-details" className="cardLink" ><div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Front End Development</h5>
                        <span className="card-text">Company ABC</span>
                        <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
                            <span>Work From Home</span>
                            <span>2 Months</span>
                        </div>
                    </div>
                </div></Link>
                <Link to="/intern-details" className="cardLink" ><div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Front End Development</h5>
                        <span className="card-text">Company ABC</span>
                        <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
                            <span>Work From Home</span>
                            <span>2 Months</span>
                        </div>
                    </div>
                </div></Link>                
            </section>
        </main>
    )
}
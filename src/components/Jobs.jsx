import "./Internships.css";
import Filter from "./Filter";

export default function Jobs(){
    return(
        <main className="internshipsContainer">
            <Filter />
            <section className="cardGroup"></section>
        </main>
    )
}
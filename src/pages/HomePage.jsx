import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import carHero from "../assets/s-l1600.jpg";
import "./HomePage.css";


const CATEGORIES = [
  "On-road cars (for smooth surfaces)",
  "Off-road buggies (for rough terrain)",
  "Monster trucks",
  "Drift cars",
];

export default function HomePage() {
  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__hero-text">
          <h1>Welcome RC CAR</h1>
          <p className="home__hero-lead">Our shop offers popular types including:</p>
          <ul className="home__hero-list">
            {CATEGORIES.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className="home__hero-actions">
            <Link to="/models" className="home__cta-btn">
              Explore Models <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="home__hero-image">
          <img src={carHero} alt="Featured RC race car" />
        </div>
      </section>
    </div>
  );
}
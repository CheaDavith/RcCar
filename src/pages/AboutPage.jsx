import { Shield, Wrench, Trophy, Zap } from "lucide-react";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-container">
        {/* Hero Section */}
        <div className="about-hero">
          <h1>About RC CAR</h1>
          <p className="about-lead">
            Built for the drift, the dirt, and everything in between. We are passionate about bringing top-tier radio-controlled performance vehicles to enthusiasts everywhere.
          </p>
        </div>

        {/* Story / Mission Grid */}
        <div className="about-grid">
          <div className="about-card">
            <div className="about-icon-wrap">
              <Zap size={24} />
            </div>
            <h2>Our Mission</h2>
            <p>
              To provide hobbyists and professional racers with high-performance, durable, and precision-engineered RC cars that deliver unmatched speed and control on any terrain.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon-wrap">
              <Wrench size={24} />
            </div>
            <h2>Expert Support</h2>
            <p>
              We don’t just sell cars; we live and breathe them. Our team provides expert advice, maintenance guidance, and replacement parts to keep you racing at peak performance.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon-wrap">
              <Trophy size={24} />
            </div>
            <h2>Quality & Durability</h2>
            <p>
              Every model in our shop—from on-road drift beasts to heavy-duty off-road buggies—is rigorously tested to withstand high speeds, rough jumps, and intense competition.
            </p>
          </div>
        </div>

        {/* Community Section */}
        <div className="about-community">
          <div className="community-content">
            <div className="community-badge-wrap">
              <Shield size={32} />
            </div>
            <h2>Join the RC Community</h2>
            <p>
              Whether you are tuning your first drift car or competing in local off-road dirt tracks, our platform connects you with the right models, reviews, and gear to fuel your passion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
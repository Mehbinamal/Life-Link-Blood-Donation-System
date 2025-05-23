import React from "react";
import Navbar from "../../components/Navbar"; // Ensure the correct path
import "./About.css"; // CSS file for styling

function About() {
  return (
    <>
      {/* Include Navbar */}
      <Navbar />

      <div className="about-container">
        <h1 className="about-title">About LifeLink</h1>

        {/* Introduction */}
        <section className="about-section">
          <h2>What is LifeLink?</h2>
          <p>
            LifeLink is a platform designed to connect blood donors with recipients in urgent need.
            Our mission is to make blood donation accessible, efficient, and life-saving. Whether
            you're looking to donate blood or in need of it, LifeLink bridges the gap between donors
            and recipients seamlessly.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="about-section">
          <h2>Our Mission & Vision</h2>
          <p><strong>Mission:</strong> To ensure that no life is lost due to the unavailability of blood.</p>
          <p><strong>Vision:</strong> A world where blood donation is quick, easy, and accessible to everyone in need.</p>
        </section>

        {/* How It Works */}
        <section className="about-section">
          <h2>How LifeLink Works?</h2>
          <ul>
            <li><strong>Sign Up:</strong> Register as a donor or recipient.</li>
            <li><strong>Find Requests:</strong> View real-time blood requests in your area.</li>
            <li><strong>Donate or Request:</strong> Coordinate directly with donors or recipients.</li>
            <li><strong>Save Lives:</strong> Every drop counts! Make a difference today.</li>
          </ul>
        </section>

        {/* Why Donate Blood? */}
        <section className="about-section">
          <h2>Why Donate Blood?</h2>
          <p>Donating blood can:</p>
          <ul>
            <li>Save lives in emergencies, surgeries, and medical treatments.</li>
            <li>Help patients battling cancer, accidents, and chronic illnesses.</li>
            <li>Improve your own health by reducing iron overload and improving circulation.</li>
          </ul>
        </section>

        {/* Testimonials */}
        <section className="about-section">
          <h2>Testimonials</h2>
          <blockquote>
            "Thanks to LifeLink, I found a blood donor in less than an hour. This platform is truly a lifesaver!"
            <br /> – <strong>Anujith PP</strong>, Blood Recipient
          </blockquote>
        </section>

        <section className="about-section">
    <h2>Meet the Creators</h2>
    <p>Developed with dedication by:</p>
    <ul>
        <li>
            <a 
                href="https://www.linkedin.com/in/Amal-Mehabin-P/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="linkedin-link"
            >
                <strong>Amal Mehbin</strong>
            </a>
        </li>
        <li>
            <a 
                href="https://www.linkedin.com/in/muhannad-mohammed-ali-b1964432a/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="linkedin-link"
            >
                <strong>Muhannad Mohammed Ali</strong>
            </a>
        </li>
    </ul>
</section>


        {/* Contact / Get Involved */}
        <section className="about-section">
          <h2>Get Involved</h2>
          <p>Join us in our mission to save lives! Register today as a blood donor or request blood when needed.</p>
          <p><strong>Contact Us:</strong></p>
          <p>
            Email: <a href="mailto:mmamuhanned@gmail.com" className="email-link">mmamuhanned@gmail.com</a>
          </p>
          <p>
            Email: <a href="mailto:mehbinamal6@gmail.com" className="email-link">mehbinamal6@gmail.com</a>
          </p>
        </section>
      </div>
    </>
  );
}

export default About;

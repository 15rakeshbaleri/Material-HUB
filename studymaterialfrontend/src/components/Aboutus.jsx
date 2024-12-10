import React, { useState } from "react";
import styles from "./Aboutus.module.css";
import logo from "../resources/materialhublogo.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
import rakesh from "../resources/rakeshgold.png";
function AboutUs() {
  const [showMore, setShowMore] = useState(false);
  const [contact, setContact] = useState(false);

  const handleLearnMoreClick = () => {
    setShowMore(!showMore);
  };

  const handleContactClick = () => {
    setContact(!contact);
  };

  return (
    <>
      <Navbar />
      <section className={styles.section}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={logo}
                alt="About Us"
                className={`${styles.profileimage} img-fluid`}
              />
            </div>

            <div className="col-md-6">
              <div className={styles.materialhub}>
                <div className={styles.about}>About</div>
                <div className={styles.us}>Us</div>
              </div>

              <p className={`${styles.paragraph} mb-4`}>
                Welcome to our platform! We aim to provide a centralized hub for
                engineering students to access study materials, notes, and
                resources tailored for their semester and department. Our
                mission is to enhance learning by bridging the gap between
                students and essential resources.
              </p>

              {showMore && (
                <p className={`${styles.paragraph} mb-4`}>
                  Built with a strong foundation in modern technologies like
                  Spring Boot, React, and MongoDB, our platform is designed to
                  deliver a seamless and efficient user experience.
                </p>
              )}

              <div>
                <button
                  className={`${styles.btnPrimary}`}
                  onClick={handleLearnMoreClick}
                >
                  {showMore ? "Show Less" : "Learn More"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className={styles.profileSection}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={rakesh} // You can replace this with your own profile picture
                alt="Profile"
                className={`${styles.profileImage} img-fluid`}
              />
            </div>

            <div className="col-md-6">
              <h2 className={styles.gold}>Rakesh Rajesh Baleri</h2>
              <p className={styles.paragraph}>
                Pre-final year student at NIE Mysore, pursuing BE in Information
                Science and Engineering.
              </p>
              <p className={styles.paragraph}>
                I am passionate about web development, coding, and technology. I
                enjoy building full-stack applications using Java, Spring Boot,
                React, and MongoDB. Currently, I'm focusing on exploring Java
                Full stack, Machine Learning, and improving my tech skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AboutUs;

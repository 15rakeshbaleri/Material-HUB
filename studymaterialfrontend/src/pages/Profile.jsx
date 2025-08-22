import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Profile.module.css"; // ✅ import module
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    branch: "",
    semester: "",
    phoneNumber: "",
    bio: "",
  });
  const [file, setFile] = useState(null);
  const [resumefile, setresumefile] = useState(null);

  const [Edit, setEdit] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const profile = res.data.data.profile;
        setProfile(profile);
        console.log(profile);

        setFormData({
          fullname: profile.fullname || "",
          branch: profile.branch || "",
          semester: profile.semester || "",
          phoneNumber: profile.phoneNumber || "",
          bio: profile.bio || "",
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .put("http://localhost:8080/api/profile/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        const profile = res.data.data.profile;
        setProfile(profile);
        console.log(profile);
        alert("Profile updated successfully ");
        setEdit(false);
      })
      .catch(() => alert("Error updating profile "));
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first");
      return;
    }
    const data = new FormData();
    data.append("file", file);

    axios
      .post(
        `http://localhost:8080/api/profile/upload-profile/${profile.id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then(() => alert("Image uploaded "))
      .catch(() => alert("Error uploading image "));
  };

  const handleresumeUpload = (e) => {
    e.preventDefault();
    if (!resumefile) {
      alert("Please select a file first");
      return;
    }
    const data = new FormData();
    data.append("file", resumefile);

    axios
      .post(
        `http://localhost:8080/api/profile/upload-resume/${profile.id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then(() => alert("Resume uploaded "))
      .catch(() => alert("Error uploading resume "));
  };
  return (
    <>
      <Navbar />
      <div className="container mt-4 border rounded  p-4">
        <h2 className={styles.title}>My Profile</h2>
        {profile ? (
          <div className="card p-3 mt-3 bg-black ">
            <div className={styles.detailsContainer}>
              <div className={styles.leftSection}>
                <h4 style={{ color: "#daa520" }}>{profile.fullname}</h4>
                <p className={styles.details}>
                  <b>Branch: {profile.branch}</b>
                </p>
                <p className={styles.details}>
                  <b>Semester: {profile.semester}</b>
                </p>
                <p className={styles.details}>
                  <b>Phone: {profile.phoneNumber}</b>
                </p>
                <p className={styles.details}>
                  <b>Bio: {profile.bio}</b>
                </p>
                <p className={styles.details}>
                  <b>
                    Resume:{" "}
                    {profile.resume ? (
                      <a
                        href={`data:application/pdf;base64,${profile.resume}`}
                        download={profile.resumeNameString || "resume.pdf"}
                      >
                        {profile.resumeNameString || "Download Resume"}
                      </a>
                    ) : (
                      "No Resume Uploaded"
                    )}
                  </b>
                </p>
              </div>
              <div className={styles.rightSection}>
                {profile.profileImage ? (
                  <img
                    src={`data:image/jpeg;base64,${profile.profileImage}`}
                    alt="Profile"
                    className="img-thumbnail"
                    style={{ maxWidth: "150px", borderRadius: "50%" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      border: "2px solid #daa520",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#daa520",
                    }}
                  >
                    No Image
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>Create your profile...</p>
        )}
        {Edit && (
          <form className={styles.form + " mt-4"} onSubmit={handleUpdate}>
            <div>
              <label>Full Name</label>
              <input
                name="fullname"
                placeholder="Enter your full name"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Branch</label>
              <input
                name="branch"
                value={formData.branch}
                placeholder="Enter your branch"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Semester</label>
              <input
                name="semester"
                placeholder="Enter your semester"
                value={formData.semester}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Phone Number</label>
              <input
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Bio</label>
              <input
                name="bio"
                value={formData.bio}
                placeholder="Enter your bio"
                onChange={handleChange}
              />
            </div>

            <div className={styles.fullWidth}>
              <button type="submit" className={styles.upload}>
                Update Profile
              </button>
            </div>
          </form>
        )}
        {Edit && profile && (
          <>
            <form
              className={styles.form + " mt-4"}
              onSubmit={handleImageUpload}
            >
              <label>Upload Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button type="submit" className={styles.upload + " mt-2"}>
                Upload Image
              </button>
            </form>
            <form
              className={styles.form + " mt-4"}
              onSubmit={handleresumeUpload}
            >
              <label>Upload Resume</label>
              <input
                type="file"
                accept="application/pdf/*"
                onChange={(e) => setresumefile(e.target.files[0])}
              />
              <button type="submit" className={styles.upload + " mt-2"}>
                Upload Resume
              </button>
            </form>
          </>
        )}
        {profile && (
          <button onClick={() => setEdit(!Edit)}>
            {Edit ? "Cancel" : "Edit"}
          </button>
        )}

        {!profile && (
          <button onClick={() => setEdit(!Edit)}>
            {Edit ? "Cancel" : "create"}
          </button>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Profile;

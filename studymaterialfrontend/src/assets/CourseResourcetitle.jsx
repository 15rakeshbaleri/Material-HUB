import React from "react";

function CourseResourcetitle(coursename) {
  return (
    <div>
      <>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "150px", // Smaller height
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000", // Background remains black
          }}
        >
          {/* Welcome Text with Gradient and Shadow */}
          <h1
            style={{
              position: "absolute",
              fontSize: "3rem", // Adjusted font size for a smaller div
              fontWeight: "600", // Slightly less bold for elegance
              animation: "fadeIn 1.5s ease-in-out infinite alternate",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)", // Subtle shadow for text
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #FFFFFF, #FFFFFF)", // White gradient
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {coursename}
            </span>
            <span
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFD700)", // Yellow gradient
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              RESOURSE
            </span>
          </h1>
        </div>

        {/* Google Font Link */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />

        {/* Keyframes for the animation */}
        <style>
          {`
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
        </style>
      </>
    </div>
  );
}

export default CourseResourcetitle;

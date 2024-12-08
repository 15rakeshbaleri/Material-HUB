import React from "react";

function Resource({ content }) {
  return (
    <div>
      <div>
        <h2>Resource Content</h2>
        <p>{content}</p> {/* Display the content of the selected resource */}
      </div>
    </div>
  );
}

export default Resource;

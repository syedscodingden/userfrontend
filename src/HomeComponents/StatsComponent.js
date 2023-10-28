import React from "react";
const StatsComponent = (props) => {
  return (
    <span style={{ marginRight: "8%", fontWeight: "600" }}>
      {props.statsValue}
      <span style={{ fontWeight: "600", fontSize: "91%" }}>K+</span>
      <div style={{ fontWeight: "400", fontSize: "60%", color:"#585858" }}>
        {props.description}
      </div>
    </span>
  );
};

export default StatsComponent;

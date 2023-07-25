import React from "react";

const ProgressBar = ({ bgcolour, current, required }) => {
    const completed = current / required;
    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50,
      }
    
      const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolour,
        borderRadius: 'inherit',
        textAlign: 'right'
      }
    
      const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
      }
    
      return (
        <div style={containerStyles}>
          <div>
            <span style={labelStyles}>{`${current} / ${required}`}</span>
          </div>
          <div style={fillerStyles}>
          </div>
        </div>
      );
    };
    
    export default ProgressBar;
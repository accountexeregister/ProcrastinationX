import React from "react";

const ProgressBar = ({ bgcolour, current, required }) => {
    const completed = current / required * 100;
    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 0,
      }

      const belowContainerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "grey",
        marginTop: 5,
        marginBelow: 25
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
        <div>
          <div style={containerStyles}>
            <div style={fillerStyles}>
              <span style={labelStyles}>{`${Math.round(current / required * 10000) / 100}%`}</span>
            </div>
          </div>
          <div style={belowContainerStyles}>
          {`${Math.round(current * 100) / 100} / ${required}`}
          </div>
        </div>
      );
    };
    
    export default ProgressBar;
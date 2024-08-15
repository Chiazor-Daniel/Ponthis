import React from 'react';


const SetLogo = ({ h, w }) => {
  return (
    <div style={{padding: "10px"}}>
      <img src={'/dashlogo.png'} alt="" className="" style={{ margin: "auto", width: w || 200, height: h || 150, transition: 'width 0.3s 0.2s, height 0.3s 0.2s' }} />
    </div>
  );
};

export default SetLogo;

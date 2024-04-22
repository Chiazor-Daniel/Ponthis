import React, { useState } from "react";

const ToggleTrade = ({ autoTrader, handleAutoTrader }) => {

    return (
        <div style={{ alignItems: "center", gap: "10px", display: "flex", justifyContent: "center" }}>
            <p style={{ margin: "auto" }}>Enable Auto Trader</p>
            <div className="switch">
                <span>
                    <input
                        type="checkbox"
                        id="toggleInput"
                        checked={autoTrader}
                        onChange={handleAutoTrader}
                    />
                    <button className="slider" type="button" onClick={handleAutoTrader}></button>
                </span>
            </div>
        </div>
    );
};

export default ToggleTrade;

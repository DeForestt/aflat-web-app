import React from "react";
import "./ConsoleEmulator.css";


// Console Emulator Component
const ConsoleEmulator = (props :  {text : string}) => {
    let text = props.text.split('\n');
    const lines = text.map((line, index) => {
        return <>
            <p className="console-text" key={index}>{line}</p>
        </>
    });

    return(<div className="console-emulator">
        {lines}
    </div>);
};

export default ConsoleEmulator;
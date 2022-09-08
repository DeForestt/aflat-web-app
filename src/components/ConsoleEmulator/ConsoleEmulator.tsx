import React from "react";
import "./ConsoleEmulator.css";

// function to remove all instances of a substring from a string
function removeAll(str: string, sub: string) {
    while (str.includes(sub)) {
        str = str.replace(sub, "");
    }
    return str;
}

// Console Emulator Component
const ConsoleEmulator = (props :  {text : string}) => {
    let text = props.text.split('\n');
    const lines = text.map((line, index) => {
        line = removeAll(line, "[30m");
        line = removeAll(line, "[31m");
        line = removeAll(line, "[32m");
        line = removeAll(line, "[33m");
        line = removeAll(line, "[34m");
        line = removeAll(line, "[35m");
        line = removeAll(line, "[36m");
        line = removeAll(line, "[37m");
        line = removeAll(line, "[0m");
        return <>
            <p className="console-text" key={index}>{line}</p>
        </>
    });

    return(<div className="console-emulator">
        {lines}
    </div>);
};

export default ConsoleEmulator;
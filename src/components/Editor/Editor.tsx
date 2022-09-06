import React from "react";
import runBox from "./utils";
import { AflatProject } from "./utils";
import CodeEditor from '@uiw/react-textarea-code-editor';
import ConsoleEmulator from "../ConsoleEmulator/ConsoleEmulator";

interface EditorProps {
    defaultCode: string;
}

const Editor : React.FC<EditorProps> = (props : EditorProps) => {
    const [code, setCode] = React.useState(props.defaultCode)
    const [output, setOutput] = React.useState("Output will be here");
    const [mode, setMode] = React.useState("code");
    const [stdin, setStdin] = React.useState("");

    const run = () => {

        const project : AflatProject = {
            main: {
                name: "main",
                content: code,
            },
            stdin: stdin
        };

        setOutput("Running...");
        runBox(project).then(res => {setOutput(res.output);});
    };

    const switchMode = () => {
        mode === "code" ? setMode("console") : setMode("code");
    };

    const textBoxes = () => {
        if (mode === "code") {
            return <CodeEditor
            value={code}
            language="js"
            placeholder="Please enter aflat code here."
            onChange={(evn) => setCode(evn.target.value)}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              width: "20rem",
              height: "20rem",
            }}
          />
        } else {
             return <textarea value={stdin} onChange={(evn) => setStdin(evn.target.value)}></textarea>
        }
    }

    return (<>
        <button onClick={switchMode}>{mode == "code" ? "stdin" : "code"}</button>
        {textBoxes()}
        <button onClick={run}>Run</button>
        <ConsoleEmulator text={output}/>

    </>)
}

export default Editor;
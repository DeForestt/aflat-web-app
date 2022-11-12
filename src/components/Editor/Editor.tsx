import React from "react";
import {useCookies} from "react-cookie";
import runBox from "./utils";
import { AflatProject, Module, uploadModule } from "./utils";
import CodeEditor from '@uiw/react-textarea-code-editor';
import ConsoleEmulator from "../ConsoleEmulator/ConsoleEmulator";
import UploadModal from "./UploadModal";
import "./Editor.css";

interface EditorProps {
    defaultCode: string;
    testCode?: string;
    moduleName?: string;
    saveCode?: boolean;
}

const Editor : React.FC<EditorProps> = (props : EditorProps) => {
    const [cookies, setCookie] = useCookies(['code']);
    const [code, setCode] = React.useState(props.defaultCode)
    const [output, setOutput] = React.useState("Output will be here");
    const [mode, setMode] = React.useState("code");
    const [stdin, setStdin] = React.useState("");
    const [sharedText, setSharedText] = React.useState("");
    const [showUploadModal, setShowUploadModal] = React.useState(false);

    if (props.saveCode === undefined) {
        props.saveCode = false;
    };

    React.useEffect(() => {
        setCode(props.defaultCode);
    }, [props.defaultCode]);

    const run = () => {

        const project : AflatProject = {
            main: {
                name: "main",
                content: code,
            },
            modules: props.moduleName? [
                {
                    name: props.moduleName,
                    content: code
                }
            ] : undefined,
            test: props.testCode ? { name: "test", content: props.testCode } : undefined,
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
            className="code-box"
            value={code}
            language="js"
            placeholder="Please enter aflat code here."
            onChange={(evn) => {setCode(evn.target.value); if (props.saveCode) setCookie("code", evn.target.value);}}
            padding={15}
            style={{
              fontSize: 12,
              fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
            }}
          />
        } else {
             return <textarea className="code-box" value={stdin} onChange={(evn) => setStdin(evn.target.value)}></textarea>
        }
    };

    const createShareLink = () => {
        const url = new URL(window.location.href);
        url.searchParams.set("code", code);
        return url.href;
    };

    const copyShareLink = () => {
        const url = createShareLink();
        navigator.clipboard.writeText(url);
        setSharedText("Share Link Copied to Clipboard");
    };

    return (<>
        <button onClick={switchMode}>{mode === "code" ? "stdin" : "code"}</button>
        {textBoxes()}
        <button onClick={run}>Run</button>
        <ConsoleEmulator text={output}/>
        <button onClick={copyShareLink}>Share</button>
        <label className="shadow-text">{sharedText}</label>
        <button onClick={() => setShowUploadModal(!showUploadModal)}>Upload</button>
        <UploadModal show={showUploadModal} close={() => setShowUploadModal(false)} text={code}/>
    </>)
}

export default Editor;
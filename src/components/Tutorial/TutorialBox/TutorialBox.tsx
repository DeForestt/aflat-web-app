import { prependOnceListener } from "process";
import Editor from "../../Editor/Editor";
import "./TutorialBox.css";

interface TutorialBoxProps {
    title: string;
    description: string;
    defaultCode: string;
    testCode: string;
    moduleName: string;
}

const TutorialBox = (props: TutorialBoxProps) => {
    return (
        <div className="tutorial-box">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <Editor
                defaultCode={props.defaultCode}
                saveCode={false} 
                moduleName={props.moduleName}
                testCode={props.testCode}
                />
        </div>
    );
}

export default TutorialBox;
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Editor from "../../Editor/Editor";
import "./TutorialBox.css";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {atomDark as color} from 'react-syntax-highlighter/dist/esm/styles/prism'

interface TutorialBoxProps {
    title: string;
    description: string;
    defaultCode: string;
    testCode: string;
    moduleName: string;
}

const TutorialBox = (props: TutorialBoxProps) => {

    const style : any = color;

    return (
        <div className="tutorial-box">
            <h2>{props.title}</h2>
            <ReactMarkdown
                components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          style={style}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                {props.description}
            </ReactMarkdown>
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
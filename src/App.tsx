import React from 'react';
import './App.css';
import CodeEditor from '@uiw/react-textarea-code-editor';

const runBox = async (code: string) => {
  const scheme = "http";
  const host = "3.93.191.171";
  const baseUrl = `${scheme}://${host}`;
  const endpoint = "/box/run";
  const url = `${baseUrl}${endpoint}`;

  const body = {
    _id: 0,
    name: "main",
    data: code,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(body)
  };
  let res = await fetch(url, options);
  return res.json();
}

function App() {
  
  const [code, setCode] = React.useState(
    `.needs <std> \n import * from "io" under io; \n\n int main(){ \n\tio.print("Hello World");\n };`
  );

  const [output, setOutput] = React.useState("Output will be here");

  const run = () => {
    setOutput("Running...");
    runBox(code).then(res => {setOutput(res.output);});
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome to the Aflat Web App</h2>
        <CodeEditor
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
      <button onClick={() => run()}>Run</button>
      <div style={{
        backgroundColor: "#f5f5f5",
      }}>
        <p style={{fontSize: 12, color: 'black'}}>{output}</p>
      </div>
      </header>
    

      <h4>Check us out on <a href="https://www.github.com/DeForestt/aflat">Github</a></h4>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import Editor from './components/Editor/Editor';

function App() {
  
  const code = `.needs <std> \nimport * from "io" under io; \n\nint main(){\n\tio.print("Hello World");\n };`;

  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome to the Aflat Web App</h2>
        {process.env.REACT_APP_DEV_MODE? <p>Development Mode</p> : <> </>}
        <Editor defaultCode={code} />
      </header>

      <h4>Check us out on <a href="https://www.github.com/DeForestt/aflat">Github</a></h4>
    </div>
  );
}

export default App;

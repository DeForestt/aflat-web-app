import React from 'react';
import {useCookies} from 'react-cookie';
import './App.css';
import Editor from './components/Editor/Editor';

function App() {
  const [cookies, setCookie] = useCookies(['code']);
  const code = cookies.code? cookies.code : `.needs <std> \nimport * from "io" under io; \n\nint main(){\n\tio.print("Hello World");\n};`;

  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome to the Aflat Web App</h2>
        {process.env.REACT_APP_DEV_MODE? <p>Development Mode</p> : <> </>}
        <Editor defaultCode={code} saveCode={true} />
      </header>

      <h4>Check us out on <a href="https://www.github.com/DeForestt/aflat">Github</a></h4>
    </div>
  );
}

export default App;

import React from 'react';
import {useCookies} from 'react-cookie';
import './App.css';
import Editor from './components/Editor/Editor';
import TutorialBox from './components/Tutorial/TutorialBox/TutorialBox';
import Tutorials from './Tutorials';

function App() {
  const [cookies, setCookies] = useCookies(['code']); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [tutorial, setTutorial] = React.useState(0);
  const [searchParams, setSearchParams] = React.useState(new URLSearchParams(window.location.search)); // eslint-disable-line @typescript-eslint/no-unused-vars
  const code = searchParams.get('code')? searchParams.get('code') : (cookies.code? cookies.code : `.needs <std> \nimport * from "io" under io; \n\nint main(){\n\tio.print("Hello World");\n};`);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome to the Aflat Web App</h2>
        {process.env.REACT_APP_DEV_MODE? <p>Development Mode</p> : <> </>}
        <Editor defaultCode={code} saveCode={true} />
      </header>

      <div className="tutorial">
        <TutorialBox
          title={Tutorials[tutorial].title}
          description={Tutorials[tutorial].description}
          defaultCode={Tutorials[tutorial].defaultCode}
          testCode={Tutorials[tutorial].testCode}
          moduleName={Tutorials[tutorial].moduleName} />
          <div className="next-bar">
            <i className = "arrow left" onClick={() => {if (tutorial > 0) setTutorial(tutorial - 1)}}></i>
            <i className = "arrow right" onClick={() => {if (tutorial < Tutorials.length - 1) setTutorial(tutorial + 1)}}></i>
          </div>
      </div>

      <h4>Check us out on <a href="https://www.github.com/DeForestt/aflat">Github</a></h4>
    </div>
  );
}

export default App;

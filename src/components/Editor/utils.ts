export interface CodeFile {
    name: string
    content: string
}

export interface AflatProject {
    main: CodeFile;
    test?: CodeFile;
    modules?: [CodeFile];
    stdin?: string;
}

const runBox = async (project : AflatProject) => {
    const scheme = process.env.REACT_APP_DEV_MODE ? "http" : "https";
    const host = process.env.REACT_APP_DEV_MODE ? "localhost:8000" : "www.api.aflatlang.com";
    const baseUrl = `${scheme}://${host}`;
    const endpoint = "/box/run";
    const url = `${baseUrl}${endpoint}`;
  
    const body = {
      _id: 0,
      data: project,
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

export default runBox;
export interface CodeFile {
    name: string
    content: string
}

export interface Module {
    name: string
    description: string
    author: string
    version: string
    id?: string
};

export interface AflatProject {
    main: CodeFile;
    test?: CodeFile;
    modules?: [CodeFile];
    stdin?: string;
}

const runBox = async (project : AflatProject) => {
    const scheme = process.env.REACT_APP_DEV_MODE ? "http" : "https";
    const host = process.env.REACT_APP_DEV_MODE ? "localhost:8000" : "api.aflatlang.com";
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

const uploadModule = async (module : Module, text :string) => {
    const scheme = process.env.REACTP_APP_DEV_MODE ? "http" : "https";
    const host = process.env.REACT_APP_DEV_MODE ? "localhost:8000" : "api.aflatlang.com";
    const baseUrl = `${scheme}://${host}`;
    const endpoint = "/modules";

    const url = `${baseUrl}${endpoint}`;
    const body = module;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body)
    };
    let res = await fetch(url, options);

    if (res.status !== 200) {
      return res.json();
    }

    let data : Module = await res.json();

    const module_id : string = data.id ?? "";

    const uploadEndpoint = `/modules/${module_id}`;
    const uploadUrl = `${baseUrl}${uploadEndpoint}`;
    const uploadBody = text;
    const uploadOptions = {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "Accept": "application/json",
      },
      body: uploadBody
    };
    let uploadRes = await fetch(uploadUrl, uploadOptions);
    return uploadRes.json();
};

export default runBox;
export { uploadModule };
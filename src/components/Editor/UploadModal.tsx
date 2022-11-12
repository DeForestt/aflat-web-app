import React from "react";
import { Module, uploadModule } from "./utils";
import "./Editor.css";

interface UploadModalProps {
    show: boolean;
    close: () => void;
    text: string;
}

const UploadModal : React.FC<UploadModalProps> = ( props : UploadModalProps ) => {
    const [module, setModule] = React.useState<Module>({} as Module);

    if ( !props.show ) {
        return <></>;
    }

    const upload = () => {
        uploadModule(module, props.text);
        props.close();
    }

    return (
            <div className="upload-modal-content">
                <form className="upload-form">
                    <label htmlFor="module-name">Module Name</label>
                    <input type="text" id="module-name" onChange={e => {
                        const newModule = module;
                        newModule.name = e.target.value;
                        setModule(newModule);
                    }} />

                    <label htmlFor="module-author">Author</label>
                    <input type="text" id="module-author" onChange={e => {
                        const newModule = module;
                        newModule.author = e.target.value;
                        setModule(newModule);
                    }} />

                    <label htmlFor="module-version">Version</label>
                    <input type="text" id="module-version" onChange={e => {
                        const newModule = module;
                        newModule.version = e.target.value;
                        setModule(newModule);
                    }} />

                    <label htmlFor="module-description">Description</label>
                    <input type="text" id="module-description" onChange={e => {
                        const newModule = module;
                        newModule.description = e.target.value;
                        setModule(newModule);
                    }} />
                    <button type="button" onClick={upload}>Upload</button>
                </form>
            </div>
    );
};

export default UploadModal;
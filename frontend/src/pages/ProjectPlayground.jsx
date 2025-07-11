import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent.jsx";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton.jsx";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure.jsx";
import { useTreeStructureStore } from "../store/treeStructureStore.js";
import { useEditorSocketStore } from "../store/editorSocketStore.js";
import { useEffect } from "react";
import { io } from "socket.io-client";

export const ProjectPlayground = () => {

    const { projectId: projectIdfromURL } = useParams();

    const { setProjectId, projectId } = useTreeStructureStore();

    const { setEditorSocket } = useEditorSocketStore();

    useEffect(() => {
        if(projectIdfromURL){
            setProjectId(projectIdfromURL);
            const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
                query: {
                    projectId: projectIdfromURL
                }
            });
        setEditorSocket(editorSocketConn);
        } 
    },[projectIdfromURL, setProjectId, setEditorSocket]);
    
    return (
        <>
        {/* <h1>Project Playground for {projectIdfromURL}</h1> */}
        <div style={{ padding: '20px', display: 'flex' , backgroundColor: '#000' }}>
            
            
            {projectId && <TreeStructure />}
            <EditorComponent />
              
        </div>
        </>
    );
}
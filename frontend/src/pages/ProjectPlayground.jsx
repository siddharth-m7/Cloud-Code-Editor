import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent.jsx";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton.jsx";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure.jsx";
import { useTreeStructureStore } from "../store/treeStructureStore.js";
import { useEffect } from "react";

export const ProjectPlayground = () => {

    const { projectId: projectIdfromURL } = useParams();

    const { setProjectId, projectId } = useTreeStructureStore();

    useEffect(() => {
        setProjectId(projectIdfromURL);
    },[projectIdfromURL, setProjectId]);
    
    return (
        <>
        {/* <h1>Project Playground for {projectIdfromURL}</h1> */}
        <div style={{ padding: '20px', display: 'flex' }}>
            
            
            {projectId && <TreeStructure />}
            <EditorComponent />
              
        </div>
        </>
    );
}
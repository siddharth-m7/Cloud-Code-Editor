import { useEffect } from "react";
import { useTreeStructureStore } from "../../../store/treeStructureStore.js";
import { TreeNode} from "../../molecules/Tree/TreeNode.jsx";


export const TreeStructure = () => {

    const {treeStructure, setTreeStructure} = useTreeStructureStore();

    useEffect(() => {
        if(treeStructure) {
            console.log("tree",treeStructure);
        } else {
            setTreeStructure();
        }
    }, [setTreeStructure, treeStructure] );

    
    return (
        <div style={
            {
                padding: "20px",
                backgroundColor: "#000",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                minHeight: "100vh",
                maxWidth: "300px",
                overflowY: "auto"
            }
        }>
            <TreeNode fileFolderData={treeStructure} />
        </div>
    );
}
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/Fileicon";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useTreeStructureStore } from "../../../store/treeStructureStore";
import { useActiveFileTabStore } from "../../../store/activeFileTabStore";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore";


export const TreeNode = ({
    fileFolderData
}) => {

    // console.log("TreeNode data:", fileFolderData);

    const [visibility, setVisibility] = useState({});

    const { editorSocket } = useEditorSocketStore();

    const { activeFileTab, setActiveFileTab } = useActiveFileTabStore();

    const { projectId: activeProjectId } = useTreeStructureStore();

    const {
        isOpen: isFileContextOpen,
        setFile,
        setIsOpen: setFileContextMenuIsOpen,
        setX: setFileContextMenuX,
        setY: setFileContextMenuY
    } = useFileContextMenuStore();

    const {
        isOpen: isFolderContextOpen,
        setFolder,
        setIsOpen: setFolderContextMenuIsOpen,
        setX: setFolderContextMenuX,
        setY: setFolderContextMenuY
    } = useFolderContextMenuStore();

    function toggleVisibility(name) {
        setVisibility({
            ...visibility,
            [name]: !visibility[name]
        })
    }


    function computeExtension(fileFolderData) {
        const names = fileFolderData.name.split(".");
        return names[names.length - 1];
    }
    function handleFileContextMenu(e, path) {
        e.preventDefault();
        console.log("Right Clicked", path);
        setFile(path);
        if (isFileContextOpen) {
            setFileContextMenuIsOpen(false);
        }
        else {
        setFileContextMenuIsOpen(true);
        }
        setFileContextMenuX(e.clientX);
        setFileContextMenuY(e.clientY);
        // Here you can implement your context menu logic

    }

    function handleFolderContextMenu(e, path) {
        e.preventDefault();
        console.log("Right Clicked on folder", path);
        setFolder(path);
        if (isFolderContextOpen) {
            setFolderContextMenuIsOpen(false);
        }
        else {
            setFolderContextMenuIsOpen(true);
        }
        setFolderContextMenuX(e.clientX);
        setFolderContextMenuY(e.clientY);
    }


    function handleClick(fileFolderData) {
        const oldPath = activeFileTab?.path;
        const newPath = fileFolderData.path;

        // console.log("Old path", oldPath);
        // console.log("New path", newPath);

        // Leave old room if switching files
        if (oldPath && oldPath !== newPath) {
            editorSocket.emit("leaveFileRoom", {
                projectId: activeProjectId,
                filePath: oldPath,
            });
        }

        // Join new file's room
        editorSocket.emit("joinFileRoom", {
            projectId: activeProjectId,
            filePath: newPath
        });

        // Request content of new file
        editorSocket.emit("readFile", {
            pathToFileOrFolder: newPath
        });

        // Update the active tab in your global state
        const extension = newPath.split('.').pop();
        setActiveFileTab(newPath, "", extension); // Value will be updated via readFileSuccess
    }

    useEffect(() => {
            console.log("Visibility chanmged", visibility); 
    }, [visibility])

    return (
        ( fileFolderData && 
        <div
            style={{
                paddingLeft: "15px",
                color: "white",
            }}
        >
            {fileFolderData.children /** If the current node is a folder ? */ ? (
                /** If the current node is a folder, render it as a button */
                <button
                    onContextMenu={(e) => handleFolderContextMenu(e, fileFolderData.path)}
                    onClick={() => toggleVisibility(fileFolderData.name)}
                    style={{
                        border: "none",
                        cursor: "pointer",
                        outline: "none",
                        color: "white",
                        backgroundColor: "transparent",
                        paddingTop: "15px",
                        fontSize: "16px",

                    }}
                >
                    {visibility[fileFolderData.name] ? <IoIosArrowDown /> : <IoIosArrowForward />}
                    {fileFolderData.name}
                </button>
            ) : (
                /** If the current node is not a folder, render it as a p */
                <div style={{ display: "flex", alignItems: "center" }}>
                    <FileIcon extension={computeExtension(fileFolderData)} />
                    <p
                        style={{
                            paddingTop: "5px",
                            fontSize: "15px",
                            cursor: "pointer",
                            marginLeft: "5px",
                            height: "30px",
                            // color: "black"
                        }}
                        onContextMenu={(e) => handleFileContextMenu(e, fileFolderData.path)}
                        onClick={() => handleClick(fileFolderData)}
                    >
                        {fileFolderData.name}
                    </p>
                </div>
            )}
            {visibility[fileFolderData.name] && fileFolderData.children && (
                fileFolderData.children.map((child) => (
                    <TreeNode 
                        fileFolderData={child}
                        key={child.name}
                    />
                ))
            )}

        </div>)
    )
}
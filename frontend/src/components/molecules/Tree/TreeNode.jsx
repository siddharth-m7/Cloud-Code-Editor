import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/FileIcon.jsx";

export const TreeNode = ({ fileFolderData }) => {

    // console.log("File Folder Data:", fileFolderData);
    const [visibility, setVisibility] = useState({});

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

    useEffect(() => {
        console.log("Visibility changed", visibility); 
    }, [visibility])

    return (
        ( fileFolderData && 
        <div
            style={{
                paddingLeft: "15px",
                color: "black",
            }}
        >
            {fileFolderData.children /** If the current node is a folder ? */ ? (
                /** If the current node is a folder, render it as a button */
                <button
                    onClick={() => toggleVisibility(fileFolderData.name)}
                    style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "4px 8px",
                    paddingLeft: "18px",
                    marginTop: "2px",
                    fontSize: "13px",
                    fontFamily: `'Courier New', Consolas, 'Liberation Mono', Menlo, monospace`,
                    cursor: "pointer",
                    color: "#d4d4d4", // light gray (VS Code text)
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    width: "100%",
                    textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#2a2d2e"; // VS Code hover background
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                >
                    {visibility[fileFolderData.name] ? <IoIosArrowDown /> : <IoIosArrowForward />}
                    <FileIcon extension={"folder"} />
                    {fileFolderData.name}
                </button>

                        ) : (
                /** If the current node is not a folder, render it as a p */
                <div style={{ display: "flex", alignItems: "center", justifyContent: "start", }}>
                    
                    <p
                        style={{
                            padding: "4px 8px",
                            paddingLeft: "18px",
                            marginTop: "2px",
                            fontSize: "13px",
                            fontFamily: `'Courier New', Consolas, 'Liberation Mono', Menlo, monospace`,
                            cursor: "pointer",
                            color: "#d4d4d4", // light gray for inactive text
                            backgroundColor: "transparent",
                            width: "100%",
                            userSelect: "none",
                            textAlign: "left",
                            marginLeft: "23px",
                            }}            
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#2a2d2e"; // VS Code hover background
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                        }}
                    >
                        <FileIcon extension={computeExtension(fileFolderData)} />
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
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import './FileContextMenu.css';

export const FileContextMenu = ({ x, y, path }) => {
    const { setIsOpen: setFileContextMenuIsOpen } = useFileContextMenuStore();

    const { editorSocket } = useEditorSocketStore();

    function handleFileDelete(e) {
        e.preventDefault();
        console.log("Delete file at path:", path);
        // Add logic to delete the file
        editorSocket.emit("deleteFile", { pathToFileOrFolder : path });
    }

    function handleFileRename(e) {
        e.preventDefault();
        console.log("Rename file at path:", path);
        // Add logic to rename the file
    }

    function handleMouseLeave(e) {
        e.target.style.backgroundColor = 'transparent';
    }

    function handleMouseEnter(e){
        e.target.style.backgroundColor = '#094771';
    }

    return (
        <div
            onMouseLeave={() => {
                console.log("Mouse left context menu");
                setFileContextMenuIsOpen(false);
            }}
            style={{
                position: 'fixed',
                top: y,
                left: x,
                minWidth: '200px',
                backgroundColor: '#2d2d30',
                color: '#cccccc',
                border: '1px solid #454545',
                borderRadius: '3px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                padding: '4px 0',
                fontSize: '13px',
                fontFamily: 'Segoe UI, system-ui, sans-serif',
                zIndex: 1000,
                userSelect: 'none'
            }}
        >
            <button
                onClick={handleFileRename}
                className="fileContextMenuButton"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <span style={{ width: '16px', textAlign: 'center' }}>✏️</span>
                Rename
            </button>

            <div style={{
                height: '1px',
                backgroundColor: '#454545',
                margin: '4px 0'
            }} />

            <button
                onClick={handleFileDelete}
                className="fileContextMenuButton"
               onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <span style={{ width: '16px', textAlign: 'center' }}>🗑️</span>
                Delete
            </button>
        </div>
    );
};
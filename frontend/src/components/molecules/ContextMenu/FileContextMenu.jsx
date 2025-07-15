import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { FileFolderModal } from "../FileFolderModal/FileFolderModal";
import './ContextMenu.css';
import { useEffect, useRef, useState } from "react";

export const FileContextMenu = ({ x, y, path }) => {
  const { setIsOpen: setFileContextMenuIsOpen } = useFileContextMenuStore();
  const { editorSocket } = useEditorSocketStore();

  const contextMenuRef = useRef(null);

  const [modalState, setModalState] = useState({
    show: false,
    type: 'file',
    mode: 'rename',
    path: '',
    x: 0,
    y: 0,
  });

  const handleModalSubmit = (name) => {
    const parts = modalState.path.split("/");
    parts[parts.length - 1] = name;
    const fullPath = parts.join("/");
    console.log("Renaming file from", modalState.path, "to", fullPath);
    editorSocket.emit("renameFile", { oldPath: modalState.path, newPath: fullPath });
    setModalState({ ...modalState, show: false });
    setFileContextMenuIsOpen(false);
  };

  const handleModalClose = () => {
    setModalState({ ...modalState, show: false });
    setFileContextMenuIsOpen(false);
  };

  const handleFileDelete = (e) => {
    e.preventDefault();
    console.log("Delete file at path:", path);
    editorSocket.emit("deleteFile", { pathToFileOrFolder: path });
    setFileContextMenuIsOpen(false);
  };

  const handleFileRename = (e) => {
    e.preventDefault();
    console.log("Rename file at path:", path);
    const parts = path.split("/");
    const fileName = parts.pop();
    setModalState({
      show: true,
      type: 'file',
      mode: 'rename',
      initialValue: fileName,
      path,
      x,
      y,
    });
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = 'transparent';
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = '#094771';
  };

  // 🧠 Click outside logic
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        setFileContextMenuIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setFileContextMenuIsOpen]);

  return (
    <>
      {modalState.show ? (
        <FileFolderModal
          type={modalState.type}
          mode={modalState.mode}
          initialValue={modalState.initialValue}
          onSubmit={handleModalSubmit}
          onClose={handleModalClose}
          x={modalState.x + 10}
          y={modalState.y + 10}
        />
      ) : (
        <div
          ref={contextMenuRef}
          className="contextMenuDiv"
          style={{ position: "fixed", top: y, left: x }}
        >
          <button
            onClick={handleFileRename}
            className="contextMenuButton"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span style={{ width: '16px', textAlign: 'center' }}>✏️</span>
            Rename
          </button>

          <div
            style={{
              height: '1px',
              backgroundColor: '#454545',
              margin: '4px 0'
            }}
          />

          <button
            onClick={handleFileDelete}
            className="contextMenuButton"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span style={{ width: '16px', textAlign: 'center' }}>🗑️</span>
            Delete
          </button>
        </div>
      )}
    </>
  );
};

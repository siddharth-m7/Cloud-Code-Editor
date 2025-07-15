import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import './ContextMenu.css';
import { FileFolderModal } from "../FileFolderModal/FileFolderModal";
import { useEffect, useRef, useState } from "react";

export const FolderContextMenu = ({ x, y, path }) => {
  const { setIsOpen: setFolderContextMenuIsOpen } = useFolderContextMenuStore();
  const { editorSocket } = useEditorSocketStore();

  const contextMenuRef = useRef(null);

  const [modalState, setModalState] = useState({
    show: false,
    type: null,
    mode: 'create',
    path: '',
    initialValue: '',
    x: 0,
    y: 0,
  });

  const handleFolderContextAction = ({ type, mode, path, x, y }) => {
    if (mode === 'delete') {
      editorSocket.emit("deleteFolder", { pathToFileOrFolder: path });
      setFolderContextMenuIsOpen(false);
      return;
    }

    if (mode === 'rename') {
      const parts = path.split("/");
      const folderName = parts.pop();
      setModalState({
        show: true,
        type,
        mode,
        initialValue: folderName,
        path,
        x,
        y,
      });
      return;
    }

    setModalState({
      show: true,
      type,
      mode,
      path,
      initialValue: '',
      x,
      y,
    });
  };

  const handleModalSubmit = (name) => {
    if (modalState.mode === 'rename') {
      const parts = modalState.path.split("/");
      parts[parts.length - 1] = name;
      const fullPath = parts.join("/");
      console.log("Renaming folder from", modalState.path, "to", fullPath);
      editorSocket.emit("renameFolder", { oldPath: modalState.path, newPath: fullPath });
    } else if (modalState.mode === 'create') {
      const fullPath = `${modalState.path}/${name}`;
      const event = modalState.type === 'file' ? 'createFile' : 'createFolder';
      console.log(`Creating ${modalState.type} at`, fullPath);
      editorSocket.emit(event, { pathToFileOrFolder: fullPath });
    }

    setModalState({ ...modalState, show: false });
    setFolderContextMenuIsOpen(false);
  };

  const handleModalClose = () => {
    setModalState({ ...modalState, show: false });
    setFolderContextMenuIsOpen(false);
  };

  const handleAction = (type, mode) => (e) => {
    e.preventDefault();
    handleFolderContextAction({ type, mode, path, x, y });
  };

  // 🧠 Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        setFolderContextMenuIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setFolderContextMenuIsOpen]);

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
          <button className="contextMenuButton" onClick={handleAction('file', 'create')}>New File</button>
          <button className="contextMenuButton" onClick={handleAction('folder', 'create')}>New Folder</button>
          <button className="contextMenuButton" onClick={handleAction('folder', 'delete')}>Delete Folder</button>
          <button className="contextMenuButton" onClick={handleAction('folder', 'rename')}>Rename Folder</button>
        </div>
      )}
    </>
  );
};

import { useEffect, useState } from "react";
import { useTreeStructureStore } from "../../../store/treeStructureStore";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";

import { TreeNode } from "../../molecules/TreeNode/TreeNode";
import { FileContextMenu } from "../../molecules/ContextMenu/FileContextMenu";
import { FolderContextMenu } from "../../molecules/ContextMenu/FolderContextMenu";
import { FileFolderModal } from "../../molecules/FileFolderModal/FileFolderModal";

export const TreeStructure = () => {
  const { treeStructure, setTreeStructure } = useTreeStructureStore();
  const { editorSocket } = useEditorSocketStore();

  const {
    file, isOpen: isFileContextOpen, x: fileX, y: fileY
  } = useFileContextMenuStore();

  const {
    folder, isOpen: isFolderContextOpen, x: folderX, y: folderY
  } = useFolderContextMenuStore();

  const [modalState, setModalState] = useState({
    show: false,
    type: null,     // 'file' | 'folder'
    mode: 'create', // 'create' | 'rename'
    path: '',       // parent path
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!treeStructure) {
      setTreeStructure();
    }
  }, [treeStructure, setTreeStructure]);

  return (
    <div>
      {isFileContextOpen && fileX && fileY && (
        <FileContextMenu x={fileX} y={fileY} path={file} />
      )}

      {isFolderContextOpen && folderX && folderY && (
        <FolderContextMenu
          x={folderX}
          y={folderY}
          path={folder}
        />
      )}

      {treeStructure && (
        <TreeNode fileFolderData={treeStructure} />
      )}

      


    </div>
  );
};

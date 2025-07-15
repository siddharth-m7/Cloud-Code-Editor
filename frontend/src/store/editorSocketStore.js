import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import { useTreeStructureStore } from "./treeStructureStore";

export const useEditorSocketStore = create((set) => ({
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {
        const activeFileTabStore = useActiveFileTabStore.getState();
        const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;

        incomingSocket?.on("readFileSuccess", (data) => {
            console.log("Read file success", data);
            const fileExtension = data.path.split('.').pop();
            activeFileTabStore.setActiveFileTab(data.path, data.value, fileExtension);
        });

        incomingSocket?.on("writeFileSuccess", ({ path, data }) => {
            const currentFile = useActiveFileTabStore.getState().activeFileTab;

            // ✅ Only update the editor if the file is currently open
            if (currentFile?.path === path) {
                useActiveFileTabStore.getState().setActiveFileTab(path, data, path.split('.').pop());
            } else {
                // 🔒 Otherwise, ignore the event (do NOT open another file!)
                console.log(`Ignored update for ${path}, not currently active in this tab`);
            }
        });


        incomingSocket?.on("deleteFileSuccess", () => {
            projectTreeStructureSetter(); // Assuming this refreshes tree
        });

        set({
            editorSocket: incomingSocket
        });
    }
}));

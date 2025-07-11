import { use } from 'react';
import { create } from 'zustand';
import { useActiveFileTabStore } from './activeFileTabStore';

export const useEditorSocketStore = create((set) => ({
    editorSocket:null,
    setEditorSocket: (incomingSocket) => {

        const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab;
        // this is done because a hook cannot be called directly in the store
        // so we use the store's getState method to access the setter

        incomingSocket?.on("readFileSuccess", (data) => {
                console.log("Read file success", data);
                activeFileTabSetter(data.path, data.value);
        })

        set({
            editorSocket: incomingSocket
        });
    }
}));
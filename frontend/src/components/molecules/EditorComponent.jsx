import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';

export const EditorComponent = () => {

    const [editorState, setEditorState] = useState({
        theme: null,
    });

    async function downloadTheme() {
            const response = await fetch('/Monokai.json');
            const data = await response.json();
            setEditorState({
                ...editorState, theme: data,
            });
        }

    function handleEditorDidMount(editor, monaco) {
        if(!editorState.theme) {
            console.error('Theme not loaded yet');
            return;
        }
        monaco.editor.defineTheme('monokai', editorState.theme);
        monaco.editor.setTheme('monokai');
    }


    useEffect(() => {
        downloadTheme();
    }, []);

    return (
        <>
        {editorState.theme ? (
        <Editor
          height="100vh"
          defaultLanguage="javascript"
          defaultValue="// Write your code here..."
          theme="monokai" // Apply monokai when ready
          options={{
            fontSize: 18,
            minimap: { enabled: false },
            // scrollBeyondLastLine: false,
            // automaticLayout: true,
          }}
          onMount={handleEditorDidMount}
        />
      ) : (
        <p>Loading editor...</p>
      )}
      </>
       
    );
}
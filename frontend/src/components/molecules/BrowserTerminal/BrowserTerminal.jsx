import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import '@xterm/xterm/css/xterm.css';
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from 'socket.io-client';

export const BrowserTerminal = () => {

  const terminalRef = useRef(null);
  const socket = useRef(null);
  const { projectId: projectIdFromURL } = useParams();

  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      fontFamily: 'monospace',
      fontSize: 16,
      theme: {
        background: '#000',
        foreground: '#fff', 
      },
      convertEol: true,
    });
    term.open(terminalRef.current);
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    fitAddon.fit();

    socket.current = io(`${import.meta.env.VITE_BACKEND_URL}/terminal`, {
      query: {
        projectId : projectIdFromURL,
      }
    });

    socket.current.on ('shell-output', (data) => {
      term.write(data);
    });

    term.onData((data) => {
      if (socket.current && socket.current.connected) {
        console.log("data", data);
        socket.current.emit('shell-input', data);
      }
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
      term.dispose();
    }
  },[]);



  return (
    <div
      ref={terminalRef}
      style={{
      height: '25vh',
      overflow: 'auto',
     }}
     className="terminal"
     id="terminal-container"
     >
    </div>
  );
}
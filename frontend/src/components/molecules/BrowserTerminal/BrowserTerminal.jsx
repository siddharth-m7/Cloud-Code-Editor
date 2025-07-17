import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import '@xterm/xterm/css/xterm.css';
import { useEffect, useRef } from "react";

export const BrowserTerminal = () => {

  const terminalRef = useRef(null);

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
  },[terminalRef]);



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
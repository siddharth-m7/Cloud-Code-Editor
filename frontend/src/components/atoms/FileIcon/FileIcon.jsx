import { FaCss3, FaHtml5, FaJs, FaJava, FaPython, FaPhp, FaFileAlt, FaMarkdown, FaFileCode, FaFile } from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";
import { SiTypescript, SiCplusplus, SiGo, SiRust, SiJsonwebtokens, SiYaml } from "react-icons/si";

export const FileIcon = ({ extension }) => {
  const iconStyle = {
    height: "20px",
    width: "20px"
  };

  const IconMapper = {
    "js": <FaJs color="#f7df1e" style={iconStyle} />,
    "jsx": <GrReactjs color="#61dbfa" style={iconStyle} />,
    "ts": <SiTypescript color="#007acc" style={iconStyle} />,
    "tsx": <GrReactjs color="#61dbfa" style={iconStyle} />,
    "html": <FaHtml5 color="#e34c26" style={iconStyle} />,
    "css": <FaCss3 color="#3c99dc" style={iconStyle} />,
    "json": <SiJsonwebtokens color="#f0db4f" style={iconStyle} />,
    "md": <FaMarkdown color="#4a4a4a" style={iconStyle} />,
    "py": <FaPython color="#306998" style={iconStyle} />,
    "java": <FaJava color="#b07219" style={iconStyle} />,
    "php": <FaPhp color="#777bb4" style={iconStyle} />,
    "cpp": <SiCplusplus color="#00599c" style={iconStyle} />,
    "c": <SiCplusplus color="#555555" style={iconStyle} />,
    "go": <SiGo color="#00add8" style={iconStyle} />,
    "rs": <SiRust color="#dea584" style={iconStyle} />,
    "yml": <SiYaml color="#000000" style={iconStyle} />,
    "yaml": <SiYaml color="#000000" style={iconStyle} />,
    "txt": <FaFileAlt color="#cccccc" style={iconStyle} />,
    "env": <FaFileCode color="#4caf50" style={iconStyle} />,
    "config": <FaFileCode color="#607d8b" style={iconStyle} />,
    "lock": <FaFileCode color="#d32f2f" style={iconStyle} />,
    "default": <FaFile color="#888" style={iconStyle} />
  };

  return (
    <>
      {IconMapper[extension] || IconMapper["default"]}
    </>
  );
};

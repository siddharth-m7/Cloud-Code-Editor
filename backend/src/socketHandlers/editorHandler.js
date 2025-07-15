import fs from "fs/promises";
// import { getContainerPort } from "../containers/handleContainerCreate.js";

export const handleEditorSocketEvents = (socket, editorNamespace) => {

    socket.on("joinFileRoom", ({ projectId, filePath }) => {
        const roomName = `${projectId}:${filePath}`;
        socket.join(roomName);
        console.log(`Socket ${socket.id} joined room ${roomName}`);
    });

    socket.on("leaveFileRoom", ({ projectId, filePath }) => {
        const roomName = `${projectId}:${filePath}`;
        socket.leave(roomName);
        console.log(`Socket ${socket.id} left room ${roomName}`);
    });


    socket.on("writeFile", async ({ data, pathToFileOrFolder, projectId }) => {
        try {
            await fs.writeFile(pathToFileOrFolder, data);

            const roomName = `${projectId}:${pathToFileOrFolder}`;

            // Emit only to others in the same room (excluding sender)
            socket.to(roomName).emit("writeFileSuccess", {
                data: data,
                path: pathToFileOrFolder,
            });

        } catch (error) {
            console.log("Error writing the file", error);
            socket.emit("error", {
                data: "Error writing the file",
            });
        }
    });

    // Ensure you're using the promise version of fs

    socket.on("createFile", async ({ pathToFileOrFolder }) => {
        try {
            // Check if file exists
            await fs.access(pathToFileOrFolder);
        
            // If no error, file exists
            socket.emit("error", {
                data: "File already exists",
            });
            return;
        } catch (err) {
            // File does not exist (which is what we want)
            if (err.code !== 'ENOENT') {
                socket.emit("error", {
                    data: "Error checking file existence",
                });
                return;
            }
        }

        try {
            await fs.writeFile(pathToFileOrFolder, "");
            socket.emit("createFileSuccess", {
                data: "File created successfully",
            });
        } catch (error) {
            console.log("Error creating the file", error);
            socket.emit("error", {
                data: "Error creating the file",
            });
        }
    });


    socket.on("readFile", async ({ pathToFileOrFolder }) => {
        try {
            const response = await fs.readFile(pathToFileOrFolder);
            console.log(response.toString());
            socket.emit("readFileSuccess", {
                value: response.toString(),
                path: pathToFileOrFolder,
            })
        } catch(error) {
            console.log("Error reading the file", error);
            socket.emit("error", {
                data: "Error reading the file",
            });
        }
    });

    socket.on("deleteFile", async ({ pathToFileOrFolder }) => {
        try {
            const response = await fs.unlink(pathToFileOrFolder);
            socket.emit("deleteFileSuccess", {
                data: "File deleted successfully",
            });
        } catch(error) {
            console.log("Error deleting the file", error);
            socket.emit("error", {
                data: "Error deleting the file",
            });
        }
    });

    socket.on("createFolder", async ({ pathToFileOrFolder}) => {
        try {
            const response = await fs.mkdir(pathToFileOrFolder);
            socket.emit("createFolderSuccess", {
                data: "Folder created successfully",
            });
        } catch(error) {
            console.log("Error creating the folder", error);
            socket.emit("error", {
                data: "Error creating the folder",
            });
        }
    });

    socket.on("deleteFolder", async ({ pathToFileOrFolder }) => {
        try {
            const response = await fs.rmdir(pathToFileOrFolder, { recursive: true });
            socket.emit("deleteFolderSuccess", {
                data: "Folder deleted successfully",
            });
        } catch(error) {
            console.log("Error deleting the folder", error);
            socket.emit("error", {
                data: "Error deleting the folder",
            });
        }
    });

    socket.on("renameFile", async ({ oldPath, newPath }) => {
        try {
            await fs.rename(oldPath, newPath);
            socket.emit("renameFileSuccess", {
                data: "File renamed successfully",
                oldPath,
                newPath,
            });
        } catch (error) {
            console.log("Error renaming the file", error);
            socket.emit("error", {
                data: "Error renaming the file",
            });
        }
    });

    socket.on("renameFolder", async ({ oldPath, newPath }) => {
        try {
            await fs.rename(oldPath, newPath);
            socket.emit("renameFolderSuccess", {
                data: "Folder renamed successfully",
                oldPath,
                newPath,
            });
        } catch (error) {
            console.log("Error renaming the folder", error);
            socket.emit("error", {
                data: "Error renaming the folder",
            });
        }
    });



    // socket.on("getPort", async ({ containerName }) => {
    //     const port = await getContainerPort(containerName);
    //     console.log("port data", port);
    //     socket.emit("getPortSuccess", {
    //         port: port,
    //     })
    // })

}
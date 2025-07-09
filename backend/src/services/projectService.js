import uuid4 from 'uuid4';
import fs from 'fs/promises';
import { REACT_PROJECT_COMMAND } from '../config/serverConfig.js';
import { execPromisified } from '../utils/execUtility.js';
import directoryTree from 'directory-tree';
import path from 'path';

export const createProjectService = async () => {
     // Create a unique id and then create a folder with that id inside the projects folder
    const projectId = uuid4();
    console.log(`Creating project with ID: ${projectId}`);

    await fs.mkdir(`./projects/${projectId}`);

    const response = await execPromisified(REACT_PROJECT_COMMAND,{
        cwd: `./projects/${projectId}`
    }
    ); 

    return projectId;
}

export const getProjectTreeService = async (projectId) => {
    const projectPath = path.resolve(`./projects/${projectId}`);
    const tree = directoryTree(projectPath);
    return tree;
}
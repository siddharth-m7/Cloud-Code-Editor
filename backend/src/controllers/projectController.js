import { createProjectService, getProjectTreeService } from '../services/projectService.js';

export const createProjectController = async (req, res) => {
  try {
    const projectId = await createProjectService();
    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      projectId,
    });
  } catch (error) {
    console.error("Error in createProjectController:", error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: error.message,
    });
  }
};

export const getProjectTreeController = async (req, res) => {
  try {
    const tree = await getProjectTreeService(req.params.projectId);
    return res.status(200).json({
      data: tree,
      success: true,
      message: 'Project tree fetched successfully',
    });
  } catch (error) {
    console.error("Error in getProjectTreeController:", error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch project tree',
      error: error.message,
    });
  }
};

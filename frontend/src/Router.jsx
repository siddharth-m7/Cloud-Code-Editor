// router.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CreateProject } from './pages/CreateProject.jsx';
import { ProjectPlayground } from './pages/ProjectPlayground.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateProject />
  },
  {
    path: '/project/:projectId',
    element: <ProjectPlayground />
  }
], {
  future: {
    v7_relativeSplatPath: true
  }
});

export const Router = () => {
  return <RouterProvider router={router} />;
};

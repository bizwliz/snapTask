import React, { useState } from 'react';
import CreateProjectModal from './ProjectModel';
import ProjectList from './ProjectList';
import './project.css';

const Project = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addTask = (projectIndex, taskDescription) => {
    const updatedProjects = [...projects];

  // Find the project in the array
  const projectToUpdate = updatedProjects[projectIndex];

  // Update the tasks for the specified project
  projectToUpdate.tasks.push({
    description: taskDescription,
    completed: false, // Assuming a new task is initially not completed
  });

  // Update the state with the modified projects
  setProjects(updatedProjects);

  };

  const markTaskCompleted = (projectIndex, taskIndex) => {
    // Implement your logic to mark a task as completed
    // Update the state accordingly
  };

  const handleCreateProject = (newProject) => {
    setProjects([...projects, newProject]);
    closeModal();
  };

  return (
    <div id="width">
      <h1 id="title-project">Snaps:</h1>
      <button onClick={openModal}>Create Snap!</button>

      <CreateProjectModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSubmit={handleCreateProject}
      />
      
      {/* Pass addTask and markTaskCompleted to ProjectList */}
      <ProjectList projects={projects} addTask={addTask} markTaskCompleted={markTaskCompleted} />
    </div>
  );
};

export default Project;
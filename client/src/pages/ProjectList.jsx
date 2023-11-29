import React, { useState } from 'react';
import TaskList from './TaskList';

const ProjectList = ({ projects, addTask, markTaskCompleted }) => {
  const [expandedProjectIndex, setExpandedProjectIndex] = useState(null);
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const toggleProjectExpansion = (projectIndex) => {
    setExpandedProjectIndex((prevIndex) => (prevIndex === projectIndex ? null : projectIndex));
  };

  const handleAddTask = (projectIndex) => {
    console.log('Adding task for projectIndex:', projectIndex);
    if (newTaskDescription.trim() !== '') {
      console.log('Adding task with description:', newTaskDescription);
      addTask(projectIndex, newTaskDescription);
      setNewTaskDescription('');
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {projects.map((project, projectIndex) => (
        <div key={projectIndex} style={{ margin: '10px', textAlign: 'center' }}>
          <div
            style={{
              backgroundColor: project.selectedColor,
              color: 'black',
              padding: '60px',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
            onClick={() => toggleProjectExpansion(projectIndex)}
          >
            {project.projectName}
          </div>
          {expandedProjectIndex === projectIndex && (
            <div style={{ marginTop: '10px' }}>
              <TaskList
                tasks={project.tasks}
                onTaskCompletion={(taskIndex) => markTaskCompleted(projectIndex, taskIndex)}
              />
              <div>
                <input
                  type="text"
                  placeholder="New task description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
                <button onClick={() => handleAddTask(projectIndex)}>Add Task</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
import React, { useState } from 'react';
import Modal from 'react-modal';
import './projectModel.css';

const CreateProjectModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [projectName, setProjectName] = useState('');
  const [selectedColor, setSelectedColor] = useState('grey'); // Default color

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleSubmit = () => {
    const newProject = { projectName, selectedColor, tasks: [] }; // Include an empty tasks array
    onSubmit(newProject);
    setProjectName('');
    setSelectedColor('grey');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Project"
      className="custom-modal"
    >
      <h2 id="create">Create Project</h2>
      <div id="project-container">
        <label id="title">
          Project Name:
          <input
            id="textbox"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </label>
      </div>
      <div id="color-container">
        <label id="title">
          Select Color:
          <select id="textbox" value={selectedColor} onChange={handleColorChange}>
            <option value="grey">Grey</option>
            <option value="#39B942">Green</option>
            <option value="#B93939">Red</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
          </select>
        </label>
      </div>

      <div id="buttons">
        <button id="create-btn" onClick={handleSubmit}>
          Create
        </button>
        <button id="cancel-btn" onClick={onRequestClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default CreateProjectModal;
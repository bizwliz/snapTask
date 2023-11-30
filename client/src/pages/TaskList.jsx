import React from 'react';

const TaskList = ({ tasks, onTaskCompletion }) => {
  console.log('Received tasks:', tasks);

  if (!tasks || tasks.length === 0) {
    console.log('No tasks available');
    return <div>No tasks available</div>;
  }

  return (
    <div>
      <h2 style={{ color: 'black' }}>TASKS:</h2>
      {tasks.map((task, taskIndex) => {
        console.log('Rendering task:', task);
        return (
          <div
            key={taskIndex}
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: '10px',
              margin: '5px',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{task.description}</span>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onTaskCompletion(taskIndex)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;

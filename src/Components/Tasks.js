import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import { io } from 'socket.io-client';

// Connect to the Socket.IO server from Backend URL
const socket = io('https://internship-task-backend-mfy7.onrender.com/'); // Insert your Deployed Backend URL here or use the default URL http://localhost:3003/

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [updateCounts, setUpdateCounts] = useState([]);


  useEffect(() => {
    socket.on('taskUpdated', (updatedTasks) => {
      setTasks(updatedTasks);
      setUpdateCounts(prev => [...prev, { time: new Date().toLocaleTimeString(), count: updatedTasks.length }]);
    });

    return () => {
      socket.off('taskUpdated');
    };
  }, []);

  const AddTask = () => {
    if (newTask.trim().length === 0) {
      alert('Please enter a task');
      return;
    }
    const newTaskObj = { text: newTask, completed: false };
    
    socket.emit('addTask', newTaskObj);
    
    setNewTask('');
  };

  const DeleteTask = (index) => {
    // Emit event to delete task
    socket.emit('deleteTask', index);
  };

  const UpdateTask = (index) => {
    if (editingText.trim().length === 0) {
      alert('Please enter a task to update');
      return;
    }
    
    socket.emit('updateTask', { index, text: editingText });
    
    setEditingIndex(null);
    setEditingText('');
  };

  const CompleteTask = (index) => {
    socket.emit('completeTask', index);
  };

  // Pie chart data
  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  const pieData = [
    { name: 'Completed', value: completedCount },
    { name: 'Pending', value: pendingCount },
  ];

  // Bar chart data
  const userTaskCounts = tasks.reduce((acc, task) => {
    acc[task.user] = (acc[task.user] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(userTaskCounts).map(user => ({
    name: user,
    count: userTaskCounts[user],
  }));

  // Enter key press event
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      AddTask();
    }
  };

  return (
    <>
      <div className='ml-2 md:absolute font-semibold'>
        Made by Vinayak Pathak 
      </div>

      <div className="max-w-md mx-auto md:mt-2 p-2 md:p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Tasks</h1>
        <div className="flex mb-4 w-[27.2rem]">
          <input
            type="text"
            className="flex-1  p-2 border rounded border-2 border-black"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyPress} 
            placeholder="Add a new task..."
          />
          <button
            onClick={AddTask}
            className="ml-2 p-2 bg-blue-500 border-2 border-black text-white rounded hover:bg-pink-600"
          >
            Create
          </button>
        </div>

        <div className=''>
          {tasks.map((task, index) => (
            <div key={index} className="flex bg-gray-200 items-center mb-2 w-[24rem]">
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    placeholder="Update task..."
                  />

                  {/* Save Button */}
                  <button
                    onClick={() => UpdateTask(index)}
                    className="ml-2 p-1 bg-green-500 text-white rounded hover:bg-green-600 border-2 border-black"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className={task.completed ? 'line-through' : ''}>
                    {task.text}
                  </span>
                  
                  {/* Undo or Complete Button */}
                  <button
                    onClick={() => CompleteTask(index)}
                    className="ml-[11.5rem] p-1 bg-green-500 text-white rounded hover:bg-yellow-600 border-2 border-black"
                  >
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>

                  {/* Update Button */}
                  <button
                    onClick={() => {
                      setEditingIndex(index);
                      setEditingText(task.text);
                    }}
                    className="ml-4 p-1 bg-orange-500 text-white rounded hover:bg-blue-600 border-2 border-black"
                  >
                    Update
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => DeleteTask(index)}
                    className="ml-4 p-1 bg-red-500 text-white rounded hover:bg-black border-2 border-black"
                  >
                    Delete
                  </button>
                
                </>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Data Charts */}
      <div className='flex flex-col md:flex-row justify-center mt-4' >
        
        {/* Pie Chart */}
        <h2 className="text-xl font-bold mt-6">Task Distribution</h2>
        <PieChart width={300} height={300}>
          <Pie data={pieData} cx={150} cy={150} outerRadius={80} fill="#8884d8" label>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? '#8884d8' : '#82ca9d'} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Bar Chart */}
        <h2 className="text-xl font-bold mt-6">User Task Count</h2>
        <BarChart width={300} height={300} data={barData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>

      {/* Line Chart */}
      <h2 className="text-xl font-bold mt-6">Updated/Created <br/> Tasks Over Time</h2>
      <LineChart width={600} height={300} data={updateCounts}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>

      </div>
    </>
  );
}

export default TodoList;

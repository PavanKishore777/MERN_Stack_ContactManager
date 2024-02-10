import React, {useState} from 'react';

interface Task {
    title: string;
    completed: boolean;
}

const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([
                ...tasks,
                {
                    title: newTask,
                    completed: false
                }

            ]);
            setNewTask('');
        }
    };

    const toggleTaskCompletion = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const deleteTask = (index: number) => {
        // const updatedTasks = [...tasks];
        // updatedTasks.splice(index, 1);
        // setTasks(updatedTasks);
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(index)}
                        />
                        <span style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
              {task.title}
            </span>
                        <button onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
            <p>Total tasks: {tasks.length}</p>
            <p>Completed tasks: {tasks.filter((task) => task.completed).length}</p>
        </div>
    );
};

export default TodoList;

import { useEffect, useState, createContext, useCallback } from 'react'
import './App.css'
import { Header } from './Header'
import { Uncompleted } from './Uncompleted';
import { Completed } from './Completed';

export const TasksContext = createContext();

export const App = () => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(data => setTasks(data));
  }, []);

  const toggleTaskState = useCallback((clickedId) => {
    setTasks(previousTask => previousTask.map(task => 
        task.id === clickedId ? {...task, 
                                 completed: !task.completed, 
                                 completedAt: !task.completed ? new Date().toISOString() : null} : task
    ))
  }, [tasks])

  return (
    <>
        <Header/>
        <main>
            <TasksContext.Provider value={{tasks, toggleTaskState}} >
              <Uncompleted/>
              <Completed/>
            </TasksContext.Provider>
        </main>
    </>
  )
}

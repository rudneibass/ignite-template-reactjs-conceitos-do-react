import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    /* minha solução
    const idTask = Math.floor(Math.random() * 9999999);
    const titleTask = newTaskTitle;
    if (!titleTask) {
      alert("Adicione um titulo para criar uma nova task!");
    } else {
      const newTask = [
        {
          id: idTask,
          title: titleTask,
          isComplete: false,
        },
      ];

      setTasks(newTask);
    } */

    // Solução do professor
    if(!newTaskTitle) return;

    const newTask = {
        id: Math.random(),
        title: newTaskTitle,
        isComplete: false,
      }
    
      setTasks(tasks => [...tasks, newTask]); 
      setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Minha Solução
    const tasksUpdated = tasks.map(item => {
        if(item.id == id){
          item.isComplete = true //(!item.isComplete)
          return item
        } else {
          return item
        }
      }
    );
    setTasks(tasksUpdated)

    //Solução do professor
    //const newTasks = tasks.map(task => task.id == id ? {...task, isComplete: !task.isComplete} : task);
    //setTasks(newTasks)

  }


  function handleRemoveTask(id: number) {
    //Solução do professor
    const filteredTasks = tasks.filter(tasks => tasks.id != id);
    setTasks(filteredTasks);

    //Minha solução
    //const tasksWithoutThisId = tasks.map(item => {
    //  if(item.id != id){
    //    return item 
    //  }
    //})
    //setTasks(tasksWithoutThisId)

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}

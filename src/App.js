import React, { useState } from "react";
import "./styles.css";

import Navbar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskList/TaskList";

let idAcc = 0;
const generateId = () => {
  idAcc = idAcc + 1;
  return idAcc;
};

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title, state) => {
    const newTask = {
      id: generateId(),
      title,
      state
    };

    setTasks((existingTasks) => {
      return [...existingTasks, newTask];
    });
  };

  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      // Para que o React dispare a renderização do novo estado do componente,
      // é necessário retornar uma referência diferente de existingTasks. Caso contrário,
      // o array muda o estado da task, mas isso não é refletido na renderização.
      // O .map() faz esse papel, mas também poderia ser retornado um [...existingTasks].
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };

  const deleteTask = (id) => {
    setTasks((existingTasks) => {
      return existingTasks.filter((task) => task.id !== id);
    });
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <TaskList
          title="Pendente"
          taskState="todo"
          onAddTask={addTask}
          tasks={tasks.filter((x) => x.state === "todo")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />

        <TaskList
          title="Fazendo"
          taskState="progress"
          onAddTask={addTask}
          tasks={tasks.filter((x) => x.state === "progress")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />

        <TaskList
          title="Feito"
          taskState="done"
          onAddTask={addTask}
          tasks={tasks.filter((x) => x.state === "done")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

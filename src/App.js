import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const { projects, SetProjects } = useState([]);

  useEffect(() => {
    handleListRepository();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("projects", {
      Title: "Testes",
      Owner: "Wellyngton Borges"
    });
    const project = response.data;

    SetProjects([...projects, project]);
  }
  async function handleRemoveRepository(id) {
    await api.delete(`projects/${id}`);
    handleListRepository();
  }

  function handleListRepository() {
    api.get("projects").then(res => {
      SetProjects([...projects, res]);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects &&
          projects.map(p => (
            <li>
              {p.Title}
              <button onClick={() => handleRemoveRepository(1)}>Remover</button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

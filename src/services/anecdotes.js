// src/services/anecdotes.js
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseUrl);
  return await response.json();
};

const createNew = async (content) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content),
  });
  return await response.json();
};

const remove = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};

export default { getAll, createNew, remove };

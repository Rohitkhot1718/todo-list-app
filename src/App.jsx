import { useState, useEffect } from "react";

function App() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [theme, setTheme] = useState("dark");

  const saveToLocal = () => {
    localStorage.setItem("todo", JSON.stringify(todo));
  };

  useEffect(() => {
    if (localStorage.getItem("todo")) {
      let data = JSON.parse(localStorage.getItem("todo"));
      setTodo(data);
    }
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const setTask = () => {
    setTodo([...todo, { id: Math.random(), text, isCompleted: false }]);
    setText("");
    saveToLocal();
  };

  const handleDelete = (id) => {
    setTodo(todo.filter((todo) => todo.id !== id));
    saveToLocal();
  };

  const toggleComplete = (id) => {
    setTodo(
      todo.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
    saveToLocal();
  };

  const handleUpdate = (id) => {
    const update = todo.find((item) => item.id === id);
    setText(update.text);
    setTodo(todo.filter((item) => item.id !== id));
    saveToLocal();
  };

  const handleMode = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    saveToLocal();
  };

  return (
    <>
      <div
        className={`${
          theme === "light" ? "bg-slate-200" : "bg-gray-900"
        } w-full min-h-screen flex justify-center items-center fixed`}
      >
        <div
          className={`flex flex-col justify-center items-center ${
            theme === "light" ? "bg-zinc-800" : "bg-gray-800"
          } border rounded-xl w-3/5 md:w-1/3 py-6`} 
        >
          <div className="flex items-center justify-between gap-12 border-b-2 border-white pb-6 w-11/12">
            {" "}
            <div>
              <h1 className="text-2xl font-bold text-white">
                Daily UI Todo List
              </h1>{" "}
              <h2 className="text-base text-gray-400">
                Practice design everyday
              </h2>{" "}
            </div>
            <button
              onClick={handleMode}
              className="rounded-full shadow-lg bg-green-300 w-12 h-12 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-black text-[2.5rem]">
                {" "}
                {theme === "light" ? "dark_mode" : "light_mode"}
              </span>
            </button>
          </div>

          {todo.map((item) => (
            <div
              className="flex gap-3 items-center mt-6 w-11/12 px-6" 
              key={item.id}
            >
              <input
                className="w-6 h-6" 
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => toggleComplete(item.id)}
              />
              <p
                className={`flex-grow text-lg ${
                  item.isCompleted ? "line-through" : ""
                } ${theme === "light" ? "text-white" : "text-gray-200"}`}
              >
                {item.text}
              </p>
              <div className="flex gap-3 text-white">
                {" "}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="hover:text-red-500"
                >
                  <span className="material-symbols-outlined text-2xl">
                    delete
                  </span>{" "}
                </button>
                <button
                  className="hover:text-blue-500"
                  onClick={() => handleUpdate(item.id)}
                >
                  <span className="material-symbols-outlined text-2xl">
                    edit_note
                  </span>{" "}
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-3 mt-6 rounded-md w-10/12 bg-zinc-600">
            {" "}
            <input
              onChange={handleChange}
              className="border-none outline-none p-2 w-full bg-transparent text-white text-lg" // Increased padding and text size
              type="text"
              placeholder="Add your task"
              value={text}
            />
            <button onClick={setTask}>
              <span className="material-symbols-outlined text-white text-2xl mr-3">
                send
              </span>{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

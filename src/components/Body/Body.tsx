"use client";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import List, { Task } from "./List";
import AddButton from "./AddButton";
import Modal, { Todo } from "../Modal";
import UpdateModal from "../UpdateModal";
import { useAuth } from "../AuthProvider";

interface BodyProps {
  //the interface Bodyprops defines the structure of an object and the component that uses the bodyprops must have all the properties that exists in the interface
  searchTask: string; // Define searchTask prop
  selectTask: string; // Define selectTask prop
}

const Body: React.FC<BodyProps> = ({ searchTask, selectTask }) => {
  // the functional component body will take the type from the interface BodyProps
  const {userId} = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]); //task[] is the task assertation inwhich an array of object conforms each object must have task type
  const [newTodos, setNewTodos] = useState<Task[]>([]);
  const [updateId, setUpdatedId] = useState<number>(0); //initialized as zero so that we dont get undefined when the system renders for the first time
  // const [userId, setUserId] = useState<number | null> (null);

  // useEffect (()=>{
  //   const userId = localStorage.getItem("userId")
  // })

  const handleAddButtonClick = () => {
    //handles the click event to show the modal that adds a task
    setShowModal(true);
  };

  const handleUpdate = (id: number) => {
    //handles the click event of update button according the key value of id of the task
    setShowUpdateModal(true);
    setUpdatedId(id);
  };

  const handleCloseButtonClick = () => {
    //handles the click event of the modal to be disappear from the screen by setting the state of showMoal as false
    setShowModal(false);
    setShowUpdateModal(false);
  };

  const handleRemove = (id: number) => {
    //handles the click event of remove button by updating the task according to the taskid that is present on the list
    const updatedTodos = newTodos.filter((todo) => todo.id !== id);
    setNewTodos(updatedTodos);
    localStorage.setItem("newTask", JSON.stringify(updatedTodos));
  };

  const handleApply = (newTodo: Todo) => {
    //hanldes the click event of apply button by taking the new todo
    const NewTodos = [...newTodos, newTodo]; //using spread operator to spread oru all element and add a new array at the end.
    setNewTodos(NewTodos);
    localStorage.setItem("newTask", JSON.stringify(NewTodos));
  };

  const handleUpdateTodo = (updatedTodo: Task) => {
    //handles the click event of update button
    const index = newTodos.findIndex((todo) => todo.id === updatedTodo.id); // finds the index of the updated todo in newTodos
    if (index !== -1) {
      //if index exists
      const updatedTodos = [...newTodos]; // updates the todo in newTodos array
      updatedTodos[index] = updatedTodo; // this will take the updatedTodo according to the id/index selected from the newTodos.
      setNewTodos(updatedTodos); // updates newTodos state
    } else {
      console.error("Todo not found");
    }
  };

  const handleCheckboxChange = (id: number) => {
    //handles the click event of checkbox according to the id
    const newTodoList = newTodos.map((todo) => {
      if (todo.id === id) return { ...todo, completed: !todo.completed }; //returns a new object where completed is toggled (if not completed then completed and vice versa)
      return todo; //if id doesnt match return original todo object
    });
    setNewTodos(newTodoList);
  };
  //FETCHING DATA FROM API
  //whenwever we opent this page ,  we want to fetch the data from the api
  //so for this we are using useEffect hook

  useEffect(() => {
    //for fetching the data using async function
    async function fetchTasks() {
      //using try catch method to handle the exceptions
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        if (!response.ok) {
          throw console.error("Tasks did not fetch.");
        }
        const data = await response.json();
        setTasks(data); //after the data is fetch we are parsing it into json form
        localStorage.setItem("tasks", JSON.stringify(data));

        const storedNewTodos = localStorage.getItem("newTask");
        if (storedNewTodos) {
          setNewTodos(JSON.parse(storedNewTodos));
        }
      } catch (error) {
        console.error("error:", error);
      }
    }
    fetchTasks(); // calling the function to fetch the data and store it on the state
  }, []);

  return (
    <Fragment>
      <div className="mt-5 w-[400px] h-[500px] overflow-hidden md:w-[750px] md:h-[575px] relative flex items-center justify-center">
        <List
          userId={userId || 0}
          handleRemove={handleRemove}
          handleUpdate={handleUpdate}
          handleCheckboxChange={handleCheckboxChange}
          tasks={tasks}
          newTodos={newTodos}
          searchTask={searchTask}
          selectTask={selectTask}
        />
        <AddButton onClickProp={() => handleAddButtonClick()} />
      </div>
      {/* if showModal and showUpdateModal state is true then the component will appear on the screen */}
      {showModal && (
        <Modal userID={userId || 0} onApply={handleApply} onClose={() => handleCloseButtonClick()} />
      )}
      {showUpdateModal && (
        <UpdateModal
          onUpdate={handleUpdateTodo}
          updateId={updateId}
          newTodos={newTodos}
          onClose={() => handleCloseButtonClick()}
        />
      )}
    </Fragment>
  );
};

export default Body;

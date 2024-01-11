import React  from "react";
import Screen from "./Screen";
import { useDispatch } from "react-redux";
import { addDragggableElement } from "../utils/appSlice";
import add_icon from "../icons/add.svg"

const Body = () => {
  const dispatch = useDispatch();
  const handleAddDraggable = () => {
    const newId = `${Date.now()}`;
    dispatch(addDragggableElement(newId));
  };

  return (
    <div>
      <div className="flex flex-row-reverse items-center w-[1300px] h-[80px] bg-custom-blue rounded-t-2xl" >
      <div className="w-16 h-16 m-2 p-2 flex justify-center items-center">
        <img className="w-full h-full cursor-pointer" src={add_icon} alt="add" onClick={handleAddDraggable}></img>
      </div>
      </div>
      <Screen />
    </div>
  );
};

export default Body;

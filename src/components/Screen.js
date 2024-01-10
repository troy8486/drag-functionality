import React from "react";
import Draggable from "./Draggable";
import { useSelector } from "react-redux";

const Screen = () => {
  const draggables = useSelector(store => store.app?.draggableElements)
  return (
    <div className="overflow-hidden relative w-[1300px] h-[600px] bg-custom-screen rounded-b-2xl shadow-xl">
      {draggables.map((id) => (
        <Draggable key={id} id={id} />
      ))}
    </div>
  );
};

export default Screen;
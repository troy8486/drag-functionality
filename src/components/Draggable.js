import React, { useState, useEffect } from "react";
import useDrag from "../hooks/useDrag";
import { useDispatch, useSelector } from "react-redux";
import { removeDraggableElement, togglePinElement } from "../utils/appSlice";
import close_icon from "../icons/close.svg";
import pin_icon from "../icons/pin.svg";

const Draggable = ({ id }) => {
  const [isInputOpen, setIsInputOpen] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const isPinned = useSelector((state) =>
    state.app.pinnedElements.includes(id)
  );
  useDrag(id, isPinned);

  const dispatch = useDispatch();

  const pinnedStyle = isPinned ? { zIndex: 1000 } : {}; 

  const handleRemoveDraggable = () => {
    dispatch(removeDraggableElement(id));
  };

  const handleInputText = (e) => {
    setInputValue(e.target.value); // Store the current input value
  };

  const handleOnClickText = (event) => {
    if (event.target.id === "text-output") {
      setIsInputOpen(true);
    }
  };

  const handleTogglePin = () => {
    dispatch(togglePinElement(id));
  };

  const handleToggleInput = () => {
    setIsInputOpen(!isInputOpen); // Toggle the isInputOpen state
  };

  // Hide input and print value when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id !== "input") {
        setIsInputOpen(false);
        console.log(inputValue); // Print the value of the input when it's hidden
      }
    };

    if (isInputOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isInputOpen, inputValue]);

  return (
    <div>
      <div
        className="absolute top-0 left-0 bg-custom-card h-60 w-52 cursor-pointer select-none rounded-xl m-2 p-2 shadow-lg"
        id={id}
        style={pinnedStyle}
      >
        <div className={`flex relative justify-between`}>
          <img
            className={`relative w-8 h-8 ${
              isPinned ? "opacity-100" : "opacity-40"
            }`}
            alt="pin"
            src={pin_icon}
            onClick={handleTogglePin}
          ></img>
          <img
            className="w-8 h-8"
            src={close_icon}
            alt="close"
            onClick={handleRemoveDraggable}
          ></img>
        </div>
        <div className="text-2xl flex justify-center items-center">
          {isInputOpen && (
            <textarea
              type="text"
              id="input"
              onChange={handleInputText}
              className="w-40 h-36 overflow-y-auto rounded-xl m-2 p-2 bg-yellow-100"
              value={inputValue} // Controlled component
            />
          )}
          {!isInputOpen && (
            <div className="flex w-36 h-36 overflow-hidden">
              <h1
                className="w-full h-full overflow-auto break-words p-2"
                id="text-output"
                onClick={handleOnClickText}
              >
                {inputValue ? inputValue : "Text"}
              </h1>
            </div>
          )}
        </div>
        <div className="flex flex-row-reverse text-sm items-center font-medium">
        <button
          className="w-16 h-5 rounded-xl m-2 bg-yellow-100"
          alt="edit"
          onClick={handleToggleInput}
        >{isInputOpen ? "Close" : "Edit"}</button>
        </div>
 
      </div>
    </div>
  );
};

export default Draggable;

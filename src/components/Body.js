import React, { useEffect, useRef } from "react";

const Body = () => {
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const isClicked = useRef(false);
  // ref to store coordinates

  const coords = useRef({ 
    startX: 0, 
    startY: 0,
    lastX: 0,
    lastY: 0
});

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;
    const box = boxRef.current;
    const container = containerRef.current;

    const onMouseDown = (e) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };
    const onMouseUp = () => {
      isClicked.current = false;
      coords.current.lastX = box.offsetLeft;
      coords.current.lastY = box.offsetTop;
    };

    const onMouseMove = (e) => {
      if (!isClicked.current) return;
      // changing top postion using string interpolation
      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      box.style.top = `${nextY}px`;
      box.style.left = `${nextX}px`;
    };


    box.addEventListener("mousedown", onMouseDown);
    box.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);


    const cleanup = () => {
      box.removeEventListener("mousedown", onMouseDown);
      box.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);

    };
    return cleanup;
  }, []);
  return (
    <div
      ref={containerRef}
      className="overflow-hidden relative w-[600px] h-[600px] bg-black"
    >
      <div
        ref={boxRef}
        className="absolute top-0 left-0 bg-red-700 h-10 w-10 cursor-pointer"
      ></div>
    </div>
  );
};

export default Body;

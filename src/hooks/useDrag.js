import { useRef, useEffect } from "react";
const useDrag = (id, isPinned) => {
  const isClicked = useRef(false);

  const coords = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error("element doesn't exist");
    const container = target.parentElement.parentElement;
    if (!container) throw new Error("element must have a parent");

    const onMouseDown = (e) => {
      if (isPinned) return;
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = () => {
      isClicked.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
    };

    const onMouseMove = (e) => {
      if (!isClicked.current || isPinned) return;
      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      const minX = 0;
      const maxX = containerRect.width - targetRect.width;
      const minY = 0;
      const maxY = containerRect.height - targetRect.height;

      const boundedX = Math.min(Math.max(nextX, minX), maxX);
      const boundedY = Math.min(Math.max(nextY, minY), maxY);

      target.style.left = `${boundedX}px`;
      target.style.top = `${boundedY}px`;
    };

    target.addEventListener("mousedown", onMouseDown);
    target.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      target.removeEventListener("mousedown", onMouseDown);
      target.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };
    return cleanup;
  }, [id, isPinned]);
};

export default useDrag;

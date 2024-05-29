"use client";

import { useDrag } from "react-dnd";

export default function Text(props) {
  const { text, index } = props;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "box",
      item: { text, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [index, text.left, text.top]
  );
  if (isDragging) {
    return <div ref={drag} />;
  }
  return (
    <div
      ref={drag}
      style={{
        top: text.top,
        left: text.left,
        width: Number(text.width),
        height: Number(text.height),
      }}
      className={"absolute m-4 overflow-auto bg-blue-200 break-all"}
    >
      <p>{text.content}</p>
    </div>
  );
}

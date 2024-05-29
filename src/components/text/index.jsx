"use client";

import { useDrag } from "react-dnd";

export default function Text(props) {
  const { text } = props;
  const [, drag] = useDrag(
    () => ({
      type: "box",
      item: { text },
      // collect: (monitor) => ({
      //   isDragging: monitor.isDragging(),
      // }),
    })
    // [id, left, top]
  );
  return (
    <div
      ref={drag}
      style={{
        width: Number(text.width),
        height: Number(text.height),
      }}
      className={"m-4 overflow-auto bg-blue-200 break-all"}
    >
      <p>{text.content}</p>
    </div>
  );
}

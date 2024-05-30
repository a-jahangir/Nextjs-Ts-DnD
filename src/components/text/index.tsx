"use client";

import { textsType } from "@/interface";
import { useDrag } from "react-dnd";

interface props {
  text: textsType;
  index: number;
}

export default function Text({ text, index }:props) {
  const [{ isDragging }, drag]:any = useDrag(
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

"use client";

import { paragraphsType } from "@/interface";
import { useDrag } from "react-dnd";

interface props {
  paragraph: paragraphsType;
  index: number;
}

export default function Paragraph({ paragraph, index }: props) {
  const [{ isDragging }, drag]: any = useDrag(
    () => ({
      type: "box",
      item: { paragraph, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [index, paragraph.left, paragraph.top]
  );
  if (isDragging) {
    return <div ref={drag} />;
  }
  return (
    <div
      ref={drag}
      style={{ top: paragraph.top, left: paragraph.left }}
      className={"absolute m-4 w-fit bg-blue-200 break-all"}
    >
      <p>{paragraph.content}</p>
    </div>
  );
}

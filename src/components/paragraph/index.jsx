"use client";

import { useDrag } from "react-dnd";

export default function Paragraph(props) {
  const { paragraph, index } = props;
  const [{ isDragging }, drag] = useDrag(
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

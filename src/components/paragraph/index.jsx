"use client";

import { useDrag } from "react-dnd";

export default function Paragraph(props) {
  const { paragraph } = props;
  const [, drag] = useDrag(
    () => ({
      type: "box",
      item: { paragraph },
      // collect: (monitor) => ({
      //   isDragging: monitor.isDragging(),
      // }),
    })
    // [id, left, top]
  );
  return (
    <div ref={drag} className={"m-4 w-fit bg-blue-200 break-all"}>
      <p>{paragraph.content}</p>
    </div>
  );
}

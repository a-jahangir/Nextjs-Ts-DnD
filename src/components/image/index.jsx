/* eslint-disable @next/next/no-img-element */
"use client";

import { useDrag } from "react-dnd";

export default function Image(props) {
  const { image } = props;
  const [, drag] = useDrag(
    () => ({
      type: "box",
      item: { image },
      // collect: (monitor) => ({
      //   isDragging: monitor.isDragging(),
      // }),
    })
    // [id, left, top]
  );
  return (
    <div ref={drag} className={"m-4"}>
      <img
        style={{
          width: Number(image.width),
          height: Number(image.height),
        }}
        src={image.src}
        alt="image"
      />
    </div>
  );
}

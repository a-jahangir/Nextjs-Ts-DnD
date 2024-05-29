/* eslint-disable @next/next/no-img-element */
"use client";

import { useDrag } from "react-dnd";

export default function Image(props) {
  const { image, index } = props;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "box",
      item: { image, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [index, image.left, image.top]
  );
  if (isDragging) {
    return <div ref={drag} />;
  }
  return (
    <div
      ref={drag}
      style={{ top: image.top, left: image.left }}
      className={"absolute m-4"}
    >
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

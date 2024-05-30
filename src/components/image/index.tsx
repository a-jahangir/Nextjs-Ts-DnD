/* eslint-disable @next/next/no-img-element */
"use client";

import { imagesType } from "@/interface";
import { useDrag } from "react-dnd";

interface props {
  image: imagesType;
  index: number;
}

export default function Image({ image, index }: props) {
  const [{ isDragging }, drag]:any = useDrag(
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

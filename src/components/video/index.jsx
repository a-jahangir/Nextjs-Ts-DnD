"use client";

import { useDrag } from "react-dnd";

export default function Video(props) {
  const { video } = props;
  const [, drag] = useDrag(
    () => ({
      type: "box",
      item: { video },
      // collect: (monitor) => ({
      //   isDragging: monitor.isDragging(),
      // }),
    })
    // [id, left, top]
  );
  return (
    <div ref={drag}>
      <iframe
        style={{
          width: Number(video.width),
          height: Number(video.height),
        }}
        className={"m-4"}
        src={video.src}
        allowFullScreen
      />
    </div>
  );
}

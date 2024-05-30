"use client";

import { videosType } from "@/interface";
import { useDrag } from "react-dnd";

interface props {
  video: videosType;
  index: number;
}

export default function Video({ video, index }: props) {
  const [{ isDragging }, drag]: any = useDrag(
    () => ({
      type: "box",
      item: { video, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [index, video.left, video.top]
  );
  if (isDragging) {
    return <div ref={drag} />;
  }
  if (video.width && video.height && video.src) {
    return (
      <div
        ref={drag}
        style={{ top: video.top, left: video.left }}
        className="absolute"
      >
        <iframe
          style={{
            width: Number(video.width),
            height: Number(video.height),
          }}
          className={"m-4"}
          src={video.src}
          allowFullScreen
        />
        <div className={"m-4 mt-[-20px]"}>Drag from here</div>
      </div>
    );
  }
  return <div></div>;
}

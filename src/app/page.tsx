/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

// react imports
import { FormEvent, useEffect, useCallback, useState } from "react";

// components import
import Paragraph from "@/components/paragraph/index";
import Image from "@/components/image/index";
import Text from "@/components/text/index";
import Video from "@/components/video/index";

// AOS imports
import AOS from "aos";
import "aos/dist/aos.css";

// interfaces imports
import {
  paragraphsType,
  imagesType,
  textsType,
  videosType,
  // DragItem,
} from "@/interface";

// Dnd imports
import type { XYCoord } from "react-dnd";
import update from "immutability-helper";
import { useDrag, useDrop } from "react-dnd";

export default function Home() {
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [src, setSrc] = useState<string>("");
  const [videos, setVideos] = useState<videosType[]>([]);
  const [images, setImages] = useState<imagesType[]>([]);
  const [paragraphs, setParagraphs] = useState<paragraphsType[]>([]);
  const [texts, setTexts] = useState<textsType[]>([]);
  const [inputModal, setInputModal] = useState<boolean>(false);
  const [sizeForm, setSizeForm] = useState<boolean>(false);
  const [imageSrcForm, setImageSrcForm] = useState<boolean>(false);
  const [videoSrcForm, setVideoSrcForm] = useState<boolean>(false);
  const [contentForm, setContentForm] = useState<boolean>(false);

  // const moveBox = useCallback(
  //   (id: string, left: number, top: number) => {
  //     setImages(
  //       update(images, {
  //         [id]: {
  //           $merge: { left, top },
  //         },
  //       })
  //     );
  //   },
  //   [images, setImages]
  // );

  const [, drop]: any = useDrop(
    () => ({
      accept: "box",
      drop(item: any, monitor) {
        console.log(item);
        console.log(monitor);
        // const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        // const left = Math.round(item.left + delta.x);
        // const top = Math.round(item.top + delta.y);
        // moveBox(item.id, left, top);
        // return undefined;
      },
    })
    // [moveBox]
  );

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const handleModal = (title: string) => {
    if (title === "image") {
      setImageSrcForm(true);
      setSizeForm(true);
    }
    if (title === "video") {
      setVideoSrcForm(true);
      setSizeForm(true);
    }
    if (title === "paragraph") {
      setContentForm(true);
    }
    if (title === "text") {
      setContentForm(true);
      setSizeForm(true);
    }
    setInputModal(true);
  };

  const handleClose = () => {
    setWidth("");
    setHeight("");
    setContent("");
    setSrc("");
    setSizeForm(false);
    setImageSrcForm(false);
    setVideoSrcForm(false);
    setContentForm(false);
    setInputModal(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (videoSrcForm) {
      const newVideos = [
        ...videos,
        {
          src: src,
          height: height,
          width: width,
        },
      ];
      setVideos(newVideos);
      handleClose();
    }
    if (imageSrcForm) {
      const newImage = [
        ...images,
        {
          src: src,
          height: height,
          width: width,
        },
      ];
      setImages(newImage);
      handleClose();
    }
    if (contentForm && !sizeForm) {
      const newParagraph = [
        ...paragraphs,
        {
          content: content,
        },
      ];
      setParagraphs(newParagraph);
      handleClose();
    }
    if (contentForm && sizeForm) {
      const newText = [
        ...texts,
        {
          content: content,
          height: height,
          width: width,
        },
      ];
      setTexts(newText);
      handleClose();
    }
  };

  return (
    <>
      <header className="shadow-lg bg-main">
        <div className="container py-4 px-10 mx-auto text-center text-lg font-black">
          Hiring Test Project
        </div>
      </header>
      <section>
        <div className="container mx-auto py-4 px-10 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-x-24 gap-y-6">
            <div
              ref={drop}
              className="w-8/12 lg:h-96 h-60 bg-white overflow-auto rounded-3xl shadow-2xl shadow-black"
            >
              {videos.map((video, index) => {
                return <Video key={index} video={video} />;
              })}
              {texts.map((text, index) => {
                return <Text key={index} text={text} />;
              })}
              {paragraphs.map((paragraph, index) => {
                return <Paragraph key={index} paragraph={paragraph} />;
              })}
              {images.map((image, index) => {
                return <Image key={index} image={image} />;
              })}
            </div>
            <div className="w-4/12 lg:h-96 h-96 flex lg:mb-0 mb-12 flex-col justify-around gap-x-24 gap-y-6">
              <button
                onClick={(e) => handleModal("image")}
                data-aos="fade-left"
                data-aos-delay="100"
                className="btn btn-primary font-bold"
              >
                Add image
              </button>
              <button
                onClick={(e) => handleModal("paragraph")}
                data-aos="fade-left"
                data-aos-delay="200"
                className="btn btn-primary font-bold"
              >
                Add paragraph
              </button>
              <button
                onClick={(e) => handleModal("video")}
                data-aos="fade-left"
                data-aos-delay="300"
                className="btn btn-primary font-bold"
              >
                Add video
              </button>
              <button
                onClick={(e) => handleModal("text")}
                data-aos="fade-left"
                data-aos-delay="400"
                className="btn btn-primary font-bold"
              >
                Add scroll text
              </button>
            </div>
          </div>
        </div>
        {inputModal && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="modal-container">
              <div className="modal">
                <div className="flex justify-end p-2">
                  <button
                    type="button"
                    onClick={() => handleClose()}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                {imageSrcForm && (
                  <div className="flex justify-center p-4">
                    <input
                      onChange={(e) =>
                        setSrc((e.target as HTMLInputElement).value)
                      }
                      type="text"
                      className="form-input"
                      placeholder="image src"
                    />
                  </div>
                )}
                {videoSrcForm && (
                  <div className="flex justify-center p-4">
                    <input
                      onChange={(e) =>
                        setSrc((e.target as HTMLInputElement).value)
                      }
                      type="text"
                      className="form-input"
                      placeholder="video src"
                    />
                  </div>
                )}
                {contentForm && (
                  <div className="flex justify-center p-4">
                    <input
                      onChange={(e) =>
                        setContent((e.target as HTMLInputElement).value)
                      }
                      type="text"
                      className="form-input"
                      placeholder="content"
                    />
                  </div>
                )}
                {sizeForm && (
                  <div className="flex justify-center gap-4 p-4">
                    <input
                      onChange={(e) =>
                        setHeight((e.target as HTMLInputElement).value)
                      }
                      type="number"
                      className="form-input"
                      placeholder="height"
                    />
                    <input
                      onChange={(e) =>
                        setWidth((e.target as HTMLInputElement).value)
                      }
                      type="number"
                      className="form-input"
                      placeholder="width"
                    />
                  </div>
                )}
                <div className="flex justify-center p-4">
                  <button type="submit" className="btn btn-primary font-bold">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </section>
    </>
  );
}

import { useState } from "react";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

interface GalleryProps {
  galleryBgColor?: string;
  galleryWidth?: string;
  imageWidth?: string;
  gap?: string;
  imagesArray?: Array<any>;
}
const arrayOfImage = [
  "https://unsplash.it/900",
  "https://unsplash.it/1000",
  "https://unsplash.it/800",
  "https://unsplash.it/700",
  "https://unsplash.it/600",
  "https://unsplash.it/1300",
  "https://unsplash.it/1100",
  "https://unsplash.it/1200",
];

const GalleryLightbox = ({
  galleryBgColor = "bg-white",
  galleryWidth = "100",
  imageWidth = "250",
  gap = "15",
  imagesArray = arrayOfImage,
}: GalleryProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (image: any, index: number) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const goLeft = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    } else {
      setSelectedImageIndex(imagesArray.length - 1);
    }
  };

  const goRight = () => {
    if (selectedImageIndex < imagesArray.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    } else {
      setSelectedImageIndex(0);
    }
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, minmax(${imageWidth}px, 1fr))`,
    gap: `${gap}px`,
  };

  const containerWidth = {
    width: `${galleryWidth}%`,
  };
  return (
    <>
      <div className="flex w-full justify-center">
        <div
          style={containerWidth}
          className={`${galleryBgColor} h-fit lg:p-5 p-7`}
        >
          <div
            className={`relative grid overflow-hidden rounded-md   ${
              modalOpen && "blur-lg pointer-events-none "
            }`}
            style={gridStyle}
          >
            {imagesArray.map((Image: any, index: number) => (
              <img
                className="rounded-md flex justify-center items-center h-full transform hover:scale-105 transition-transform duration-300 ease-in cursor-pointer "
                key={index}
                onClick={() => {
                  handleImageClick(Image, index);
                }}
                src={Image}
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className={`justify-center items-center fixed top-[30%] left-[0%] lg:top-[25%] lg:left-[16%]  ${
          modalOpen ? "block" : "hidden"
        }`}
      >
        <div className="w-[100vw] h-[40vh] lg:w-[70vw] lg:h-[60vh] flex items-center gap-3 ">
          <button
            className="bg-gray-500 text-white  h-fit p-2 rounded-full"
            onClick={goLeft}
          >
            <BiChevronLeft size={24} />
          </button>
          <div className="h-[100%] w-[100%]">
            <div className="flex justify-between bg-white">
              <div className="px-4 py-1">
                {selectedImageIndex + 1} / {imagesArray.length}
              </div>
              <button
                className="px-4 py-1"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                <AiOutlineClose size={24} />
              </button>
            </div>
            <img
              className="h-[100%] w-[100%] object-cover p-2 bg-white"
              src={imagesArray[selectedImageIndex]}
              alt=""
            />
          </div>
          <button
            className="bg-gray-500 text-white h-fit p-2 rounded-full"
            onClick={goRight}
          >
            <BiChevronRight size={24} />
          </button>
        </div>
      </div>
    </>
  );
};

export default GalleryLightbox;

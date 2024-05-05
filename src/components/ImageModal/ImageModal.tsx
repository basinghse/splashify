import React from "react";
import { FaHeart, FaPlus } from "react-icons/fa";

type Photo = {
  id: string;
  width: number;
  height: number;
  urls: { large: string; regular: string; raw: string; small: string };
  color: string | null;
  user: {
    username: string;
    name: string;
  };
  likes: number;
  alt_description: string;
  created_at: string;
  description: string;
};

type ImageModalProps = {
  photo: Photo;
  onClose: () => void;
};

export const ImageModal: React.FC<ImageModalProps> = ({ photo, onClose }) => {
  // Formats date string to a more readable format.
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    let daySuffix = "th";

    if (day === 1 || day === 21 || day === 31) {
      daySuffix = "st";
    } else if (day === 2 || day === 22) {
      daySuffix = "nd";
    } else if (day === 3 || day === 23) {
      daySuffix = "rd";
    }

    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}${daySuffix}, ${year}`;
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-[200]">
      <div className="relative w-full h-screen p-4 bg-gray-50 flex justify-center items-center flex-col overflow-auto">
        <div className="absolute top-2 left-8 text-gray-700 focus:outline-none">
          <span className="font-bold text-xl">{photo.user.name}</span>
          <br />
          <span className="ml-1">@{photo.user.username}</span>
        </div>
        <div className="flex items-center cursor-pointer active:scale-[0.99] gap-1 absolute top-2 right-[20rem] bg-white border border-gray-500 p-2 rounded-md">
          <FaHeart className="text-gray-500" />
        </div>
        <div className="flex items-center cursor-pointer active:scale-[0.99] gap-1 absolute top-2 right-[17rem] bg-white border border-gray-500 p-2 rounded-md">
          <FaPlus className="text-gray-500" />
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-8 text-xl font-bold text-gray-700 focus:outline-none"
        >
          &times;
        </button>
        <div className="flex max-w-[1000px] justify-center items-center m-8 mt-64">
          <img
            src={photo.urls.regular}
            alt={photo.user.name}
            className="w-full h-full object-fit rounded-md shadow-md"
          />
        </div>
        <div className="m-4 w-full flex flex-col items-start">
          <p className="font-bold">
            <span>❤️ Likes: &nbsp;</span>
            {photo.likes}
          </p>
          <p>
            <span className="font-bold">📝 Description: &nbsp;</span>
            {photo.description}
          </p>
          <p>
            <span className="font-bold">📅 Uploaded: &nbsp;</span>
            {formatDate(photo.created_at)}
          </p>
          <p>
            <span className="font-bold">🔎 Alt Description: &nbsp;</span>
            {photo.alt_description}
          </p>
        </div>
      </div>
    </div>
  );
};

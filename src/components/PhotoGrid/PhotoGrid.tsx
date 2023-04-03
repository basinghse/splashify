import { FC, Fragment } from "react";
import "../../styles/Image.css";
import { FaHeart } from "react-icons/fa";
import { AiOutlineArrowDown } from "react-icons/ai";

// This defines the structure of the photo object that is passed to the component.

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

// This defines the props that the PhotoGrid component expects to receive.

type PhotoGridProps = {
  photo: Photo;
  onClick: () => void;
};

// This is the actual PhotoGrid component.

const PhotoGrid: FC<PhotoGridProps> = ({ photo, onClick }) => {
  const { user, urls } = photo;

  // This is the JSX that will be rendered to the DOM.

  return (
    <Fragment>
      <div className="imageItem" onClick={onClick}>
        <img
          src={urls.regular}
          alt={photo.alt_description}
          style={{
            borderRadius: "12px",
          }}
        />
        <div className="info">
          <p className="name">{user.name}</p>
          <AiOutlineArrowDown
            className="btn text-black bg-white cursor-pointer"
            onClick={() => {
              window.open(urls.raw, "_blank");
            }}
          >
            Download
          </AiOutlineArrowDown>
          <p className="likes flex justify-center items-center gap-1">
            {photo.likes}
            <FaHeart className="text-red-500" />
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default PhotoGrid;

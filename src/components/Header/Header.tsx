import React, {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { Dropdown } from "../index";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { client_id } from "../../../config";

// This defines the props that the Header component expects to receive.

interface HeaderProps {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  setInitialSearchQuery: Dispatch<SetStateAction<string>>;
}

// This is the actual Header component.

const Header: FC<HeaderProps> = ({
  setSearchQuery,
  searchQuery,
  setInitialSearchQuery,
}) => {
  // These are the states for the logo URL and the trending words to display.

  const [logoUrl, setLogoUrl] = useState<string>("");
  const [trendingWords, setTrendingWords] = useState<string[]>([]);

  // This function fetches a random photo from the Unsplash API to use as the logo.

  const fetchLogo = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?client_id=${client_id}`
      );
      setLogoUrl(response.data.urls.small);
    } catch (error) {
      console.error(error);
    }
  };

  // This function fetches the current trending topics from the Unsplash API.

  const fetchTrendingWords = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/topics/trending?client_id=${client_id}`
      );
      const words = response.data.slice(0, 4).map((topic: any) => topic.title);
      setTrendingWords(words);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(trendingWords, "tren");

  // This useEffect hook runs the fetchLogo and fetchTrendingWords functions on component mount.

  useEffect(() => {
    fetchLogo();
    fetchTrendingWords();
  }, []);

  // This function is called when the user clicks on a trending word. It updates the search query state.

  const handleTrendingWordClick = (word: string) => {
    setSearchQuery(word);
  };

  // This is the JSX that will be rendered to the DOM.

  return (
    <div className="w-full sticky top-0 flex justify-between items-center p-4 z-[100] bg-white">
      <div className="flex justify-center items-center">
        <div
          className="logo w-10 h-10 bg-cover bg-center bg-no-repeat rounded-full mr-2"
          style={{ backgroundImage: `url(${logoUrl})` }}
        />

        <h1 className="text-2xl font-bold">Splashify</h1>
      </div>
      <div className="flex justify-center absolute left-[36%] z-50">
        <div className="relative">
          <FaSearch className="text-gray-400 absolute top-1/2 left-2 transform -translate-y-1/2 text-xl" />
          <input
            type="text"
            placeholder="Search high resolution images"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
        w-[500px] h-[50px] rounded-xl px-10
        outline-none border-black border-2"
          />
          <RxCross2
            className="text-gray-400 absolute top-1/2 right-2 transform -translate-y-1/2 text-xl cursor-pointer"
            onClick={() => setSearchQuery("")}
          />
        </div>
        {/* //! implement trending words here */}
        <div className="ml-4">
          {trendingWords?.map((word, index) => (
            <button
              key={index}
              onClick={() => handleTrendingWordClick(word)}
              className="text-black mx-1 hover:text-black transition-colors"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <div className="flex">
        {searchQuery === "" && (
          <Dropdown setInitialSearchQuery={setInitialSearchQuery} />
        )}
      </div>
    </div>
  );
};

export default Header;

import axios from "axios";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Dropdown } from "../index";

interface HeaderProps {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  setInitialSearchQuery: Dispatch<SetStateAction<string>>;
}

export const Header: FC<HeaderProps> = ({
  setSearchQuery,
  searchQuery,
  setInitialSearchQuery,
}) => {
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [trendingWords, setTrendingWords] = useState<string[]>([]);

  // Fetches a random photo from the Unsplash API to use as the logo
  const fetchLogo = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?client_id=${
          import.meta.env.VITE_UNSPLASH_ACCESS_KEY
        }`
      );
      setLogoUrl(response.data.urls.small);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetches the current trending topics from the Unsplash API
  const fetchTrendingWords = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/topics/trending?client_id=${
          import.meta.env.VITE_UNSPLASH_ACCESS_KEY
        }`
      );
      const words = response.data.slice(0, 4).map((topic: any) => topic.title);
      setTrendingWords(words);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLogo();
    fetchTrendingWords();
  }, []);

  const handleTrendingWordClick = (word: string) => {
    setSearchQuery(word);
  };

  return (
    <div className="w-full sticky top-0 flex  justify-center items-center p-4 z-[100] bg-white">
      <div className="flex justify-center items-center mb-4">
        <div
          className="logo w-10 h-10 bg-cover bg-center bg-no-repeat rounded-full mr-2"
          style={{ backgroundImage: `url(${logoUrl})` }}
        />
        <h1 className="text-2xl font-bold">Splashify</h1>
      </div>
      <div className="flex justify-center items-center w-full mr-32">
        <div className="flex flex-1 justify-end items-center mx-2 ml-4 gap-10 2xl:gap-20">
          <button
            className="text-blue-600 font-medium py-2 rounded inline-flex items-center"
            onClick={() => setSearchQuery("Nature")}
          >
            <span>Nature</span>
          </button>
          <button
            className="text-blue-600 font-medium py-2 rounded inline-flex items-center"
            onClick={() => setSearchQuery("Architecture")}
          >
            <span>Architecture</span>
          </button>
          <button
            className="text-blue-600 font-medium py-2 rounded inline-flex items-center"
            onClick={() => setSearchQuery("Travel")}
          >
            <span>Travel</span>
          </button>
        </div>
        <div className="relative w-full max-w-md mx-8">
          <FaSearch className="text-gray-400 absolute top-1/2 left-2 transform -translate-y-1/2 text-xl" />
          <input
            type="text"
            placeholder="Search high resolution images"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[50px] rounded-xl px-10 outline-none border-black border-2"
          />
          <RxCross2
            className="text-gray-400 absolute top-1/2 right-2 transform -translate-y-1/2 text-xl cursor-pointer"
            onClick={() => setSearchQuery("")}
          />
        </div>
        <div className="flex flex-1 justify-start items-center gap-10 2xl:gap-20 mx-2 mr-4">
          <button
            className="text-blue-600 font-medium py-2 rounded inline-flex items-center"
            onClick={() => setSearchQuery("Food")}
          >
            <span>Food</span>
          </button>
          <button
            className="text-blue-600 font-medium py-2 rounded inline-flex items-center"
            onClick={() => setSearchQuery("Animals")}
          >
            <span>Animals</span>
          </button>
          <button
            className="text-blue-600 font-medium py-2 rounded inline-flex items-center"
            onClick={() => setSearchQuery("Technology")}
          >
            <span>Technology</span>
          </button>
        </div>
      </div>
      <div className="flex absolute right-8">
        {searchQuery === "" && (
          <Dropdown
            setInitialSearchQuery={setInitialSearchQuery}
            searchQuery={searchQuery}
          />
        )}
      </div>
    </div>
  );
};

import React, { FC, Fragment, useEffect, useState, useRef } from "react";
import { Header, PhotoGrid, ImageModal } from "./components/index"; // Importing components from components/index.tsx file
import { useDebounce } from "usehooks-ts"; // Importing useDebounce hook from usehooks-ts package
import Masonry from "react-masonry-css"; // Importing the react-masonry-css package
import "./styles/index.css"; // Importing the stylesheet
import axios from "axios"; // Importing Axios library
import { client_id } from "../config";

// Defining the type for Photo object

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

// Defining the type for SearchPhotosResponse object

type SearchPhotosResponse = {
  total: number;
  total_pages: number;
  results: Photo[];
};

const App: FC = () => {
  const [data, setPhotosResponse] = useState<SearchPhotosResponse | null>(null); // Setting the state for SearchPhotosResponse
  const [initialSearchQuery, setInitialSearchQuery] =
    useState<string>("trending"); // Setting the state for initial search query
  const [searchQuery, setSearchQuery] = useState<string>(""); // Setting the state for search query
  const debouncedSearchTerm = useDebounce(searchQuery, 1000); // Using useDebounce hook to debounce the search query
  const [showModal, setShowModal] = useState<boolean>(false); // Setting the state for showing/hiding the modal
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null); // Setting the state for selected photo
  const [page, setPage] = useState<number>(1); // Setting the state for current page number
  const [isLoading, setIsLoading] = useState<boolean>(false); // Setting the state for loading spinner
  const observer = useRef<IntersectionObserver | null>(null); // Using useRef hook to create a reference to IntersectionObserver object
  const [clearResults, setClearResults] = useState<boolean>(false); // Setting the state for clearing search results

  function shuffleArray(array: any[]) {
    // Defining the shuffleArray function to shuffle an array
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Fetching photos based on search query and page number

  useEffect(() => {
    const fetchPhotos = async (page: number) => {
      setIsLoading(true);
      try {
        // Determine which query to use based on whether the user has entered a search query or not
        const query =
          searchQuery !== "" ? debouncedSearchTerm : initialSearchQuery;

        // Fetch portrait-oriented photos

        const portraitResponse = await axios.get(
          `https://api.unsplash.com/search/photos?query=${query}&orientation=portrait&client_id=${client_id}&per_page=15&page=${page}&height=300`
        );

        // Fetch landscape-oriented photos

        const landscapeResponse = await axios.get(
          `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&client_id=${client_id}&per_page=15&page=${page}&height=300`
        );

        // Combine the results from both queries and shuffle the order

        const mergedResults = [
          ...portraitResponse.data.results,
          ...landscapeResponse.data.results,
        ];
        shuffleArray(mergedResults);

        // If the user has cleared the results, replace them with the new ones

        if (clearResults) {
          setPhotosResponse({
            ...portraitResponse.data,
            results: mergedResults,
          });
          setClearResults(false);
        } else {
          // Otherwise, append the new results to the existing ones

          setPhotosResponse((prevState) => {
            const updatedResults = prevState
              ? [...prevState.results, ...mergedResults]
              : mergedResults;
            return {
              ...portraitResponse.data,
              results: updatedResults,
            };
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos(page);
  }, [debouncedSearchTerm, initialSearchQuery, page]);

  // Effect to reset the search results and page number when the search query changes

  useEffect(() => {
    if (searchQuery !== "") {
      setClearResults(true);
      setPage(1);
    } else {
      setInitialSearchQuery("trending");
      setClearResults(true);
      setPage(1);
    }
  }, [searchQuery, initialSearchQuery]);

  //Load more images as the user reach the end of the page

  const loadMoreRef = (node: HTMLDivElement) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  //if the model is open than hide the scrollbar of the body else unhide it

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showModal]);

  // This is the JSX that will be rendered to the DOM.

  return (
    <>
      <Header
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        setInitialSearchQuery={setInitialSearchQuery}
      />
      <section className="home">
        <Masonry
          breakpointCols={6}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {data ? (
            data.results.map((photo: Photo) => (
              <PhotoGrid
                photo={photo}
                key={Math.random() * 1000000}
                onClick={() => {
                  setShowModal(true);
                  setSelectedPhoto(photo);
                }}
              />
            ))
          ) : (
            <h1 className="home text-4xl text-center text-black">Loading...</h1>
          )}
        </Masonry>
      </section>
      <div ref={loadMoreRef}></div>
      {showModal && selectedPhoto && (
        <ImageModal photo={selectedPhoto} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default App;

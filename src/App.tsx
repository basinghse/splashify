import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { useDebounce } from "usehooks-ts";
import { Header, ImageModal, PhotoGrid } from "./components/index";
import "./styles/index.css";

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

type SearchPhotosResponse = {
  total: number;
  total_pages: number;
  results: Photo[];
};

export const App: FC = () => {
  const [data, setPhotosResponse] = useState<SearchPhotosResponse | null>(null);
  const [initialSearchQuery, setInitialSearchQuery] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchQuery, 1000);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const [clearResults, setClearResults] = useState<boolean>(false);

  const unsplashAccessKey =
    import.meta.env.VITE_UNSPLASH_ACCESS_KEY || process.env.UNSPLASH_ACCESS_KEY;

  function shuffleArray(array: any[]) {
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
          `https://api.unsplash.com/search/photos?query=${query}&orientation=portrait&client_id=${unsplashAccessKey}&per_page=15&page=${page}&height=300`
        );

        // Fetch landscape-oriented photos
        const landscapeResponse = await axios.get(
          `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&client_id=${unsplashAccessKey}&per_page=15&page=${page}&height=300`
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
          console.log("the images were appended");

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
    setClearResults(true);
    setPage(1);
  }, [searchQuery, initialSearchQuery]);

  // Load more images as the user reach the end of the page
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

  // If the modal is open then hide the scrollbar of the body else unhide it
  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showModal]);

  return (
    <>
      <Header
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        setInitialSearchQuery={setInitialSearchQuery}
      />
      <section className="home p-6">
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

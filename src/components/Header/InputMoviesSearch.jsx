import { useEffect, useState, Suspense } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Form, ListGroup } from "react-bootstrap";

const InputMoviesSearch = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    try {
      const query = searchParams.get("query");
      if (query) {
        setSearchQuery(query);
        fetchMovieData(query);
      }
    } catch (error) {
      console.error(error);
    }
  }, [searchParams]);

  const fetchMovieData = async (query) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?language=en-US&query=${query}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2JjYTQ1ZWNhYWRkMGZkZTAxM2QzYzM0MmZlZDRjYyIsInN1YiI6IjY1MTQyMzk3OWI4NjE2MDBhY2FkYjQxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yDIoRNR2kWUEatfWvVn-tl8PUL8RjgYfNQ162riMp04",
          },
        }
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Panggil fungsi fetchMovieData ketika input berubah
    fetchMovieData(query);
  };

  return (
    <Container>
      <Form className="d-none d-lg-inline search-bar my-4">
        <Form.Control
          type="search"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleSearchInput}
        />
      </Form>
      <Suspense>
        <ListGroup>
          {searchResults.map((movie) => (
            <Link key={movie.id} to={`/details/${movie.id}`}>
              <ListGroup.Item action className="d-flex">
                <img
                  src={import.meta.env.VITE_API_IMAGE_URL + movie?.poster_path}
                  alt=""
                  width={"46px"}
                />
                <div className="ps-3">
                  <h3>{movie.title}</h3>
                  <h5>{movie.release_date}</h5>
                </div>
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      </Suspense>
    </Container>
  );
};

export default InputMoviesSearch;

import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import MovieItem from "../components/MovieItem";

const SearchMovies = () => {
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const search = async (q) => {
    setQuery(q);

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/search/movie?language=en-US&query=${q}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
          },
        }
      );

      const { data } = response;
      setSearchResults(data?.results);
      setErrors({ ...errors, isError: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors({
          ...errors,
          isError: true,
          message: error?.response?.data?.status_message || error?.message,
        });
      } else {
        alert(error?.message);
        setErrors({
          ...errors,
          isError: true,
          message: error?.message,
        });
      }
    }
  };

  useEffect(() => {
    if (query) {
      search(query);
    }
  }, [query]);

  return (
    <Container className="" style={{ paddingBlock: "80px" }}>
      <Row className="justify-content-center p-1 m-0">
        <div className="movies-filter d-flex justify-content-between flex-wrap ">
          <h4
            style={{
              color: "white",
              paddingLeft: "10px",
              borderLeft: "4px solid #dc3545",
            }}
          >
            Search Movies
          </h4>
        </div>
        <input
          placeholder="Search Fill ..."
          className="movie-search"
          onChange={({ target }) => search(target.value)}
        ></input>
        {searchResults.length > 0 ? (
          searchResults.map((movie) => (
            <Col
              xs={4}
              sm={4}
              md={3}
              lg={2}
              key={movie?.id}
              className="movie-column mt-0"
              style={{ padding: "10px" }}
            >
              <MovieItem
                id={movie?.id}
                imageURL={
                  import.meta.env.VITE_API_IMAGE_URL + movie?.poster_path
                }
                overview={movie?.overview}
                title={movie?.title}
                rating={movie?.vote_average}
                release={movie?.release_date}
              />
            </Col>
          ))
        ) : (
          <h1>No results found</h1>
        )}
      </Row>
    </Container>
  );
};

export default SearchMovies;

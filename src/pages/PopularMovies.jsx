import { Container, Row, Col, Button } from "react-bootstrap";
import MovieItem from "../components/MovieItem";
import { useState, useEffect } from "react";
import axios from "axios";

const PopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  const loadNextPage = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${
          currentPage + 1
        }`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2JjYTQ1ZWNhYWRkMGZkZTAxM2QzYzM0MmZlZDRjYyIsInN1YiI6IjY1MTQyMzk3OWI4NjE2MDBhY2FkYjQxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yDIoRNR2kWUEatfWvVn-tl8PUL8RjgYfNQ162riMp04",
          },
        }
      );

      const { data } = response;

      setPopularMovies([...popularMovies, ...data.results]);
      setCurrentPage(currentPage + 1);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2JjYTQ1ZWNhYWRkMGZkZTAxM2QzYzM0MmZlZDRjYyIsInN1YiI6IjY1MTQyMzk3OWI4NjE2MDBhY2FkYjQxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yDIoRNR2kWUEatfWvVn-tl8PUL8RjgYfNQ162riMp04",
            },
          }
        );

        const { data } = response;

        setPopularMovies(data?.results);
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

    getPopularMovies();
  }, []);

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }

  if (popularMovies.length === 0) {
    return <h1>Loading ...</h1>;
  }

  return (
    <Container style={{ paddingBlock: "80px" }}>
      <Row className="justify-content-center p-1 m-0">
        <div className="movies-filter d-flex justify-content-between flex-wrap ">
          <h4
            style={{
              color: "white",
              paddingLeft: "10px",
              borderLeft: "4px solid #dc3545",
            }}
          >
            Populer Movies
          </h4>
        </div>
        {popularMovies.map((movie) => (
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
              imageURL={import.meta.env.VITE_API_IMAGE_URL + movie?.poster_path}
              overview={movie?.overview}
              title={movie?.title}
              rating={movie?.vote_average}
              release={movie?.release_date}
            />
          </Col>
        ))}
      </Row>
      <div className="text-center">
        <Button
          variant="danger"
          className="mt-4"
          onClick={loadNextPage}
          disabled={loading}
        >
          Load More
        </Button>
      </div>
    </Container>
  );
};

export default PopularMovies;

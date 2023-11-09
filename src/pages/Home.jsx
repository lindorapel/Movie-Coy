import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroCarousel from "../components/HeroCarousel";
import MovieItem from "../components/MovieItem";
import axios from "axios";
import "./styles/homestyle.css";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/movie/popular`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
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

          return;
        }

        alert(error?.message);
        setErrors({
          ...errors,
          isError: true,
          message: error?.message,
        });
      }
    };

    getPopularMovies();
  }, []);

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }
  if (popularMovies.length === 0) {
    return <span>a</span>;
  }

  return (
    <>
      <HeroCarousel />
      <Container className="my-5 p-0">
        <Row className="p-1 m-0">
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
            <div>
              <Link className="more-popular pe-2" to="/populer-movies">
                see more <BsArrowRight className="ms-1" />
              </Link>
            </div>
          </div>
          {popularMovies.slice(0, 12).map((movie) => (
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
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;

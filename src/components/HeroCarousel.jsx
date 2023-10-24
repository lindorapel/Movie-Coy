import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Carousel } from "react-bootstrap";
import "./styles/carouselstyle.css";
import { Link } from "react-router-dom";

const HeroCarousel = () => {
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
  }, [errors]);

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }
  if (popularMovies.length === 0) {
    return <span>a</span>;
  }

  return (
    <>
      <Carousel>
        {popularMovies.slice(0, 5).map((movie) => (
          <Carousel.Item interval={1500} key={movie?.id}>
            <img
              className="d-block"
              src={"https://image.tmdb.org/t/p/original" + movie?.backdrop_path}
              alt="first slide"
            />
            <Carousel.Caption>
              <div className="setengah">
                <Container>
                  <h1>{movie?.title}</h1>
                  <p>{movie?.overview}</p>
                  <Button
                    variant="outline-danger"
                    as={Link}
                    to={`/details/${movie?.id}`}
                    className="detail-movie-button"
                  >
                    More Details ...
                  </Button>{" "}
                </Container>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default HeroCarousel;

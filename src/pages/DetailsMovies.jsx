import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieTrailerPopup from "../components/MovieTrailerPopup";
import { Container, Button } from "react-bootstrap";
import { BsPlayFill } from "react-icons/bs";
import { BiSolidShareAlt } from "react-icons/bi";
import "./styles/detailsmovies.css";

const DetailsMovies = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const backdropImageUrl = movieData
    ? `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`
    : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/movie/${movieId}?language=en-US&append_to_response=videos`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        console.log(response.data);
        setMovieData(response.data);
        const videos = response.data.videos.results;
        const trailer = videos.find((video) => video.type === "Trailer");

        if (trailer) {
          setTrailerUrl(trailer.key);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchData();
  }, []);

  const handleShowTrailer = (event) => {
    event.preventDefault();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  function convertToTime(runtime) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    const hoursString = hours > 0 ? `${hours}h` : "";
    const minutesString = minutes > 0 ? ` ${minutes}m` : "";

    return `${hoursString}${minutesString}`;
  }

  return (
    <>
      <div>
        {movieData ? (
          <div>
            {backdropImageUrl && (
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backdropImageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "240px",
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                  paddingBottom: "20px",
                }}
              >
                <Container className="d-flex justify-content-between flex-wrap">
                  <div className=" d-flex">
                    <h3
                      style={{
                        color: "#fff",
                        margin: "8px 0 0",
                      }}
                    >
                      ⭐
                    </h3>
                    <div style={{ color: "#FFF" }} className="lh-1 m-0 p-0">
                      <h5 color="#fff" className="fw-bolder m-0 p-0">
                        {parseFloat(movieData?.vote_average).toFixed(1)}
                        {""}
                        <span className="fw-normal"> / 10</span>
                      </h5>
                      <span style={{ fontSize: "14px" }}>
                        {movieData?.vote_count} vote
                      </span>
                    </div>
                  </div>

                  {!showPopup && (
                    <Button
                      onClick={handleShowTrailer}
                      variant="danger"
                      style={{
                        padding: "8px 10px",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        border: "none",
                      }}
                    >
                      <BsPlayFill
                        style={{ fontSize: "20px" }}
                        className="me-2"
                      />
                      Watch Trailer
                    </Button>
                  )}
                  {showPopup && trailerUrl && (
                    <MovieTrailerPopup
                      trailerUrl={trailerUrl}
                      closePopup={closePopup}
                    />
                  )}
                </Container>
              </div>
            )}
            <Container>
              <div
                style={{ width: "100%", paddingBlock: "50px", gap: "40px" }}
                className="d-flex flex-column flex-md-row"
              >
                <div
                  className="info-1 d-flex flex-column justify-content-start flex-sm-row"
                  style={{ gap: "20px", color: "#fff" }}
                >
                  <img
                    style={{
                      width: "100%",
                      maxWidth: "220px",
                      height: "100%",
                      maxHeight: "345px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                    src={
                      import.meta.env.VITE_API_IMAGE_URL +
                      movieData?.poster_path
                    }
                    alt=""
                  />
                  <div
                    style={{ gap: "20px" }}
                    className="title-info d-flex flex-column"
                  >
                    <div>
                      <h1 className="fw-bolder">{movieData.title}</h1>
                      <span>
                        {movieData.release_date} |{" "}
                        {convertToTime(movieData.runtime)}
                      </span>
                    </div>

                    <div>
                      <ul
                        style={{ listStyleType: "none", gap: "10px" }}
                        className="genres d-flex flex-wrap flex-lg-nowrap mb-0 px-0"
                      >
                        {movieData.genres.map((genre, index) => (
                          <li
                            style={{
                              padding: "8px 16px",
                              backgroundColor: "#252525",
                              borderRadius: "6px",
                            }}
                            key={index}
                          >
                            {genre.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      style={{ gap: "10px", cursor: "pointer" }}
                      className="d-flex align-items-center"
                    >
                      <Button
                        onClick={handleShowTrailer}
                        variant="danger"
                        style={{
                          padding: "7px 10px",
                          border: "none",
                        }}
                      >
                        <BsPlayFill style={{ fontSize: "24px" }} />
                        Trailer
                      </Button>

                      <BiSolidShareAlt
                        style={{
                          fontSize: "16px",
                          border: "2px solid #252525",
                          backgroundColor: "#DC3545",
                          width: "40px",
                          height: "40px",
                          padding: "8px",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div>
                      <h5 className="fw-bold">Overview :</h5>
                      <span>{movieData.overview}</span>
                    </div>
                  </div>
                </div>
                <div style={{ color: "#fff" }} className="info-2">
                  <div className="original-title mb-1 pb-3">
                    <h6 className="fw-bold m-0">Original Title</h6>
                    <span className="fw-light">{movieData.original_title}</span>
                  </div>
                  <div className="status mb-1 pb-3">
                    <h6 className="fw-bold m-0">Status</h6>
                    <span className="fw-light">{movieData.status}</span>
                  </div>
                  <div className="production-country mb-1 pb-3">
                    <h6 className="fw-bold m-0">Production Country</h6>
                    <ul className="m-0">
                      {movieData.production_countries.map((country, index) => (
                        <li className="fw-light" key={index}>
                          {country.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="production-companies mb-1 pb-3">
                    <h6 className="m-0">Production Companies</h6>
                    <ul className="m-0">
                      {movieData.production_companies.map((company, index) => (
                        <li className="fw-light" key={index}>
                          {company.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="spoken-languange mb-1 pb-3">
                    <h6 className="mb-0">Spoken Language</h6>
                    <ul className="mb-0">
                      {movieData.spoken_languages.map((language, index) => (
                        <li className="fw-light" key={index}>
                          {language.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="budged mb-1 pb-3">
                    <h6 className="mb-0">Budget</h6>
                    <span className="fw-light">
                      $. {movieData.budget.toLocaleString("en-US")}.00
                    </span>
                  </div>
                  <div className="revenue mb-1 pb-3">
                    <h6 className="mb-0">Revenue</h6>
                    <span className="fw-light">
                      $. {movieData.revenue.toLocaleString("en-US")}.00
                    </span>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default DetailsMovies;

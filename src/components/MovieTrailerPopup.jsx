import YouTube from "react-youtube";
import PropType from "prop-types";

const MovieTrailerPopup = ({ trailerUrl, closePopup }) => {
  const opts = {
    width: "640px",
    aspecRatio: 16 / 100,
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "99",
        }}
      >
        <button
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#fff",
            padding: "5px 10px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={closePopup}
        >
          Loading
        </button>
        <YouTube style={{ zIndex: "100" }} videoId={trailerUrl} opts={opts} />
      </div>
    </>
  );
};

MovieTrailerPopup.propTypes = {
  trailerUrl: PropType.func.isRequired,
  closePopup: PropType.func.isRequired,
};

export default MovieTrailerPopup;

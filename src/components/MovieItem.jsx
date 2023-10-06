import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropType from "prop-types";
import "./styles/movieitem.css";

function MovieItem({ id, title, imageURL, release, rating }) {
  return (
    <Card className="card-movie border-0">
      <Card.Link as={Link} to={`/details/${id}`} className="card-img-wrapper">
        <Card.Img className="img-movie" variant="top" src={imageURL} />
        <Card.Text className="rating">⭐ {rating}</Card.Text>
      </Card.Link>
      <Card.Body className="p-0 pt-2">
        <Card.Link
          as={Link}
          to={`/details/${id}`}
          className="text-decoration-none"
        >
          <Card.Title className="movie-title fs-6 mb-0">{title}</Card.Title>
        </Card.Link>
        <Card.Text className="movie-release">{release}</Card.Text>
      </Card.Body>
    </Card>
  );
}

MovieItem.propTypes = {
  id: PropType.number.isRequired,
  title: PropType.string.isRequired,
  release: PropType.string.isRequired,
  imageURL: PropType.string.isRequired,
  rating: PropType.number.isRequired,
};

export default MovieItem;

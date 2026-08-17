import { Link } from "react-router-dom";
import "./CarCard.css";

export default function CarCard({ car }) {
  const { id, name, type, price, image } = car;

  return (
    <Link to={`/models/${id}`} className="car-card">
      <div className="car-card__image-wrap">
        <img src={image} alt={name} className="car-card__image" loading="lazy" />
        <span className="car-card__type">{type}</span>
      </div>
      <div className="car-card__body">
        <h3 className="car-card__name">{name}</h3>
        <p className="car-card__price">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
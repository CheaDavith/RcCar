import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CARS } from "../data/cars";
import { useCart } from "../context/CartContext";
import "./ProductDetailsPage.css";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const car = useMemo(() => CARS.find((c) => c.id === id), [id]);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!car) {
    return (
      <div className="product-details product-details--empty">
        <h2>We couldn&apos;t find that model</h2>
        <p>It may have been removed or the link is out of date.</p>
        <Link to="/models" className="product-details__back">
          Back to Models
        </Link>
      </div>
    );
  }

  const related = CARS.filter((c) => c.type === car.type && c.id !== car.id).slice(0, 3);

  function handleAddToCart() {
    addToCart(car.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="product-details">
      <Link to="/models" className="product-details__crumb">
        &larr; Back to Models
      </Link>

      <div className="product-details__main">
        <div className="product-details__image-wrap">
          <span className="product-details__type">{car.type}</span>
          <img src={car.image} alt={car.name} />
        </div>

        <div className="product-details__info">
          <h1>{car.name}</h1>
          <p className="product-details__price">${car.price.toFixed(2)}</p>
          <p className="product-details__description">{car.description}</p>

          <dl className="product-details__specs">
            <div>
              <dt>Scale</dt>
              <dd>{car.scale}</dd>
            </div>
            <div>
              <dt>Top speed</dt>
              <dd>{car.topSpeed}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{car.type}</dd>
            </div>
          </dl>

          <div className="product-details__actions">
            <div className="product-details__qty">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button type="button" className="product-details__add" onClick={handleAddToCart}>
              {added ? "Added to cart ✓" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="product-details__related">
          <h2>More {car.type}</h2>
          <div className="product-details__related-grid">
            {related.map((r) => (
              <Link key={r.id} to={`/models/${r.id}`} className="product-details__related-card">
                <img src={r.image} alt={r.name} />
                <div>
                  <p className="product-details__related-name">{r.name}</p>
                  <p className="product-details__related-price">${r.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
import { useMemo, useState } from "react";
import CarCard from "../components/CarCard";
import { CARS, CAR_TYPES } from "../data/cars";
import "./ModelsPage.css";

export default function ModelsPage() {
  const [activeType, setActiveType] = useState("All");

  const filteredCars = useMemo(() => {
    if (activeType === "All") return CARS;
    return CARS.filter((car) => car.type === activeType);
  }, [activeType]);

  return (
    <div className="models-page">
      <div className="models-page__header">
        <h1>Models</h1>
        <p>Browse every car in the shop, or filter by type.</p>
      </div>

      <div className="models-page__filters">
        {["All", ...CAR_TYPES].map((type) => (
          <button
            key={type}
            className={`models-page__filter${
              activeType === type ? " models-page__filter--active" : ""
            }`}
            onClick={() => setActiveType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {filteredCars.length === 0 ? (
        <p className="models-page__empty">No models found in this category yet.</p>
      ) : (
        <div className="models-page__grid">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
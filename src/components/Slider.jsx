import React from 'react';

export default function Slider() {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade">
      <div className="carousel-inner" id="carousel">
        <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
          <form className="d-flex justify-content-center" role="search">
            <input
              className="form-control me-2 w-75"
              type="search"
              placeholder="Search your food..."
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>

        <div className="carousel-item active">
          <img
            src="https://source.unsplash.com/random/900x700?Chaat"
            className="d-block w-100"
            style={{ objectFit: "cover", filter: "brightness(30%)", height: "500px" }}
            alt="Chaat"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://source.unsplash.com/random/900x700?curry"
            className="d-block w-100"
            style={{ objectFit: "cover", filter: "brightness(30%)", height: "500px" }}
            alt="Curry"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://source.unsplash.com/random/900x700?dosa"
            className="d-block w-100"
            style={{ objectFit: "cover", filter: "brightness(30%)", height: "500px" }}
            alt="Dosa"
          />
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
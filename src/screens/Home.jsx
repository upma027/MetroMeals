import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import { useDispatchCart } from '../components/ContextReducer';

export default function Home() {

  let dispatch = useDispatchCart();

  const [search, setSearch] = useState('');
  const [FoodItem, setFoodItem] = useState([]);
  const [FoodCat, setFoodCat] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {

    try {

      console.log("Loading Started");
      console.log(process.env.REACT_APP_BACKEND_URL);

      let response = await fetch(
        // `${process.env.REACT_APP_BACKEND_URL}/api/foodData`,
        `https://metromeals.onrender.com/api/foodData`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      response = await response.json();

      console.log("Data Loaded");

      setFoodItem(response[0]);
      setFoodCat(response[1]);

      // thoda smooth loading feel ke liye
      setTimeout(() => {
        setLoading(false);
      }, 1500);

    } catch (error) {

      console.log(error);

      // backend slow ho to bhi loading dikhe
      setTimeout(() => {
        setLoading(false);
      }, 3000);

    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {

    if (localStorage.getItem("Lastcart") !== null) {

      dispatch({
        type: "UPDATE",
        data: JSON.parse(localStorage.getItem('Lastcart'))
      });

    }

  }, [dispatch])

  // LOADING SCREEN
  if (loading) {

    return (

      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          backgroundColor: "#121212",
          flexDirection: "column"
        }}
      >

        <h1 className="text-warning mb-4">
          MetroMeals 🍔
        </h1>

        <div
          className="spinner-border text-success"
          role="status"
          style={{
            width: "4rem",
            height: "4rem"
          }}
        >

          <span className="visually-hidden">
            Loading...
          </span>

        </div>

        <h5 className="text-light mt-4">
          Backend is waking up...
        </h5>

      </div>

    );
  }

  return (

    <div>

      <Navbar />

      <div>

        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          style={{ objectFit: "contain !important" }}
        >

          <div
            className="carousel-inner"
            id="carousel"
            style={{ objectFit: "contain !important" }}
          >

            <div className='carousel-caption' style={{ zIndex: "10" }}>

              <form className="d-flex" role="search">

                <input
                  className="form-control me-2 ms-3"
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                  }}
                  placeholder="Search"
                  aria-label="Search"
                />

                <button
                  className="btn btn-outline-success"
                  type="submit"
                >
                  Search
                </button>

              </form>

            </div>

            <div className="carousel-item active">

              <img
                src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg"
                style={{ filter: "brightness(30%)" }}
                className="d-block w-100"
                alt="food"
              />

            </div>

            <div className="carousel-item">

              <img
                src="https://images.moneycontrol.com/static-mcnews/2023/10/pexels-anil-sharma-10580198-770x433.jpg?impolicy=website&width=770&height=431"
                style={{ filter: "brightness(30%)" }}
                className="d-block w-100"
                alt="food"
              />

            </div>

            <div className="carousel-item">

              <img
                src="https://www.tastingtable.com/img/gallery/20-delicious-indian-dishes-you-have-to-try-at-least-once/l-intro-1645057933.jpg"
                style={{ filter: "brightness(30%)" }}
                className="d-block w-100"
                alt="food"
              />

            </div>

          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >

            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>

            <span className="visually-hidden">
              Previous
            </span>

          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >

            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>

            <span className="visually-hidden">
              Next
            </span>

          </button>

        </div>

      </div>

      <div className='container'>

        {
          FoodCat !== null
            ? FoodCat.map((data) => {

              return (

                <div className="row" key={data._id}>

                  <div className='fs-2 m-3 text-white'>

                    {data.CategoryName}

                  </div>

                  <hr />

                  {
                    FoodItem !== null &&
                    FoodItem
                      .filter((items) =>
                        (items.CategoryName === data.CategoryName) &&
                        (items.name.toLowerCase().includes(search.toLowerCase()))
                      )
                      .map(filterItems => {

                        return (

                          <div
                            className='col-12 col-md-6 col-lg-3 m-3'
                            key={filterItems._id}
                          >

                            <Card
                              foodItem={filterItems}
                              options={filterItems.options[0]}
                            />

                          </div>

                        );

                      })
                  }

                </div>

              )

            })
            : ""
        }

      </div>

    </div>

  )

}
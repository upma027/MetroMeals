import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import { useDispatchCart } from '../components/ContextReducer'

// 🧪 Mock data to simulate backend response
const mockFoodCat = [
  { _id: "1", CategoryName: "Indian" },
  { _id: "2", CategoryName: "Snacks" }
];

const mockFoodItem = [
  {
    _id: "101",
    CategoryName: "Indian",
    name: "Paneer Butter Masala",
    img: "https://source.unsplash.com/400x300/?paneer",
    options: [{ half: "120", full: "200" }]
  },
  {
    _id: "102",
    CategoryName: "Snacks",
    name: "Samosa",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxnVgCV-6sbWMQ-OaALcEztviIakZJgzo5Jg&s",
    options: [{ one: "20", three: "50" }]
  }
];

export default function Home() {
  const dispatch = useDispatchCart();
  const [search, setSearch] = useState('');
  const [FoodItem, setFoodItem] = useState([]);
  const [FoodCat, setFoodCat] = useState([]);

  useEffect(() => {
    // ⛔ Replacing backend fetch with mock data
    setFoodItem(mockFoodItem);
    setFoodCat(mockFoodCat);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("Lastcart") !== null) {
      dispatch({ type: "Update", data: JSON.parse(localStorage.getItem('Lastcart')) });
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div className="carousel-inner" id="carousel">
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2 ms-3"
                  type="search"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value) }}
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
            <div className="carousel-item active">
              <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://images.moneycontrol.com/static-mcnews/2023/10/pexels-anil-sharma.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://www.tastingtable.com/img/gallery/20-delicious-indian-dishes-you-have-to-try-at-least-once.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className='container'>
        {FoodCat.length > 0 && FoodCat.map((cat) => (
          <div className="row" key={cat._id}>
            <div className='fs-2 m-3 text-white'>{cat.CategoryName}</div>
            <hr />
            {FoodItem.filter(item =>
              item.CategoryName === cat.CategoryName &&
              item.name.toLowerCase().includes(search.toLowerCase())
            ).map(filterItem => (
              <div className='col-12 col-md-6 col-lg-3 m-3' key={filterItem._id}>
                <Card
                  foodItem={filterItem}
                  options={filterItem.options[0]}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

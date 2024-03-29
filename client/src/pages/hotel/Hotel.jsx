import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js"
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext.js";
import Reserve from "../../components/reserve/Reserve.jsx";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../../components/footer/Footer"

const Hotel = () => {
  const location=useLocation();
  const id=location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, loading } = useFetch(`/hotels/find/${id}`);
  const {dates,options}=useContext(SearchContext)
  const {user}=useContext(AuthContext)
  const navigate=useNavigate()


  
  const MILLISECONDS_PER_DAY=1000*60*60*24;
  function dayDifference(date1,date2){
    const timeDiff=Math.abs(date2?.getTime()-date1?.getTime())
    const diffDays=Math.ceil(timeDiff/MILLISECONDS_PER_DAY)
    return diffDays;
  }
const days=dayDifference(dates[0]?.endDate,dates[0]?.startDate)

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick=()=>{
    if (user){
      setOpenModal(true)
    }else{
      navigate("/login")
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="close"
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="arrow"
                  onClick={() => handleMove("l")}
                />
                <div className="sliderWrapper">
                  <img
                    src={data.photos[slideNumber]}
                    alt=""
                    className="sliderImg"
                  />
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="arrow"
                  onClick={() => handleMove("r")}
                />
              </div>
            )}
            <div className="hotelWrapper">
              <button className="bookNow" onClick={handleClick}>Book Now !</button>
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>
              <span className="hotelDistance">
                 Good location - {data.distance}
              </span>
              <span className="hotelPriceHighlight">
                Book a stay here costs ₹{data.cheapestPrice} and get a free airport
                taxi
              </span>
              <div className="hotelImages">
                {data.photos?.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">
                    {data.desc}
                  </p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for your {days}-night stay!</h1>
                  <span>
                    Book your stay now with the best price ever!
                  </span>
                  <h2>
                    <b>₹{days*data.cheapestPrice*options.room}</b> <small>({days} nights)</small>
                  </h2>
                  <button onClick={handleClick}>Book Now !</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    <Footer/>

    </div>
    
  );
  
};

export default Hotel;

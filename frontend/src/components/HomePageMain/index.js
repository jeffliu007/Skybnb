import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpots } from "../../store/spots";
import { SpotCards } from "./SpotCards";
import "./HomePage.css";
import Footer from "./footer";

const HomePage = () => {
  const dispatch = useDispatch();
  const [loadedPage, setLoadedPage] = useState(false);
  const loadInitSpots = useSelector((state) => state.spots);
  const spots = Object.values(loadInitSpots.allSpots);
  useEffect(() => {
    dispatch(fetchAllSpots()).then(() => setLoadedPage(true));
  }, [dispatch]);

  if (!loadedPage) return null;

  return (
    <>
      <div className="HomePage-Container">
        <div className="HomePage">
          {spots.map((spot) => (
            <SpotCards spot={spot} key={spot.id} />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;

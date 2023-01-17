import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpots } from "../../store/spots";
import { SpotCards } from "./SpotCards";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const loadInitSpots = useSelector((state) => state.spots);
  const spots = Object.values(loadInitSpots.allSpots);
  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  if (Object.keys(loadInitSpots).length < 1) return null;

  return (
    <>
      <div className="HomePage-Container">
        <div className="HomePage">
          {spots.map((spot) => (
            <SpotCards spot={spot} key={spot.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;

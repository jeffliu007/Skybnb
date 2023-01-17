import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot } from "../../store/spots";
import "./SingleSpotPage.css";

export const SingleSpotPage = () => {
  const dispatch = useDispatch();
  const loadInitSpot = useSelector((state) => state.spots.singleSpot);

  Object.values(loadInitSpot);

  console.log(`this is load init spot ${loadInitSpot}`);

  const { spotId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
  }, [dispatch, spotId]);

  if (!loadInitSpot) return null;

  const {
    name,
    description,
    price,
    numReviews,
    SpotImages,
    address,
    city,
    state,
    country,
  } = loadInitSpot;

  return (
    <>
      <div className="SingleSpot-Main-Container">
        <div className="=SingleSpot-Title">name {loadInitSpot.name}</div>
      </div>
    </>
  );
};

export default SingleSpotPage;

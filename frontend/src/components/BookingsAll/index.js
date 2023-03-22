import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { defaultDates, setEndDateChange } from "./helperDates";
import { createBooking, loadSelfBookings } from "../../store/bookings";
import "./BookingsAll.css";

export default function NewBookingForm({ rating, numReviews, price }) {
  const { spotId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [startDate, setStartDate] = useState(defaultDates("start"));
  const [endDate, setEndDate] = useState(defaultDates("end"));

  useEffect(() => {
    setEndDate(setEndDateChange(startDate));
  }, [startDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const createdBooking = {
      startDate,
      endDate,
    };

    const submitNewBooking = await dispatch(
      createBooking(parseInt(spotId), createdBooking)
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

    // if (submitNewBooking) {
    //   dispatch(loadSelfBookings(currUser.id));
    //   history.pushState("/");
    // }
  };

  return (
    <div className="Booking-Main-Container">
      <div className="Booking-Header">
        <div className="Booking-Price">${price}</div>
        <span>night</span>
        <div>
          <i className="fas fa-star"></i>
          {rating}
        </div>
        <div>{numReviews} reviews</div>
      </div>
      <div className="Booking-Errors">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmit} className={"Booking-Form"}>
          <div className="Booking-Form-Container">
            <div className="Booking-Start-Date">
              <input
                className="Booking-Input"
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <label htmlFor="Booking-Label" className="Booking-Label-In">
                CHECK IN
              </label>
            </div>

            <div className="Booking-End-Date">
              <input
                className="Booking-Input"
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <label htmlFor="Booking-Label" className="Booking-Label-Out">
                CHECK OUT
              </label>
            </div>
            <div className="Booking-Reserve-Button">
              <button type="submit">Reserve</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

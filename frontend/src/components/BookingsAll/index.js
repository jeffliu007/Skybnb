import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  defaultDates,
  setEndDateChange,
  daysToReservation,
} from "./helperDates";
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

  function addCommas(num) {
    var str = num.toString();
    var pattern = /(-?\d+)(\d{3})/;

    while (pattern.test(str)) {
      str = str.replace(pattern, "$1,$2");
    }
    return str;
  }

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

      if (data && data.errors) {
        setErrors(data.errors);
      } else if (data && data.message) {
        setErrors([data.message]);
      } else {
        setErrors(["An error occurred while submitting the booking"]);
      }
    });

    if (submitNewBooking) {
      history.push("/bookings");
    }
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
            <div className="Booking-Form-Date-Holder">
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
            </div>
            <div className="Booking-Reserve-Button">
              <button type="submit">Reserve</button>
              <p>You won't be charged yet</p>
            </div>
            <div className="Booking-Bottom-Container">
              <div className="Booking-Bottom-Nights BB-D">
                <div>
                  ${price} x {daysToReservation(startDate, endDate)} nights
                </div>
                <div>
                  ${addCommas(price * daysToReservation(startDate, endDate))}
                </div>
              </div>
              <div className="Booking-Bottom-Cleaning BB-D">
                <div>Cleaning fee</div>
                <div>
                  $
                  {addCommas(
                    (
                      price *
                      daysToReservation(startDate, endDate) *
                      0.07
                    ).toFixed(2)
                  )}
                </div>
              </div>
              <div className="Booking-Bottom-Service BB-D">
                <div>Skybnb service fee</div>
                <div>
                  $
                  {addCommas(
                    (
                      price *
                      daysToReservation(startDate, endDate) *
                      0.11
                    ).toFixed(2)
                  )}
                </div>
              </div>
            </div>
            <div className="Booking-Bottom-Total">
              <div>Total before taxes</div>
              <div>
                $
                {addCommas(
                  (
                    price * daysToReservation(startDate, endDate) +
                    price * daysToReservation(startDate, endDate) * 0.07 +
                    price * daysToReservation(startDate, endDate) * 0.11
                  ).toFixed(2)
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

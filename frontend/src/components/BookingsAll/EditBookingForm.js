import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  defaultDates,
  setEndDateChange,
  daysToReservation,
} from "./helperDates";
import { updateBooking, fetchSelfBookings } from "../../store/bookings";
import { useModal } from "../../context/Modal";
import "./BookingsAll.css";

export const EditUserBookingForm = ({ spotId, book, price }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);

  const dateSplit = (date) => {
    const newDate = date.split("T");
    return newDate[0];
  };

  const [startDate, setStartDate] = useState(dateSplit(book.startDate));
  const [endDate, setEndDate] = useState(dateSplit(book.endDate));

  const { closeModal } = useModal();

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

  const handleEdit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const editedBooking = {
      startDate,
      endDate,
    };

    const submitEditedBooking = await dispatch(
      updateBooking(parseInt(book?.id), editedBooking)
    ).catch(async (res) => {
      const data = await res.json();

      if (data && data.errors) {
        setErrors(data.errors);
      } else if (data && data.message) {
        setErrors([data.message]);
      } else {
        setErrors(["An error occurred while editing the booking"]);
      }
    });

    if (submitEditedBooking) {
      dispatch(fetchSelfBookings(currUser.id));
      closeModal();
    }
  };

  return (
    <div className="Booking-Edit-Container">
      <div className="Booking-Edit-Header Booking-Edit-Price">
        <div className="BookingEditPrice">${price} per night</div>
      </div>
      <div className="Booking-Errors">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className={"Booking-Edit-LI"}>
              {error}
            </li>
          ))}
        </ul>
        <form onSubmit={handleEdit} className={"Booking-Form"}>
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
};

export default EditUserBookingForm;

import { convertDate } from "./helperDates";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadSelfBookings, removeBooking } from "../../store/bookings";
import OpenModalButton from "../OpenModalButton";
import { useEffect, useRef, useState } from "react";
import EditUserBookingForm from "./EditBookingForm";

export const UserBookingsCard = ({ book, spotId, userId }) => {
  const history = useHistory();
  const bookings = useSelector((state) => state.bookings.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const convertDate = (date) => {
    const newDate = new Date(date);
    const month = newDate
      .toLocaleDateString("default", { month: "long" })
      .slice(0, 3);
    const day = newDate.getDate();
    const year = newDate.getFullYear();

    return `${month} ${day + 1} ${year}`;
  };

  const handleBookingClick = (e) => {
    if (e.target.closest(".Bookings-Edit-Button")) {
      return;
    }
    history.push(`/spots/${book.spotId}`);
  };

  const handleDelete = async () => {
    const deletedBooking = await dispatch(removeBooking(+book?.id));
    history.push("/bookings");
    dispatch(loadSelfBookings(userId));
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  if (!bookings || bookings.length === 0)
    return (
      <div className="BookingsPage-Container">
        <h1>No Upcoming Trips Available</h1>
        <h2>Time to pack your bags and book a relaxing vacation!</h2>
      </div>
    );

  return (
    <div className="BookingsPage-Card-Holder" onClick={handleBookingClick}>
      <div className="BookingsPage-Card-Left">
        <div className="BookingsPage-Card-Img">
          <img src={book.Spot.SpotImages[0].url} />
        </div>
      </div>
      <div className="BookingsPage-Card-Right">
        <div className="BookingsPage-Info-Top">
          <div className="BookingsPage-Info-TopLeft">
            <div>{book.Spot.name}</div>
            <div>{book.Spot.address}</div>
          </div>
          <div className="BookingsPage-Info-TopRight">
            <i
              className="fa-solid fa-trash-can"
              id="trashcan-BookingsPage"
              onClick={handleDelete}
            ></i>
            <div>
              <OpenModalButton
                buttonText={"Edit"}
                onButtonClick={closeMenu}
                modalComponent={
                  <EditUserBookingForm
                    spotId={spotId}
                    book={book}
                    price={book.Spot.price}
                  />
                }
                className="Bookings-Edit-Button"
              />
            </div>
          </div>
        </div>
        <div className="BookingsPage-Info-Bottom">
          <div className="BookingsPage-Info-BottomLeft">
            <div className="BookingsPage-Info-BottomLeftOne">
              <div className="BP1">Check In</div>
              <div className="BookingsPage-Info-BottomLeft-CheckIn">
                {convertDate(book.startDate)}
              </div>
            </div>
            <div className="BookingsPage-Info-BottomLeftTwo">
              <div className="BP2">Check Out</div>
              <div className="BookingsPage-Info-BottomLeft-CheckOut">
                {convertDate(book.endDate)}
              </div>
            </div>
          </div>
          <div className="BookingsPage-Info-BottomRight">
            <div>${book.Spot.price}</div>
            <div>per night:</div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default UserBookingsCard;

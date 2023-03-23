import { convertDate } from "./helperDates";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const UserBookingsCard = ({ book, spotId, userId }) => {
  const history = useHistory();
  const bookings = useSelector((state) => state.bookings.user);

  const handleBookingClick = () => {
    history.push(`/spots/${book.spotId}`);
  };

  if (!bookings)
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
              // onClick={handleDelete}
              id="trashcan-BookingsPage"
            ></i>
            <button>Edit</button>
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

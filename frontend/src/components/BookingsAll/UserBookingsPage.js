import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSelfBookings } from "../../store/bookings";
import UserBookingsCard from "./UserBookingsCard";

export const UserBookingsPage = () => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => state.bookings.user);
  let bookingsArr = Object.values(bookings);

  console.log(bookingsArr);

  useEffect(() => {
    dispatch(fetchSelfBookings(currUser.id));
  }, [dispatch]);

  if (!currUser) return null;

  if (!bookings)
    return (
      <div className="BookingsPage-Container">
        <h1>No Upcoming Trips Available</h1>
        <h2>Time to pack your bags and book a relaxing vacation!</h2>
      </div>
    );

  return (
    <div>
      {bookings && (
        <div className="BookingsPage-Container">
          <h1>Upcoming Trips</h1>
          <div className="BookingsPage-Center-Column">
            {bookingsArr &&
              bookingsArr.map((book) => (
                <UserBookingsCard
                  book={book}
                  spotId={book.spotId}
                  userId={currUser.id}
                  key={book.id}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBookingsPage;

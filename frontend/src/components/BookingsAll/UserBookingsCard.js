export const UserBookingsCard = ({ book, spotId, userId }) => {
  return (
    <div className="BookingsPage-Card-Holder">
      <div className="BookingsPage-Card-Left">
        <div className="BookingsPage-Card-Img">
          <img src={book.Spot.SpotImages[0].url} />
        </div>
      </div>
      <div className="BookingsPage-Card-Right">
        <div className="BookingsPage-Info-Top">{book.Spot.name}</div>
        <div className="BookingsPage-Info-Bottom">infobottom</div>
      </div>
    </div>
  );
};

export default UserBookingsCard;

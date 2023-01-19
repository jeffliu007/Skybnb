import { OpenModalButtonCreateRev } from "../OpenModalButton";
import ReviewModalForm from "./ReviewModalForm";

export const CreateNewReviewModal = ({ alreadyRev }) => {
  return (
    <div>
      <OpenModalButtonCreateRev
        buttonText="Add New Review"
        modalComponent={<ReviewModalForm alreadyRev={alreadyRev} />}
      />
    </div>
  );
};

export default CreateNewReviewModal;

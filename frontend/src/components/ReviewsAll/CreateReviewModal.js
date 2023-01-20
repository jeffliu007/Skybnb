import { OpenModalButtonCreateRev } from "../OpenModalButton";
import ReviewModalForm from "./ReviewModalForm";

export const CreateNewReviewModal = () => {
  return (
    <div className="add-rev-container">
      <OpenModalButtonCreateRev
        buttonText="Add New Review"
        modalComponent={<ReviewModalForm />}
      />
    </div>
  );
};

export default CreateNewReviewModal;

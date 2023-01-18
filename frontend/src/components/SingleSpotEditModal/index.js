import { OpenModalButtonEditSpot } from "../OpenModalButton";
import { EditModalForm } from "./EditModalForm";
import "./EditModalForm.css";

export const EditSpotModal = () => {
  return (
    <div>
      <OpenModalButtonEditSpot
        buttonText={`Edit`}
        modalComponent={<EditModalForm />}
      />
    </div>
  );
};

export default EditSpotModal;

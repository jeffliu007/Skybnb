import OpenModalButton from "../OpenModalButton";
import { EditModalForm } from "./EditModalForm";

export const EditSpotModal = () => {
  return (
    <div className="Edit-Spot-Button">
      <OpenModalButton
        buttonText="Edit Spot"
        modalComponent={<EditModalForm />}
        className="Edit-Spot-Button"
      />
    </div>
  );
};

export default EditSpotModal;

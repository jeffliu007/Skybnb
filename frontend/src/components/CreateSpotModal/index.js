import "./CreateSpotModal.css";
import { OpenModalButtonCreateForm } from "../OpenModalButton";
import SpotModalForm from "./SpotModalForm";

export const AddNewSpotModal = () => {
  return (
    <div>
      <OpenModalButtonCreateForm
        buttonText="Skybnb your home"
        modalComponent={<SpotModalForm />}
      />
    </div>
  );
};

export default AddNewSpotModal;

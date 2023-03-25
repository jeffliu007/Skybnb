import "./CreateSpotModal.css";
import { OpenModalButtonCreateForm } from "../OpenModalButton";
import SpotModalForm from "./SpotModalForm";

export const AddNewSpotModal = () => {
  return (
    <div className="main-skybnb-create-container">
      <OpenModalButtonCreateForm
        buttonText="Skybnb your home"
        modalComponent={<SpotModalForm />}
        className="CreateFormButton"
      />
    </div>
  );
};

export default AddNewSpotModal;

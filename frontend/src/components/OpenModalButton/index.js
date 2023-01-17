import React from "react";
import { useModal } from "../../context/Modal";

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (typeof onButtonClick === "function") onButtonClick();
    if (typeof onModalClose === "function") setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  return <button onClick={onClick}>{buttonText}</button>;
}

export function OpenModalButtonCreateForm({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (typeof onButtonClick === "function") onButtonClick();
    if (typeof onModalClose === "function") setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  return (
    <button onClick={onClick} className="CreateFormButton">
      {buttonText}
    </button>
  );
}

//notes

// Now, let's say you wanted to print "Greeting completed" in the console logs whenever the user closes the "Hello World!" modal. You could add the following callback function as the onModalClose prop to the OpenModalButton component:

// const Greeting = () => {
//   return (
//     <OpenModalButton
//       buttonText="Greeting"
//       modalComponent={<h2>Hello World!</h2>}
//       onButtonClick={() => console.log("Greeting initiated")}
//       onModalClose={() => console.log("Greeting completed")}
//     />
//   );
// };

export default OpenModalButton;

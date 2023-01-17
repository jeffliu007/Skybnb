import "./SingleSpotPage.css";

export const SpotPageImgLayout = ({ spot, spotImg }) => {
  const spotPic = spotImg?.find((image) => image.preview === true);
  return (
    <div id="SpotImgLayout-Container">
      <img
        src={spotPic?.url}
        alt="spot-pic-url"
        className="Spot-Image-Container"
      />
    </div>
  );
};

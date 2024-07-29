import { locationIcon, logoUrl } from "../constants/constants";

const MarkerLocation = ({ isLogo = true }: { isLogo?: boolean }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isLogo ? (
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
        >
          <img
            src={logoUrl}
            alt="Marker Brand"
            style={{
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              borderRadius: "8px",
            }}
            width={28}
            height={28}
          />
          <div
            style={{
              height: "10px",
              width: "10px",
              borderRadius: "50%",
              background: "rgb(239 59 59)",
              marginTop: "4px"
            }}
          ></div>
        </div>
      ) : (
        <img src={locationIcon} alt="Location Icons" width={32} height={32} />
      )}
    </div>
  );
};

export default MarkerLocation;

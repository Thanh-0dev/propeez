import { Popup } from "react-map-gl";

export default function PopupBox({ setPopupInfo, popupInfo }) {
  return (
    <Popup
      anchor="top"
      longitude={Number(popupInfo.longitude)}
      latitude={Number(popupInfo.latitude)}
      onClose={() => setPopupInfo(null)}
    >
      <div>
        <h2>{popupInfo.title}</h2>
        <p>{popupInfo.adress}</p>
        <p>{popupInfo.description}</p>
        <p>
          Du {popupInfo.startDate} au {popupInfo.endDate}
        </p>
      </div>
    </Popup>
  );
}

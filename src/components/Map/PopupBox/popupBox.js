import Image from "next/image";
import { Popup } from "react-map-gl";
import styles from "./popupBox.module.css";

export default function PopupBox({ setPopupInfo, popupInfo }) {
  console.log(popupInfo.image);
  return (
    <Popup
      className={styles.popupContainer}
      anchor="top"
      longitude={Number(popupInfo.longitude)}
      latitude={Number(popupInfo.latitude)}
      onClose={() => setPopupInfo(null)}
    >
      <Image
        src="/default.jpg"
        alt={popupInfo.title}
        className={styles.image}
        width={210}
        height={120}
      />
      <h2 className={styles.title}>{popupInfo.title}</h2>
      <p className={styles.item}>
        <strong>Lieu</strong> : {popupInfo.address}
      </p>
      <p className={styles.item}>
        <strong>Description</strong> : {popupInfo.description}
      </p>
      <p className={styles.item}>
        Du <strong>{popupInfo.startDate}</strong> au{" "}
        <strong>{popupInfo.endDate}</strong>
      </p>
    </Popup>
  );
}

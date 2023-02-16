import InfoBox from "@/components/InfoBox/infoBox";
import Image from "next/image";
import styles from "./incidentInfo.module.css";

export const XmarkIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      style={{ width: "15px" }}
    >
      <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
    </svg>
  );
};

export default function IncidentInfo({
  incidentInfo,
  setIncidentInfo,
  setHoverInfo,
}) {
  return (
    <>
      <button
        className={styles.close_button}
        onClick={() => {
          setIncidentInfo(null);
          setHoverInfo(null);
        }}
      >
        <XmarkIcon />
      </button>
      <h2 className={styles.title}>{incidentInfo.title}</h2>
      <Image
        src={`https://res.cloudinary.com/${process.env.CLOUD_NAME}/v${incidentInfo.image.version}/${incidentInfo.image.publicId}.${incidentInfo.image.format}`}
        alt={incidentInfo.title}
        className={styles.image}
        width={500}
        height={120}
      />
      <InfoBox>{incidentInfo.address}</InfoBox>
      <p className={styles.description}>
        <strong>Description</strong> : {incidentInfo.description}
      </p>
      <p className={styles.item}>
        Du <strong>{incidentInfo.startDate}</strong> au{" "}
        <strong>{incidentInfo.endDate}</strong>
      </p>
    </>
  );
}

const pinStyle = {
  cursor: "pointer",
  stroke: "none",
};

export default function Pin({ size = 20, color = "#313131", pinActive }) {
  return (
    <svg height={size} viewBox="0 0 24 24" style={pinStyle}>
      <circle cx="12" cy="12" r="12" fill={color} />
      <circle cx="12" cy="12" r="10" fill="white" />
      <circle cx="12" cy="12" r="8" fill={color} />
    </svg>
  );
}

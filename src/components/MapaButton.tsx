import markerPin from "../assets/marker-pin.svg";


export default function MapaButton() {
  const url =
    "https://www.google.com/maps/search/?api=1&query=Salón+de+eventos+CHELISHA+Los+Alpes";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mapa-btn"
    >
      <img src={markerPin} alt="Marker pin" className="mapa-btn__icon" /> Ver ubicación en Google Maps
    </a>
  );
}

import Loading from "../../assets/loading.svg"

export default function loadingAdmin() {
  return <div className="loading-dashboard">
    <img src={Loading} alt="Loading" className="loading-dashboard__image" />
  </div>;
}
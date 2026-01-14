interface Props {
  label: string;
  value: number;
  color: string;
}

export default function StatsCard({ label, value, color }: Props) {
  return (
    <div className="stat-card" style={{ backgroundColor: color }}>
      <span className="stat-card__value">{value}</span>
      <p className="stat-card__label">{label}</p>
    </div>
  );
}

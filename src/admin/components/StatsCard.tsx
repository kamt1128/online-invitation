interface Props {
  label: string;
  value: number;
}

export default function StatsCard({ label, value }: Props) {
  return (
    <div className="stat-card">
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}

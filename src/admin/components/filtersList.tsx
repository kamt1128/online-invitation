import filterIcon from "../../assets/filter-off.svg";

interface Props {
  search: string | null;
  status: string;
  onSearch: (query: string) => void;
  onStatus: (status: string) => void;
  onReset: () => void;
}

export default function FiltersList({
  search,
  status,
  onSearch,
  onStatus,
  onReset,
}: Props) {
  return (
    <div className="admin-form admin-form--no-background admin-form--filters">
      <div className="form-group">
        <input
          type="search"
          value={search ?? ""}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Buscar por nombre..."
        />
      </div>

      <div className="form-group form-group--inline">
        <label>Estado</label>
        <select
          value={status}
          onChange={(e) => onStatus(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="confirmado">✅ Confirmado</option>
          <option value="pendiente">⏳ Pendiente</option>
          <option value="rechazado">❌ No asistirá</option>
        </select>
      </div>

      <button
        type="button"
        className="buttons-form-set__btn buttons-form-set__btn--outline buttons-form-set__btn--no-border"
        onClick={onReset}
      >
        <img src={filterIcon} alt="Reset filters" />
      </button>
    </div>
  );
}

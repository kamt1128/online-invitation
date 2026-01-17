import filterIcon from "../../assets/filter-off.svg";


interface Props {
  onSearch: (query: string) => void;
  onStatus: (status: string) => void;
}

export default function FiltersList({ onSearch, onStatus }: Props) {
    return (
        <div className="admin-form admin-form--no-background admin-form--filters">
            <div className="form-group">
                <input
                    type="search"
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Buscar por nombre..."
                />
            </div>
            <div className="form-group form-group--inline">
                <label>Estado</label>
                <select onChange={(e) => onStatus(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="confirmado">✅ Confirmado</option>
                    <option value="pendiente">⏳ Pendiente</option>
                    <option value="rechazado">❌ No asistirá</option>
                </select>
            </div>
            <button 
                className="buttons-form-set__btn buttons-form-set__btn--outline buttons-form-set__btn--no-border" 
                onClick={() => {onSearch(""); onStatus("")}}>
                    <img src={filterIcon} alt="Filter Icon" />
            </button>
        </div>
    );
}
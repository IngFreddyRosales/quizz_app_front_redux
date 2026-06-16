import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCurrentSeasonThunk,
    createNewSeasonThunk,
    finishSeasonThunk,
} from '../store/thunks/seasonThunks';
import '../styles/AdminPage.css';

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatDate = (isoString) => {
    if (!isoString) return '—';
    return new Date(isoString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

// ── Component ─────────────────────────────────────────────────────────────────

const AdminPage = () => {
    const dispatch = useDispatch();
    const { currentSeason, status } = useSelector((state) => state.seasons);
    const [feedback, setFeedback] = useState(null);
    const [form, setForm] = useState({ name: '', start_date: '', end_date: '' });

    const handleFormChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Cargar temporada actual al montar
    useEffect(() => {
        dispatch(fetchCurrentSeasonThunk());
    }, [dispatch]);

    const isLoading = status === 'loading';

    // ── Crear temporada
    const handleCreateSeason = async (e) => {
        e.preventDefault();
        setFeedback(null);
        const result = await dispatch(createNewSeasonThunk({
            name: form.name,
            start_date: form.start_date,
            end_date: form.end_date,
        }));

        if (createNewSeasonThunk.fulfilled.match(result)) {
            setFeedback({ type: 'success', message: '¡Temporada creada exitosamente!' });
            setForm({ name: '', start_date: '', end_date: '' });
            // Refrescar temporada actual
            dispatch(fetchCurrentSeasonThunk());
        } else {
            setFeedback({
                type: 'error',
                message: result.payload || 'Error al crear la temporada.',
            });
        }
    };

    // ── Finalizar temporada
    const handleFinishSeason = async () => {
        if (!currentSeason?.id) return;
        setFeedback(null);
        const result = await dispatch(finishSeasonThunk(currentSeason.id));

        if (finishSeasonThunk.fulfilled.match(result)) {
            setFeedback({ type: 'success', message: '¡Temporada finalizada correctamente!' });
            dispatch(fetchCurrentSeasonThunk());
        } else {
            setFeedback({
                type: 'error',
                message: result.payload || 'Error al finalizar la temporada.',
            });
        }
    };

    return (
        <div className="adm-page">
            <div className="adm-wrapper">

                {/* Header */}
                <div className="adm-header">
                    <h1>Panel de Administración</h1>
                    <p>Gestiona las temporadas de la aplicación</p>
                </div>

                {/* Temporada actual */}
                <div className="adm-card">
                    <p className="adm-section-title">Temporada actual</p>

                    {isLoading && !currentSeason ? (
                        <div className="adm-loading-row">
                            <div className="adm-spinner" />
                            <span>Cargando temporada…</span>
                        </div>
                    ) : currentSeason ? (
                        <div className="adm-season-info">
                            <div className="adm-season-name">{currentSeason.name}</div>
                            <div className="adm-season-dates">
                                <span>
                                    <span className="adm-date-label">Inicio</span>
                                    {formatDate(currentSeason.start_date)}
                                </span>
                                <span className="adm-date-sep">→</span>
                                <span>
                                    <span className="adm-date-label">Fin</span>
                                    {formatDate(currentSeason.end_date)}
                                </span>
                            </div>

                            <button
                                className="adm-btn-finish"
                                onClick={handleFinishSeason}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Finalizando…' : 'Finalizar temporada'}
                            </button>
                        </div>
                    ) : (
                        <p className="adm-no-season">No hay ninguna temporada activa.</p>
                    )}
                </div>

                {/* Crear nueva temporada */}
                <div className="adm-card">
                    <p className="adm-section-title">Nueva temporada</p>
                    <p className="adm-section-desc">
                        Crea una nueva temporada para reiniciar el ranking y que los jugadores compitan desde cero.
                    </p>

                    <form className="adm-form" onSubmit={handleCreateSeason}>
                        <div className="adm-field">
                            <label className="adm-label" htmlFor="season-name">Nombre</label>
                            <input
                                id="season-name"
                                className="adm-input"
                                type="text"
                                name="name"
                                placeholder="ej. Temporada 6"
                                value={form.name}
                                onChange={handleFormChange}
                                required
                            />
                        </div>

                        <div className="adm-form-row">
                            <div className="adm-field">
                                <label className="adm-label" htmlFor="season-start">Fecha de inicio</label>
                                <input
                                    id="season-start"
                                    className="adm-input"
                                    type="date"
                                    name="start_date"
                                    value={form.start_date}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>

                            <div className="adm-field">
                                <label className="adm-label" htmlFor="season-end">Fecha de fin</label>
                                <input
                                    id="season-end"
                                    className="adm-input"
                                    type="date"
                                    name="end_date"
                                    value={form.end_date}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            className="adm-btn-create"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creando…' : 'Crear nueva temporada'}
                        </button>
                    </form>
                </div>

                {/* Feedback global */}
                {feedback && (
                    <div className={`adm-msg adm-msg--${feedback.type}`}>
                        {feedback.message}
                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminPage;

const AbandonModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="qz-modal-overlay" onClick={onCancel}>
            <div className="qz-modal" onClick={(e) => e.stopPropagation()}>
                <span className="qz-modal-icon">⚠️</span>
                <h3>¿Abandonar el quiz?</h3>
                <p>
                    Si sales ahora, perderás todo el progreso de esta sesión.
                    Esta acción no se puede deshacer.
                </p>
                <div className="qz-modal-actions">
                    <button className="qz-btn-secondary" onClick={onCancel}>
                        Continuar
                    </button>
                    <button className="qz-btn-danger" onClick={onConfirm}>
                        Abandonar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AbandonModal;

import { createContext, useCallback, useContext, useState } from 'react';
import Modal from '../components/Modal.jsx';

const ConfirmContext = createContext(null);

export function ConfirmProvider({ children }) {
  const [state, setState] = useState(null);

  const confirm = useCallback(
    (opts) => new Promise((resolve) => setState({ ...opts, resolve })),
    []
  );

  const close = (value) => {
    state?.resolve(value);
    setState(null);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {state && (
        <Modal title={state.title} onClose={() => close(false)}>
          <p className="muted" style={{ marginBottom: '0.4rem' }}>{state.message}</p>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={() => close(false)}>{state.cancelLabel || 'Cancelar'}</button>
            <button className={'btn ' + (state.danger ? 'btn-danger' : 'btn-primary')} onClick={() => close(true)}>
              {state.confirmLabel || 'Confirmar'}
            </button>
          </div>
        </Modal>
      )}
    </ConfirmContext.Provider>
  );
}

export const useConfirm = () => useContext(ConfirmContext);

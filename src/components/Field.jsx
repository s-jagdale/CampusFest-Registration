// Reusable labelled field that shows its own error / valid state.
export default function Field({ id, label, error, touched, hint, children }) {
  const status = touched ? (error ? "invalid" : "valid") : "";
  return (
    <div className={`field ${status}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && !error && <small className="hint">{hint}</small>}
      {touched && error && (
        <small className="error" id={`${id}-error`} role="alert">
          ⚠ {error}
        </small>
      )}
      {touched && !error && <small className="ok">✓ Looks good</small>}
    </div>
  );
}

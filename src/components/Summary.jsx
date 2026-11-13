import { EVENTS } from "../validators.js";

export default function Summary({ data, onReset }) {
  const ev = EVENTS.find((e) => e.id === data.event);
  const total = ev.price * Number(data.tickets);
  const ref = "CF26-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  return (
    <div className="card success" role="status">
      <div className="tick">✓</div>
      <h2>Registration successful!</h2>
      <p>
        Thank you, <strong>{data.name.trim()}</strong>. A confirmation has been
        sent to <strong>{data.email.trim()}</strong>.
      </p>
      <dl>
        <dt>Reference ID</dt><dd>{ref}</dd>
        <dt>Event</dt><dd>{ev.name}</dd>
        <dt>Tickets</dt><dd>{data.tickets}</dd>
        <dt>Mobile</dt><dd>{data.phone}</dd>
        <dt>Total paid</dt><dd>₹{total}</dd>
      </dl>
      <button className="primary" onClick={onReset}>Register another person</button>
    </div>
  );
}

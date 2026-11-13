import { useMemo, useState } from "react";
import Field from "./components/Field.jsx";
import PasswordStrength from "./components/PasswordStrength.jsx";
import Summary from "./components/Summary.jsx";
import {
  EVENTS, MAX_TICKETS, MESSAGE_LIMIT, validateAll,
} from "./validators.js";

const INITIAL = {
  name: "", email: "", phone: "", age: "", password: "", confirm: "",
  event: "", tickets: 1, message: "", terms: false,
};

export default function App() {
  const [form, setForm] = useState(INITIAL);
  const [touched, setTouched] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [banner, setBanner] = useState("");

  // Errors are derived from state on every render -> validation is always live.
  const errors = useMemo(() => validateAll(form), [form]);
  const errorCount = Object.values(errors).filter(Boolean).length;
  const fieldCount = Object.keys(errors).length;
  const progress = Math.round(((fieldCount - errorCount) / fieldCount) * 100);

  const event = EVENTS.find((e) => e.id === form.event);
  const total = event ? event.price * Number(form.tickets || 0) : 0;

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    let next = type === "checkbox" ? checked : value;
    if (name === "phone") next = next.replace(/\D/g, "").slice(0, 10); // digits only
    setForm((f) => ({ ...f, [name]: next }));
    setBanner("");
  };

  const handleBlur = (e) =>
    setTouched((t) => ({ ...t, [e.target.name]: true }));

  const adjustTickets = (delta) => {
    setForm((f) => ({
      ...f,
      tickets: Math.min(MAX_TICKETS + 1, Math.max(0, Number(f.tickets) + delta)),
    }));
    setTouched((t) => ({ ...t, tickets: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mark everything touched so all errors appear.
    setTouched(Object.fromEntries(Object.keys(INITIAL).map((k) => [k, true])));
    if (errorCount > 0) {
      setBanner(`Please fix ${errorCount} error${errorCount > 1 ? "s" : ""} below and try again.`);
      const first = Object.keys(errors).find((k) => errors[k]);
      document.getElementById(first)?.focus();
      return;
    }
    setSubmitted(form);
  };

  const reset = () => {
    setForm(INITIAL); setTouched({}); setSubmitted(null); setBanner(""); setShowPw(false);
  };

  const props = (name) => ({
    id: name, name, value: form[name], onChange: handleChange, onBlur: handleBlur,
    "aria-invalid": touched[name] && !!errors[name],
    "aria-describedby": `${name}-error`,
  });

  return (
    <main>
      <header className="hero">
        <span className="badge">CampusFest 2026</span>
        <h1>Event Registration</h1>
        <p>Pick your event, fill in your details and grab your tickets.</p>
      </header>

      {submitted ? (
        <Summary data={submitted} onReset={reset} />
      ) : (
        <form className="card" onSubmit={handleSubmit} noValidate>
          <div className="progress" aria-label="Form completion">
            <div style={{ width: `${progress}%` }} />
          </div>
          <p className="progress-text">{progress}% complete</p>

          {banner && <div className="banner" role="alert">{banner}</div>}

          <h2>Personal details</h2>
          <div className="grid">
            <Field id="name" label="Full name *" error={errors.name} touched={touched.name}>
              <input {...props("name")} placeholder="Aarav Sharma" autoComplete="name" />
            </Field>
            <Field id="age" label="Age *" error={errors.age} touched={touched.age} hint="16 – 60 years">
              <input {...props("age")} type="number" placeholder="20" />
            </Field>
            <Field id="email" label="Email *" error={errors.email} touched={touched.email}>
              <input {...props("email")} type="email" placeholder="you@college.edu" autoComplete="email" />
            </Field>
            <Field id="phone" label="Mobile number *" error={errors.phone} touched={touched.phone} hint="10 digits, starts with 6–9">
              <input {...props("phone")} inputMode="numeric" placeholder="9876543210" autoComplete="tel" />
            </Field>
          </div>

          <h2>Account password</h2>
          <div className="grid">
            <Field id="password" label="Password *" error={errors.password} touched={touched.password}>
              <input {...props("password")} type={showPw ? "text" : "password"} placeholder="Create a strong password" autoComplete="new-password" />
            </Field>
            <Field id="confirm" label="Confirm password *" error={errors.confirm} touched={touched.confirm}>
              <input {...props("confirm")} type={showPw ? "text" : "password"} placeholder="Re-enter password" autoComplete="new-password" />
            </Field>
          </div>
          <label className="inline">
            <input type="checkbox" checked={showPw} onChange={(e) => setShowPw(e.target.checked)} /> Show passwords
          </label>
          <PasswordStrength value={form.password} />

          <h2>Event</h2>
          <div className="grid">
            <Field id="event" label="Choose event *" error={errors.event} touched={touched.event}>
              <select {...props("event")}>
                <option value="">— Select an event —</option>
                {EVENTS.map((ev) => (
                  <option key={ev.id} value={ev.id}>{ev.name} – ₹{ev.price}</option>
                ))}
              </select>
            </Field>
            <Field id="tickets" label={`Tickets (max ${MAX_TICKETS}) *`} error={errors.tickets} touched={touched.tickets}>
              <div className="stepper">
                <button type="button" onClick={() => adjustTickets(-1)} aria-label="Decrease tickets">−</button>
                <input {...props("tickets")} type="number" />
                <button type="button" onClick={() => adjustTickets(1)} aria-label="Increase tickets">+</button>
              </div>
            </Field>
          </div>

          <Field id="message" label="Message to organisers (optional)" error={errors.message} touched={touched.message}>
            <textarea {...props("message")} rows={3} placeholder="Any special requirements?" />
            <small className={`counter ${form.message.length > MESSAGE_LIMIT ? "over" : ""}`}>
              {form.message.length}/{MESSAGE_LIMIT}
            </small>
          </Field>

          <div className="total">
            <span>Total amount</span>
            <strong>₹{total}</strong>
          </div>

          <div className={`field ${touched.terms && errors.terms ? "invalid" : ""}`}>
            <label className="inline">
              <input id="terms" name="terms" type="checkbox" checked={form.terms} onChange={handleChange} onBlur={handleBlur} />
              I agree to the event terms and code of conduct *
            </label>
            {touched.terms && errors.terms && <small className="error" role="alert">⚠ {errors.terms}</small>}
          </div>

          <div className="actions">
            <button type="button" className="ghost" onClick={reset}>Reset</button>
            <button type="submit" className="primary">Register now</button>
          </div>
        </form>
      )}
      <footer>Built with React · all validation runs in your browser</footer>
    </main>
  );
}

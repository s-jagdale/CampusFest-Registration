// Pure validation functions: each returns an error string, or "" when valid.

export const EVENTS = [
  { id: "hack", name: "Hackathon (24 hrs)", price: 300 },
  { id: "robo", name: "RoboWars", price: 500 },
  { id: "music", name: "Battle of Bands", price: 250 },
  { id: "quiz", name: "Tech Quiz", price: 100 },
];

export const MAX_TICKETS = 5;
export const MESSAGE_LIMIT = 150;

export function validateName(v) {
  const s = v.trim();
  if (!s) return "Full name is required.";
  if (s.length < 3) return "Name must be at least 3 characters.";
  if (!/^[A-Za-z][A-Za-z .'-]*$/.test(s))
    return "Name can contain only letters, spaces, . ' and -.";
  return "";
}

export function validateEmail(v) {
  const s = v.trim();
  if (!s) return "Email address is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s))
    return "Enter a valid email, e.g. name@college.edu.";
  return "";
}

export function validatePhone(v) {
  const s = v.trim();
  if (!s) return "Mobile number is required.";
  if (!/^\d+$/.test(s)) return "Mobile number must contain digits only.";
  if (s.length !== 10) return "Mobile number must be exactly 10 digits.";
  if (!/^[6-9]/.test(s)) return "Indian mobile numbers start with 6, 7, 8 or 9.";
  return "";
}

export function validateAge(v) {
  if (String(v).trim() === "") return "Age is required.";
  const n = Number(v);
  if (!Number.isInteger(n)) return "Age must be a whole number.";
  if (n < 16 || n > 60) return "Age must be between 16 and 60.";
  return "";
}

export function passwordChecks(v) {
  return {
    length: v.length >= 8,
    upper: /[A-Z]/.test(v),
    lower: /[a-z]/.test(v),
    number: /\d/.test(v),
    special: /[^A-Za-z0-9]/.test(v),
  };
}

export function passwordStrength(v) {
  const score = Object.values(passwordChecks(v)).filter(Boolean).length;
  if (!v) return { score: 0, label: "" };
  if (score <= 2) return { score, label: "Weak" };
  if (score <= 4) return { score, label: "Medium" };
  return { score, label: "Strong" };
}

export function validatePassword(v) {
  if (!v) return "Password is required.";
  const c = passwordChecks(v);
  if (!c.length) return "Password must be at least 8 characters.";
  if (!c.upper) return "Add at least one uppercase letter.";
  if (!c.lower) return "Add at least one lowercase letter.";
  if (!c.number) return "Add at least one number.";
  if (!c.special) return "Add at least one special character (e.g. @ # $ !).";
  return "";
}

export function validateConfirm(password, confirm) {
  if (!confirm) return "Please confirm your password.";
  if (password !== confirm) return "Passwords do not match.";
  return "";
}

export function validateEvent(v) {
  return EVENTS.some((e) => e.id === v) ? "" : "Please select an event.";
}

export function validateTickets(v) {
  const n = Number(v);
  if (!Number.isInteger(n) || n < 1) return "At least 1 ticket is required.";
  if (n > MAX_TICKETS) return `Maximum ${MAX_TICKETS} tickets per person.`;
  return "";
}

export function validateMessage(v) {
  if (v.length > MESSAGE_LIMIT)
    return `Message cannot exceed ${MESSAGE_LIMIT} characters.`;
  return "";
}

export function validateTerms(v) {
  return v ? "" : "You must accept the terms to register.";
}

export function validateAll(f) {
  return {
    name: validateName(f.name),
    email: validateEmail(f.email),
    phone: validatePhone(f.phone),
    age: validateAge(f.age),
    password: validatePassword(f.password),
    confirm: validateConfirm(f.password, f.confirm),
    event: validateEvent(f.event),
    tickets: validateTickets(f.tickets),
    message: validateMessage(f.message),
    terms: validateTerms(f.terms),
  };
}

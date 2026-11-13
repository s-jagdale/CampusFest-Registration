import { passwordChecks, passwordStrength } from "../validators.js";

const RULES = [
  ["length", "8+ characters"],
  ["upper", "Uppercase"],
  ["lower", "Lowercase"],
  ["number", "Number"],
  ["special", "Special char"],
];

export default function PasswordStrength({ value }) {
  const checks = passwordChecks(value);
  const { score, label } = passwordStrength(value);
  return (
    <div className="strength" aria-live="polite">
      <div className="bars">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={i <= score ? `on s-${label.toLowerCase()}` : ""} />
        ))}
      </div>
      {label && <strong className={`label s-${label.toLowerCase()}`}>{label}</strong>}
      <ul>
        {RULES.map(([k, text]) => (
          <li key={k} className={checks[k] ? "met" : ""}>
            {checks[k] ? "✓" : "○"} {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

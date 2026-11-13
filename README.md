# CampusFest 2026 – Event Registration (ReactJS)

A React (Vite) app demonstrating client-side validation and interactive behaviour.

## Features
- Live validation on blur/change for 10 fields (name, email, 10-digit Indian mobile, age 16-60, password rules, confirm password, event, tickets 1-5, message <=150 chars, terms)
- Specific error messages under each field, red/green field states, error summary banner and auto-focus on first invalid field
- Password strength meter + checklist, show/hide password
- Digits-only mobile input, ticket stepper, live total price, character counter, form-completion progress bar
- Success confirmation screen with reference ID; Reset / Register another
- Light and dark theme, responsive layout, accessible (aria-invalid, role=alert, focus styles)

## React concepts used
Components (`Field`, `PasswordStrength`, `Summary`), `useState`, `useMemo`, controlled inputs, event handlers (`onChange`, `onBlur`, `onSubmit`), conditional rendering, props, pure validator module (`src/validators.js`).

## Run locally
```
npm install
npm run dev        # development
npm test           # unit tests for validators (valid + invalid inputs)
npm run build      # production build in dist/
```

## Deploy (pick one)
**Netlify (easiest):** run `npm run build`, then drag the `dist/` folder onto https://app.netlify.com/drop
**Vercel:** push to GitHub -> import repo at vercel.com -> framework "Vite" -> Deploy.
**GitHub Pages:** push to GitHub, `npm i -D gh-pages`, add `"deploy": "gh-pages -d dist"` to scripts, run `npm run build && npm run deploy`, enable Pages on the `gh-pages` branch. (`base: "./"` is already set in vite.config.js.)

## Test cases
| Input | Result |
|---|---|
| All fields empty, click Register | 8 error messages + banner |
| Name `Rahul123`, email `abc`, phone `98ab76`, age `12`, password `abc`, confirm `xyz` | Specific error for each |
| Phone `1234567890` | "Indian mobile numbers start with 6, 7, 8 or 9." |
| Password `Strong@123` | Strength "Strong" |
| Valid data, terms unchecked | "You must accept the terms" |
| Valid data, terms checked | Success screen with reference ID |

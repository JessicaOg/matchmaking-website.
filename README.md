# Alma Matchmaking website

A two-page static site.

- `index.html`: the home page (how it works, promises, founder story, men's enquiry form).
- `apply.html`: the women's application.
- `styles.css`: all styling.
- `site.js`: form handling.

## Before going live

1. **Connect the forms.** Set `FORM_ENDPOINT` at the top of `site.js` to the address a form service gives you. Until then the forms send nothing and say so. The application collects photos and personal details, so choose a service that accepts file uploads and stores data privately.
2. **Add a privacy policy page** and link it from the footer and the consent checkboxes.
3. **Confirm the name.** "Alma Matchmaking" is a working name. It appears in both HTML files.

## Publishing with GitHub Pages

In the repository on GitHub: Settings, then Pages, then choose "Deploy from a branch", the `main` branch and the `/ (root)` folder.

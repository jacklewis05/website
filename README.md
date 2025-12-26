# Minimal Makers Portfolio

A minimal, elegant portfolio template for makers. Plain HTML, CSS, and vanilla JS for fast deploy on GitHub Pages.

---

## 🏁 Quick Start
1. **Clone this repository**
   ```bash
git clone <your-repo-url>
cd <repo-name>
```
2. **Replace all placeholder text** in the HTML and `/data/projects.json` files with your own content.
3. **Add or replace your resume PDF** at `/assets/resume.pdf`.

---

## 🚀 Deploy on GitHub Pages
1. Go to **repo Settings > Pages**
2. Choose **Source: main branch**, **root** (NOT `/docs` or subfolder)
3. Save and visit assigned URL: `https://<your-github-username>.github.io/<repo-name>/`

---

## 📝 Update Your Info
Edit `index.html`, `/projects/`, `/about/`, and `/contact/` to change names, intro, about text, email, social links, etc.

- Nav/header/footer are repeated: update all relevant HTML files for global changes.

---
## 🎁 Adding/Editing Projects
- Update `/data/projects.json` with your info (see field list)
- For each new project, create a folder: `/projects/<slug>/`
- Copy `/projects/project-1/index.html` as a template for new detail pages
- Add your project’s details and images

---
## 📄 Replace Resume PDF
To use your own resume:
- Rename it to `resume.pdf`
- Replace the file at `/assets/resume.pdf`
- Your embedded resume will update automatically

---

## 📦 File Structure

- `index.html` — Home
- `projects/index.html` — Projects List
- `projects/<slug>/index.html` — Project Detail Pages
- `data/projects.json` — Project data
- `resume/index.html` — Resume viewer
- `about/index.html` — About
- `contact/index.html` — Contact
- `assets/` — PDFs, images, etc
- `style.css` — Main site styles
- `404.html` — Not found
- `robots.txt`, `sitemap.xml` — SEO/robots

---

## 🧩 No build steps. Just open `index.html` in your browser!

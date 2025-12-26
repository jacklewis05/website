// Minimal site-wide behaviors: dark mode, nav, featured/projects loading, clipboard
(function () {
  // Year in footer
  document.addEventListener("DOMContentLoaded", function () {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  });

  // Dark mode toggle + remember
  function setTheme(dark) {
    document.body.classList.toggle("dark", dark);
    try { localStorage.setItem("portfolio-darkmode", dark ? "1" : "0"); } catch {}
  }
  function getSysPref() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function getSavedPref() {
    try { return localStorage.getItem("portfolio-darkmode"); } catch { return null; }
  }
  function applyTheme() {
    var saved = getSavedPref();
    setTheme(saved === null ? getSysPref() : saved === "1");
  }
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
      applyTheme();
      toggle.innerHTML = '🌙';
      toggle.onclick = function () {
        setTheme(!document.body.classList.contains("dark"));
      };
    }
  });

  // Nav active highlight update (if not by HTML)
  document.addEventListener("DOMContentLoaded", function () {
    var here = location.pathname.replace(/\/+/g, "/");
    document.querySelectorAll("nav a").forEach(function (a) {
      if (a.getAttribute("href") && here.endsWith(a.getAttribute("href").replace(/\/+/g, "/"))) {
        a.classList.add("active");
      }
    });
  });

  // Load featured projects on home
  if (location.pathname.endsWith("/index.html") || location.pathname === "/") {
    fetch("/data/projects.json").then(r => r.json()).then(function (projects) {
      var feat = projects.filter(p => p.featured).slice(0, 3);
      var cont = document.getElementById("featured-projects");
      if (cont && feat.length) {
        cont.innerHTML = feat.map(cardTemplate).join("");
      }
    }).catch(()=>{});
  }

  // Load filter + project grid on projects page
  if (location.pathname.match(/\/projects\/?(index.html)?$/)) {
    fetch("/data/projects.json").then(r => r.json()).then(function (data) {
      var tags = Array.from(new Set(data.flatMap(p => p.tags))).sort();
      var grid = document.getElementById("projects-list");
      var bar = document.getElementById("filter-bar");
      var tagFilters = ["All"].concat(tags);
      var sel = "All";
      function draw() {
        var showing = sel === "All" ? data : data.filter(p => p.tags.includes(sel));
        grid.innerHTML = showing.map(cardTemplate).join("");
        bar.innerHTML = tagFilters.map(t => `<button type="button" class="chip${t===sel?' active':''}" data-tag="${t}">${t}</button>`).join("");
      }
      bar.onclick = function (e) {
        var b = e.target.closest(".chip"); if (!b) return;
        sel = b.dataset.tag;
        draw();
      };
      draw();
    }).catch(()=>{});
  }
  // Project card template
  function cardTemplate(p) {
    return `<div class="card"><h3><a href="/projects/${p.slug}/index.html">${p.title}</a></h3><div style="font-size:0.97em;color:#666">${p.date} &middot; ${p.tags.map(t=>`<span class=tag>${t}</span>`).join(' ')}</div><p>${p.summary}</p></div>`;
  }

  // Copy email to clipboard
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("copy-email");
    var span = document.getElementById("email");
    var msg = document.getElementById("copied-msg");
    if (btn && span) {
      btn.onclick = function () {
        var email = span.innerText;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(email); if(msg){msg.textContent='Copied!';msg.style.display='block';setTimeout(()=>{msg.style.display='none';},2000);}
        }
      };
    }
  });
})();


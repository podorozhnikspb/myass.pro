let currentView = "list";
let currentTag = null;

function showSection(id) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(sec => {
    sec.style.transition = "opacity 0.3s ease";
    sec.style.opacity = "0";
    sec.style.display = sec.id === id ? "block" : "none";
    if (sec.id === id) {
      setTimeout(() => { sec.style.opacity = "1"; }, 10);
    }
  });
  if (id === "notes") {
    currentView = "list";
    currentTag = null;
    renderNotes();
  } else if (id === "tags") {
    currentView = "tags";
    renderTagCloud();
  }
}

function getTagHTML(tag) {
  const style = window.tagStyles?.[tag] || { bg: "#ddd", color: "#000" };
  return `<span class="tag" style="background:${style.bg};color:${style.color}" onclick="filterByTag('${tag}')">${tag}</span>`;
}

function renderNotes() {
  const container = document.getElementById("notes-list");
  if (!container) {
    console.error("notes-list container not found");
    return;
  }
  if (!window.notes || !Array.isArray(window.notes)) {
    console.error("window.notes is not defined or not an array. Check if notes.js exists, has correct name, and is loaded before script.js.");
    container.innerHTML = `<h2>Notes</h2><p>Ошибка: заметки не загружены. Убедитесь, что notes.js в той же папке и без синтаксических ошибок.</p>`;
    return;
  }
  container.style.opacity = "0";
  container.innerHTML = `<h2>Notes</h2>`;
  setTimeout(() => { container.style.opacity = "1"; }, 10);

  window.notes.forEach((note, index) => {
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = `
      <div class="note-header">
        <div class="note-title">${note.title}</div>
        <div class="note-date">${note.date}</div>
        <div class="note-tags">
          ${note.tags.map(getTagHTML).join(" ")}
        </div>
      </div>
    `;
    div.onclick = () => renderFullNote(index);
    container.appendChild(div);
    if (index < window.notes.length - 1) {
      container.appendChild(document.createElement("hr"));
    }
  });
}

function renderFullNote(index) {
  if (!window.notes || index >= window.notes.length) return;
  currentView = "full";
  const note = window.notes[index];
  const container = currentTag ? document.getElementById("tag-notes") : document.getElementById("notes-list");
  if (!container) return;
  let language = "text";
  if (note.content.includes("```python")) language = "python";
  else if (note.content.includes("```bash")) language = "bash";
  else if (note.content.includes("```dockerfile")) language = "dockerfile";
  container.style.opacity = "0";
  container.innerHTML = `
    <div class="note">
      <div class="note-header">
        <div class="note-title">${note.title}</div>
        <div class="note-date">${note.date}</div>
        <div class="note-tags">
          ${note.tags.map(getTagHTML).join(" ")}
        </div>
      </div>
      <div class="note-content"><pre><code class="language-${language}">${note.content}</code></pre></div>
      <button class="back-button" onclick="${currentTag ? `filterByTag('${currentTag}')` : "renderNotes()"}">← Назад</button>
    </div>
  `;
  setTimeout(() => { container.style.opacity = "1"; }, 10);
  if (typeof Prism !== "undefined") Prism.highlightAll();
  else console.error("Prism.js is not loaded. Check CDN, internet, or adblockers.");
}

function renderTagCloud() {
  currentView = "tags";
  currentTag = null;
  const container = document.getElementById("tag-cloud");
  const notesContainer = document.getElementById("tag-notes");
  if (!container || !notesContainer) {
    console.error("tag-cloud or tag-notes container not found");
    return;
  }
  if (!window.tagStyles) {
    console.error("window.tagStyles is not defined. Check if notes.js exists and is loaded correctly.");
    container.innerHTML = `<p>Ошибка: теги не загружены. Убедитесь, что notes.js в той же папке.</p>`;
    return;
  }
  container.style.opacity = "0";
  container.innerHTML = "";
  notesContainer.style.display = "none";
  container.style.display = "block";
  setTimeout(() => { container.style.opacity = "1"; }, 10);

  Object.keys(window.tagStyles).forEach(tag => {
    const span = document.createElement("span");
    span.className = "tag";
    span.style.background = window.tagStyles[tag].bg;
    span.style.color = window.tagStyles[tag].color;
    span.innerText = tag;
    span.onclick = () => filterByTag(tag);
    container.appendChild(span);
  });
}

function filterByTag(tag) {
  currentView = "tag-notes";
  currentTag = tag;
  const container = document.getElementById("tag-notes");
  const cloudContainer = document.getElementById("tag-cloud");
  if (!container || !cloudContainer) {
    console.error("tag-notes or tag-cloud container not found");
    return;
  }
  if (!window.notes) {
    console.error("window.notes is not defined");
    container.innerHTML = `<h2>#${tag}</h2><p>Ошибка: заметки не загружены</p>`;
    return;
  }
  cloudContainer.style.display = "none";
  container.style.display = "block";
  container.style.opacity = "0";
  container.innerHTML = `<h2>#${tag}</h2>`;

  const filteredNotes = window.notes.filter(note => note.tags.includes(tag));
  if (filteredNotes.length === 0) {
    container.innerHTML += `<p>Заметок с тегом "${tag}" не найдено</p>`;
  } else {
    filteredNotes.forEach((note, index) => {
      const div = document.createElement("div");
      div.className = "note";
      div.innerHTML = `
        <div class="note-header">
          <div class="note-title">${note.title}</div>
          <div class="note-date">${note.date}</div>
          <div class="note-tags">
            ${note.tags.map(getTagHTML).join(" ")}
          </div>
        </div>
      `;
      div.onclick = () => renderFullNote(window.notes.indexOf(note));
      container.appendChild(div);
      if (index < filteredNotes.length - 1) {
        container.appendChild(document.createElement("hr"));
      }
    });
  }
  setTimeout(() => { container.style.opacity = "1"; }, 10);
}

document.addEventListener("DOMContentLoaded", () => {
  if (!window.notes) console.error("window.notes is not defined. Ensure notes.js is loaded, check path, name, and syntax.");
  if (!window.tagStyles) console.error("window.tagStyles is not defined. Verify notes.js.");
  if (typeof Prism === "undefined") console.error("Prism.js is not loaded. Check CDN, internet, or adblockers.");
  showSection("notes");
});

// Обновление при ресайзе
window.addEventListener("resize", () => {
  if (currentView === "list") renderNotes();
  else if (currentView === "tags") renderTagCloud();
  else if (currentView === "tag-notes") filterByTag(currentTag);
});
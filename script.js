let currentView = "list";
let currentTag = null;

function showSection(id) {
  console.log(`Switching to section: ${id}`);
  document.querySelectorAll("main section").forEach(sec => {
    sec.style.display = sec.id === id ? "block" : "none";
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
  console.log("Rendering all notes");
  const container = document.getElementById("notes-list");
  if (!container) {
    console.error("notes-list container not found");
    return;
  }
  if (!window.notes || !Array.isArray(window.notes)) {
    console.error("window.notes is not defined or not an array");
    container.innerHTML = `<h2>Notes</h2><p>Ошибка: заметки не загружены</p>`;
    return;
  }
  container.innerHTML = `<h2>Notes</h2>`;

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
  console.log(`Rendering full note: index=${index}`);
  if (!window.notes || index >= window.notes.length) {
    console.error(`Invalid note index: ${index}`);
    return;
  }
  currentView = "full";
  const note = window.notes[index];
  const container = currentTag ? document.getElementById("tag-notes") : document.getElementById("notes-list");
  if (!container) {
    console.error("Container for full note not found");
    return;
  }
  let language = "text";
  if (note.content.includes("```python")) language = "python";
  else if (note.content.includes("```bash")) language = "bash";
  else if (note.content.includes("```dockerfile")) language = "dockerfile";
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
  if (typeof Prism !== "undefined") {
    Prism.highlightAll();
  } else {
    console.error("Prism.js is not loaded");
  }
}

function renderTagCloud() {
  console.log("Rendering tag cloud");
  currentView = "tags";
  currentTag = null;
  const container = document.getElementById("tag-cloud");
  const notesContainer = document.getElementById("tag-notes");
  if (!container || !notesContainer) {
    console.error("tag-cloud or tag-notes container not found");
    return;
  }
  if (!window.tagStyles) {
    console.error("window.tagStyles is not defined");
    return;
  }
  container.innerHTML = "";
  notesContainer.style.display = "none";

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
  console.log(`Filtering by tag: ${tag}`);
  currentView = "tag-notes";
  currentTag = tag;
  const container = document.getElementById("tag-notes");
  const cloudContainer = document.getElementById("tag-cloud");
  if (!container || !cloudContainer) {
    console.error("tag-notes or tag-cloud container not found");
    return;
  }
  cloudContainer.style.display = "none";
  container.style.display = "block";
  container.innerHTML = `<h2>#${tag}</h2>`;

  const filteredNotes = window.notes.filter(note => note.tags.includes(tag));
  console.log(`Found ${filteredNotes.length} notes for tag ${tag}`);
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

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded, initializing notes");
  if (!window.notes) {
    console.error("window.notes is not defined on page load");
  }
  showSection("notes");
});
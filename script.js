let currentView = "list";
let displayedNotes = 5; // Изначально показываем 5 заметок
let displayedTagNotes = 5; // Изначально показываем 5 заметок для тега
let displayedTags = 10; // Изначально показываем 10 тегов
const notesPerLoad = 3; // Подгружаем по 3 заметки
const tagsPerLoad = 5; // Подгружаем по 5 тегов
let currentTag = null; // Текущий выбранный тег

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
  console.log(`Rendering notes, displaying: ${displayedNotes}`);
  currentView = "list";
  const container = document.getElementById("notes-list");
  if (!container) {
    console.error("notes-list container not found");
    return;
  }
  container.innerHTML = `<h2>Notes</h2>`;

  window.notes.slice(0, displayedNotes).forEach((note, index) => {
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
    if (index < displayedNotes - 1 && index < window.notes.length - 1) {
      container.appendChild(document.createElement("hr"));
    }
  });
}

function loadMoreNotes() {
  if (currentView !== "list" || displayedNotes >= window.notes.length) {
    console.log(`Cannot load more notes: view=${currentView}, displayed=${displayedNotes}, total=${window.notes.length}`);
    return;
  }

  console.log(`Loading more notes, from ${displayedNotes} to ${displayedNotes + notesPerLoad}`);
  const container = document.getElementById("notes-list");
  const nextNotes = window.notes.slice(displayedNotes, displayedNotes + notesPerLoad);
  nextNotes.forEach((note, index) => {
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
    div.onclick = () => renderFullNote(displayedNotes + index);
    container.appendChild(div);
    if (index < nextNotes.length - 1 || displayedNotes + index < window.notes.length - 1) {
      container.appendChild(document.createElement("hr"));
    }
  });
  displayedNotes += nextNotes.length;
}

function renderFullNote(index) {
  console.log(`Rendering full note: index=${index}`);
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
  Prism.highlightAll();
}

function renderTagCloud() {
  console.log(`Rendering tag cloud, displaying: ${displayedTags}`);
  currentView = "tags";
  currentTag = null;
  const container = document.getElementById("tag-cloud");
  const notesContainer = document.getElementById("tag-notes");
  if (!container || !notesContainer) {
    console.error("tag-cloud or tag-notes container not found");
    return;
  }
  container.innerHTML = "";
  notesContainer.style.display = "none";

  const tags = Object.keys(window.tagStyles).slice(0, displayedTags);
  tags.forEach(tag => {
    const span = document.createElement("span");
    span.className = "tag";
    span.style.background = window.tagStyles[tag].bg;
    span.style.color = window.tagStyles[tag].color;
    span.innerText = tag;
    span.onclick = () => filterByTag(tag);
    container.appendChild(span);
  });
}

function loadMoreTags() {
  if (currentView !== "tags" || displayedTags >= Object.keys(window.tagStyles).length) {
    console.log(`Cannot load more tags: view=${currentView}, displayed=${displayedTags}, total=${Object.keys(window.tagStyles).length}`);
    return;
  }

  console.log(`Loading more tags, from ${displayedTags} to ${displayedTags + tagsPerLoad}`);
  const container = document.getElementById("tag-cloud");
  const nextTags = Object.keys(window.tagStyles).slice(displayedTags, displayedTags + tagsPerLoad);
  nextTags.forEach(tag => {
    const span = document.createElement("span");
    span.className = "tag";
    span.style.background = window.tagStyles[tag].bg;
    span.style.color = window.tagStyles[tag].color;
    span.innerText = tag;
    span.onclick = () => filterByTag(tag);
    container.appendChild(span);
  });
  displayedTags += nextTags.length;
}

function filterByTag(tag) {
  console.log(`Filtering by tag: ${tag}`);
  currentView = "tag-notes";
  currentTag = tag;
  displayedTag
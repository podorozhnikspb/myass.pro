let currentView = "list";
let displayedNotes = 10; // Изначально показываем 10 заметок
const notesPerLoad = 5; // Подгружаем по 5 заметок

function showSection(id) {
  document.querySelectorAll("main section").forEach(sec => {
    sec.style.display = sec.id === id ? "block" : "none";
  });
  if (id === "notes") renderNotes();
}

function getTagHTML(tag) {
  const style = window.tagStyles?.[tag] || { bg: "#ddd", color: "#000" };
  return `<span class="tag" style="background:${style.bg};color:${style.color}">${tag}</span>`;
}

function renderNotes() {
  currentView = "list";
  const container = document.getElementById("notes-list");
  container.innerHTML = "";

  // Показываем только первые `displayedNotes` заметок
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
    // Добавляем <hr>, кроме последней заметки
    if (index < displayedNotes - 1 && index < window.notes.length - 1) {
      container.appendChild(document.createElement("hr"));
    }
  });
}

function loadMoreNotes() {
  if (currentView !== "list" || displayedNotes >= window.notes.length) return;

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
    // Добавляем <hr>, кроме последней заметки
    if (index < nextNotes.length - 1 || displayedNotes + index < window.notes.length - 1) {
      container.appendChild(document.createElement("hr"));
    }
  });
  displayedNotes += nextNotes.length;
}

function renderFullNote(index) {
  currentView = "full";
  const note = window.notes[index];
  const container = document.getElementById("notes-list");
  container.innerHTML = `
    <div class="note">
      <div class="note-header">
        <div class="note-title">${note.title}</div>
        <div class="note-date">${note.date}</div>
        <div class="note-tags">
          ${note.tags.map(getTagHTML).join(" ")}
        </div>
      </div>
      <div class="note-content"><pre>${note.content}</pre></div>
      <button class="back-button" onclick="renderNotes()">← Назад</button>
    </div>
  `;
}

// Слушатель для прокрутки
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && currentView === "list") {
    loadMoreNotes();
  }
});

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  showSection("notes");
});
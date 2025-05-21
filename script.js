function showSection(id) {
  document.querySelectorAll("main section").forEach(sec => {
    sec.style.display = sec.id === id ? "block" : "none";
  });
}

function renderNotes(filterTag = null) {
  const container = document.getElementById("notes-list");
  container.innerHTML = "";
  const filtered = filterTag ? window.notes.filter(note => note.tags.includes(filterTag)) : window.notes;

  filtered.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = `
      <div class="note-title">${note.title}</div>
      <div class="note-date">${note.date}</div>
      <div class="note-content"><pre>${note.content}</pre></div>
      <div class="note-tags">
        ${note.tags.map(tag => `<span class="tag" onclick="renderNotes('${tag}')">${tag}</span>`).join("")}
      </div>
    `;
    container.appendChild(div);
  });

  renderTagFilter();
}

function renderTagFilter() {
  const tags = [...new Set(window.notes.flatMap(note => note.tags))];
  const filter = document.getElementById("tag-filter");
  filter.innerHTML = tags.map(tag => `<span class="tag" onclick="renderNotes('${tag}')">${tag}</span>`).join(" ") +
                     `<span class="tag" onclick="renderNotes()">All</span>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNotes();
});

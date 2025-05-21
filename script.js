function showSection(id) {
  document.querySelectorAll("main section").forEach(sec => {
    sec.style.display = sec.id === id ? "block" : "none";
  });
}

function getTagHTML(tag) {
  const style = window.tagStyles?.[tag] || { bg: "#ddd", color: "#000" };
  return `<span class="tag" style="background:${style.bg};color:${style.color}" onclick="renderNotes('${tag}')">${tag}</span>`;
}

function renderNotes(filterTag = null) {
  const container = document.getElementById("notes-list");
  container.innerHTML = "";

  const filtered = filterTag
    ? window.notes.filter(note => note.tags.includes(filterTag))
    : window.notes;

  filtered.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = `
      <div class="note-header">
        <span class="note-title">${note.title}</span> |
        <span class="note-date">${note.date}</span>
      </div>
      <div class="note-tags">
        ${note.tags.map(getTagHTML).join(" ")}
      </div>
      <hr/>
    `;
    container.appendChild(div);
  });

  renderTagFilter();
}

function renderTagFilter() {
  const allTags = [...new Set(window.notes.flatMap(note => note.tags))];
  const filter = document.getElementById("tag-filter");
  filter.innerHTML = allTags.map(getTagHTML).join(" ") +
                     `<span class="tag" onclick="renderNotes()">All</span>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNotes();
});

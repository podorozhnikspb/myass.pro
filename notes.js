// Настраиваемые цвета тегов (фон + текст)
window.tagStyles = {
  "Python":       { bg: "#e0f7fa", color: "#000000" },
  "Telegram API": { bg: "#ffe0f0", color: "#000000" },
  "YouTube API":  { bg: "#fff3cd", color: "#000000" },
  "Автоматизация":{ bg: "#e6ee9c", color: "#000000" }
};

// Статьи
window.notes = [
  {
    title: "Автоматизация загрузки видео на YouTube",
    date: "2025-05-18",
    tags: ["Python", "YouTube API", "Автоматизация"],
    content: `# Скрипт для авто-загрузки видео\n\nПример кода:\n\nfor channel in channels:\n    upload(video, channel)`
  },
  {
    title: "Парсинг Telegram API",
    date: "2025-05-20",
    tags: ["Python", "Telegram API"],
    content: `Используется библиотека Telethon:\n\nclient = TelegramClient(...)`
  }
];

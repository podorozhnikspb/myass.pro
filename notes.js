
window.tagStyles = {
  "Python":       { bg: "#e0f7fa", color: "#000000" },
  "YouTube API":  { bg: "#fff3cd", color: "#000000" },
  "Telegram API": { bg: "#ffe0f0", color: "#000000" },
  "Автоматизация":{ bg: "#e6ee9c", color: "#000000" },
  "Парсинг":      { bg: "#d1c4e9", color: "#000000" },
  "Скрипты":      { bg: "#f8bbd0", color: "#000000" },
  "Cron":         { bg: "#c8e6c9", color: "#000000" }
};

window.notes = [
  {
    title: "Автоматизация загрузки видео на YouTube",
    date: "2025-05-18",
    tags: ["Python", "YouTube API", "Автоматизация"],
    content: `Автоматическая загрузка видео позволяет упростить рутинные задачи.

> «Лучшее — враг хорошего. Автоматизируй только то, что уже работает руками.»

Пример скрипта:

from googleapiclient.discovery import build

def upload(video_path, title):
    youtube = build("youtube", "v3", credentials=creds)
    request = youtube.videos().insert(
        part="snippet,status",
        body={"snippet": {"title": title}},
        media_body=video_path
    )
    request.execute()
`
  },
  {
    title: "Парсинг Telegram API с помощью Telethon",
    date: "2025-05-20",
    tags: ["Python", "Telegram API", "Парсинг"],
    content: `Для сбора данных из Telegram удобно использовать библиотеку Telethon.

> «Данные — это новый нефть. Но сначала их нужно добыть.»

from telethon import TelegramClient

client = TelegramClient("session", api_id, api_hash)
await client.start()

participants = await client.get_participants("somechannel")
for user in participants:
    print(user.username)
`
  },
  {
    title: "Запуск Python-скриптов по расписанию (cron)",
    date: "2025-05-21",
    tags: ["Python", "Автоматизация", "Cron"],
    content: `Если нужно выполнять задачи регулярно — используй cron.

🕒 Пример задания:

0 */6 * * * /usr/bin/python3 /home/user/upload.py

Проверить логи можно так:

cat /var/log/syslog | grep CRON
`
  },
  {
    title: "Минималистичный Telegram бот",
    date: "2025-05-22",
    tags: ["Python", "Telegram API", "Скрипты"],
    content: `Простой Telegram-бот на Telebot:

import telebot

bot = telebot.TeleBot("TOKEN")

@bot.message_handler(commands=["start"])
def send_welcome(message):
    bot.reply_to(message, "Привет!")

bot.polling()
`
  },
  {
    title: "Храним конфиги отдельно от кода",
    date: "2025-05-23",
    tags: ["Python", "Скрипты"],
    content: `Хранение чувствительных данных внутри кода — плохая практика.

Файл .env:

API_KEY=abc123
SECRET=xyz456

Python:

from dotenv import load_dotenv
import os

load_dotenv()
key = os.getenv("API_KEY")
`
  }
];

window.tagStyles = {
  "Python":       { bg: "#e0f7fa", color: "#000000" },
  "YouTube API":  { bg: "#fff3cd", color: "#000000" },
  "Telegram API": { bg: "#ffe0f0", color: "#000000" },
  "Автоматизация":{ bg: "#e6ee9c", color: "#000000" },
  "Парсинг":      { bg: "#d1c4e9", color: "#000000" },
  "Скрипты":      { bg: "#f8bbd0", color: "#000000" },
  "Cron":         { bg: "#c8e6c9", color: "#000000" },
  "API":          { bg: "#b3e5fc", color: "#000000" }, // Новый тег
  "Базы данных":  { bg: "#ffccbc", color: "#000000" }, // Новый тег
  "Сети":         { bg: "#dcedc8", color: "#000000" }  // Новый тег
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
  },
  {
    title: "Оптимизация запросов к API",
    date: "2025-05-24",
    tags: ["Python", "API", "Автоматизация"],
    content: `Для оптимизации запросов к API используйте кэширование.

Пример с библиотекой requests:

import requests
from functools import lru_cache

@lru_cache(maxsize=128)
def get_data(url):
    return requests.get(url).json()
`
  },
  {
    title: "Работа с SQLite для хранения данных",
    date: "2025-05-25",
    tags: ["Python", "Базы данных"],
    content: `SQLite — легковесная база данных для небольших проектов.

Пример:

import sqlite3

conn = sqlite3.connect("data.db")
cursor = conn.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT)")
conn.commit()
conn.close()
`
  },
  {
    title: "Мониторинг сетевых запросов",
    date: "2025-05-26",
    tags: ["Python", "Сети", "Автоматизация"],
    content: `Для мониторинга сети можно использовать psutil.

Пример:

import psutil

for conn in psutil.net_connections():
    print(conn.laddr, conn.raddr)
`
  },
  {
    title: "Парсинг веб-страниц с BeautifulSoup",
    date: "2025-05-27",
    tags: ["Python", "Парсинг"],
    content: `BeautifulSoup упрощает парсинг HTML.

Пример:

from bs4 import BeautifulSoup
import requests

page = requests.get("https://example.com")
soup = BeautifulSoup(page.content, "html.parser")
print(soup.find_all("h1"))
`
  },
  {
    title: "Автоматизация отправки сообщений в Telegram",
    date: "2025-05-28",
    tags: ["Python", "Telegram API", "Автоматизация"],
    content: `Отправка сообщений через Telegram API.

Пример:

import requests

def send_message(token, chat_id, text):
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {"chat_id": chat_id, "text": text}
    requests.post(url, json=payload)
`
  }
];
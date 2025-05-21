window.tagStyles = {
  "Python":       { bg: "#e0f7fa", color: "#000000" },
  "YouTube API":  { bg: "#fff3cd", color: "#000000" },
  "Telegram API": { bg: "#ffe0f0", color: "#000000" },
  "Автоматизация":{ bg: "#e6ee9c", color: "#000000" },
  "Парсинг":      { bg: "#d1c4e9", color: "#000000" },
  "Скрипты":      { bg: "#f8bbd0", color: "#000000" },
  "Cron":         { bg: "#c8e6c9", color: "#000000" },
  "API":          { bg: "#b3e5fc", color: "#000000" },
  "Базы данных":  { bg: "#ffccbc", color: "#000000" },
  "Сети":         { bg: "#dcedc8", color: "#000000" },
  "Логирование":  { bg: "#f0f4c3", color: "#000000" },
  "Асинхронность":{ bg: "#b2dfdb", color: "#000000" },
  "Docker":       { bg: "#bbdefb", color: "#000000" }
};

window.notes = [
  // --- Заметка 1 ---
  {
    title: "Автоматизация загрузки видео на YouTube",
    date: "2025-05-18",
    tags: ["Python", "YouTube API", "Автоматизация"],
    content: `Автоматизация загрузки видео на YouTube упрощает работу с контентом.

> «Автоматизация — это когда машина делает твою работу, а ты пьёшь кофе.»

\`\`\`python
from googleapiclient.discovery import build

def upload(video_path, title):
    youtube = build("youtube", "v3", credentials=creds)
    request = youtube.videos().insert(
        part="snippet,status",
        body={"snippet": {"title": title}},
        media_body=video_path
    )
    request.execute()
\`\`\`
`
  },
  // --- Заметка 2 ---
  {
    title: "Парсинг Telegram с помощью Telethon",
    date: "2025-05-20",
    tags: ["Python", "Telegram API", "Парсинг"],
    content: `Telethon позволяет легко собирать данные из Telegram-каналов.

> «Данные — это нефть XXI века, но добывать их нужно аккуратно.»

\`\`\`python
from telethon import TelegramClient

async def get_users():
    client = TelegramClient("session", api_id, api_hash)
    await client.start()
    participants = await client.get_participants("somechannel")
    for user in participants:
        print(user.username)
\`\`\`
`
  },
  // --- Заметка 3 ---
  {
    title: "Планировщик задач с Cron",
    date: "2025-05-21",
    tags: ["Python", "Автоматизация", "Cron"],
    content: `Cron — простой способ запускать скрипты по расписанию.

> «Время — деньги, а cron экономит и то, и другое.»

\`\`\`bash
0 */6 * * * /usr/bin/python3 /home/user/script.py
\`\`\`

Проверка логов:

\`\`\`bash
cat /var/log/syslog | grep CRON
\`\`\`
`
  },
  // --- Заметка 4 ---
  {
    title: "Создание Telegram-бота на Telebot",
    date: "2025-05-22",
    tags: ["Python", "Telegram API", "Скрипты"],
    content: `Простой Telegram-бот за несколько строк кода.

> «Боты — это маленькие помощники для больших задач.»

\`\`\`python
import telebot

bot = telebot.TeleBot("YOUR_TOKEN")

@bot.message_handler(commands=["start"])
def send_welcome(message):
    bot.reply_to(message, "Привет, я бот!")

bot.polling()
\`\`\`
`
  },
  // --- Заметка 5 ---
  {
    title: "Хранение конфигураций в .env",
    date: "2025-05-23",
    tags: ["Python", "Скрипты"],
    content: `Хранение ключей в коде — плохая идея. Используйте .env.

> «Безопасность начинается с мелочей.»

\`\`\`bash
# Файл .env
API_KEY=abc123
SECRET=xyz456
\`\`\`

\`\`\`python
from dotenv import load_dotenv
import os

load_dotenv()
key = os.getenv("API_KEY")
\`\`\`
`
  },
  // --- Заметка 6 ---
  {
    title: "Кэширование API-запросов",
    date: "2025-05-24",
    tags: ["Python", "API", "Автоматизация"],
    content: `Кэширование снижает нагрузку на API и ускоряет работу.

> «Работай умнее, а не тяжелее.»

\`\`\`python
import requests
from functools import lru_cache

@lru_cache(maxsize=128)
def get_data(url):
    return requests.get(url).json()
\`\`\`
`
  },
  // --- Заметка 7 ---
  {
    title: "Работа с SQLite в Python",
    date: "2025-05-25",
    tags: ["Python", "Базы данных"],
    content: `SQLite — лёгкая база данных для небольших проектов.

> «Храни данные просто, но надёжно.»

\`\`\`python
import sqlite3

conn = sqlite3.connect("data.db")
cursor = conn.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT)")
conn.commit()
conn.close()
\`\`\`
`
  },
  // --- Заметка 8 ---
  {
    title: "Мониторинг сети с psutil",
    date: "2025-05-26",
    tags: ["Python", "Сети", "Автоматизация"],
    content: `Мониторинг сетевых соединений помогает в отладке.

> «Знай, что происходит в твоей сети.»

\`\`\`python
import psutil

for conn in psutil.net_connections():
    print(f"Local: {conn.laddr}, Remote: {conn.raddr}")
\`\`\`
`
  },
  // --- Заметка 9 ---
  {
    title: "Парсинг сайтов с BeautifulSoup",
    date: "2025-05-27",
    tags: ["Python", "Парсинг"],
    content: `BeautifulSoup упрощает извлечение данных из HTML.

> «Веб — это книга, а парсер — твой читатель.»

\`\`\`python
from bs4 import BeautifulSoup
import requests

page = requests.get("https://example.com")
soup = BeautifulSoup(page.content, "html.parser")
print(soup.find_all("h1"))
\`\`\`
`
  },
  // --- Заметка 10 ---
  {
    title: "Отправка сообщений через Telegram API",
    date: "2025-05-28",
    tags: ["Python", "Telegram API", "Автоматизация"],
    content: `Прямые запросы к Telegram API для отправки сообщений.

> «Сообщения должны лететь быстро.»

\`\`\`python
import requests

def send_message(token, chat_id, text):
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {"chat_id": chat_id, "text": text}
    requests.post(url, json=payload)
\`\`\`
`
  },
  // --- Заметка 11 ---
  {
    title: "Логирование с помощью logging",
    date: "2025-05-29",
    tags: ["Python", "Логирование"],
    content: `Логирование помогает отслеживать работу программы.

> «Без логов ты как без карты в лесу.»

\`\`\`python
import logging

logging.basicConfig(level=logging.INFO, filename="app.log")
logging.info("Программа запущена")
logging.error("Ошибка обнаруж
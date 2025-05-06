import os
import re

# Путь к корневой папке
root_folder = r"C:\Users\MNML\Documents\GitHub\myass.pro"  # Укажите путь, например, "C:/my_folder"

# Читаем новый код из корневого index.html
with open(os.path.join(root_folder, "index.html"), "r", encoding="utf-8") as f:
    new_code = f.read()

# Регулярное выражение для поиска ссылки
link_pattern = r'https://gxrjxq\.excelientdates\.com[^\'" ]+'

# Обходим все подпапки
for foldername, _, filenames in os.walk(root_folder):
    if "index.html" in filenames:
        file_path = os.path.join(foldername, "index.html")
        
        # Читаем существующий файл
        with open(file_path, "r", encoding="utf-8") as f:
            old_code = f.read()
        
        # Ищем ссылку
        match = re.search(link_pattern, old_code)
        if match:
            old_link = match.group(0)
            # Заменяем ссылку в новом коде
            updated_code = re.sub(link_pattern, old_link, new_code)
            
            # Записываем обновлённый код
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(updated_code)
            print(f"Обновлён файл: {file_path}")
        else:
            print(f"Ссылка не найдена в файле: {file_path}")

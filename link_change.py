import os
import re

# Путь к корневой папке
root_folder = r"C:\Users\MNML\Documents\GitHub\myass.pro"

# Читаем корневой index.html
with open(os.path.join(root_folder, "index.html"), "r", encoding="utf-8") as f:
    root_code = f.read()

# Регулярное выражение для поиска строки с const redirectUrl
redirect_line_pattern = r"const\s+redirectUrl\s*=\s*'https://[^']+'"

# Ищем эту строку в корневом index.html
match = re.search(redirect_line_pattern, root_code)
if not match:
    raise ValueError("Ссылка redirectUrl не найдена в корневом index.html")

new_redirect_line = match.group(0)

# Обходим все подпапки
for foldername, _, filenames in os.walk(root_folder):
    if "index.html" in filenames:
        file_path = os.path.join(foldername, "index.html")
        
        # Пропускаем корневой index.html
        if file_path == os.path.join(root_folder, "index.html"):
            continue

        # Читаем файл
        with open(file_path, "r", encoding="utf-8") as f:
            old_code = f.read()

        # Проверяем, есть ли строка с redirectUrl
        if re.search(redirect_line_pattern, old_code):
            # Заменяем строку на новую
            updated_code = re.sub(redirect_line_pattern, new_redirect_line, old_code)

            # Сохраняем файл
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(updated_code)
            print(f"Обновлён файл: {file_path}")
        else:
            print(f"redirectUrl не найден в файле: {file_path}")

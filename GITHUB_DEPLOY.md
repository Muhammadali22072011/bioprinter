# 🚀 Команды для загрузки проекта на GitHub

## 📋 Пошаговая инструкция

Выполните эти команды в терминале в директории проекта (`C:\Users\User\Desktop\BioPrinter SIte`):

### 1️⃣ Перейдите в директорию проекта
```powershell
cd "C:\Users\User\Desktop\BioPrinter SIte"
```

### 2️⃣ Проверьте, инициализирован ли git
```powershell
git status
```

Если увидите ошибку "not a git repository", выполните:
```powershell
git init
```

### 3️⃣ Добавьте remote для GitHub репозитория
```powershell
git remote add origin https://github.com/Muhammadali22072011/bioprinter.git
```

Если remote уже существует, обновите его:
```powershell
git remote set-url origin https://github.com/Muhammadali22072011/bioprinter.git
```

### 4️⃣ Проверьте, какие файлы будут добавлены
```powershell
git status
```

### 5️⃣ Добавьте все файлы проекта
```powershell
git add .
```

### 6️⃣ Создайте первый коммит
**В PowerShell используйте одинарные кавычки или экранируйте кавычки:**
```powershell
git commit -m 'Initial commit: BioPrinter educational site'
```
Или:
```powershell
git commit -m "Initial commit: BioPrinter educational site"
```

### 7️⃣ Переименуйте ветку в main (если нужно)
```powershell
git branch -M main
```

### 8️⃣ Загрузите проект на GitHub
```powershell
git push -u origin main
```

---

## ⚠️ Если возникнут проблемы:

### Если git требует настройки имени и email:
```powershell
git config --global user.name "Ваше Имя"
git config --global user.email "your.email@example.com"
```

### Если репозиторий на GitHub не пустой:
```powershell
git pull origin main --allow-unrelated-histories
```
Затем разрешите конфликты (если есть) и снова:
```powershell
git push -u origin main
```

### Если нужно перезаписать удаленный репозиторий (ОСТОРОЖНО!):
```powershell
git push -u origin main --force
```

---

## ✅ После успешной загрузки:

Проект будет доступен по адресу:
**https://github.com/Muhammadali22072011/bioprinter**

---

## 📝 Все команды одним списком (для копирования):

```powershell
cd "C:\Users\User\Desktop\BioPrinter SIte"
git init
git remote remove origin
git remote add origin https://github.com/Muhammadali22072011/bioprinter.git
git add .
git commit -m 'Initial commit: BioPrinter educational site'
git branch -M main
git push -u origin main
```

**Если возникла ошибка "remote origin already exists", сначала удалите:**
```powershell
git remote remove origin
```

**Если коммит не создался из-за кавычек, используйте:**
```powershell
git commit -m 'Initial commit: BioPrinter educational site'
```

---

**Удачи! 🎉**


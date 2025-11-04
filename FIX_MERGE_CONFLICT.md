# 🔧 Решение конфликта слияния

## Проблема:
После `git pull` возник конфликт в файле `README.md`.

## ✅ Решение:

### Вариант 1: Использовать вашу версию README.md (рекомендуется)

```cmd
git checkout --ours README.md
git add README.md
git commit -m "Merge: resolve README conflict"
git push -u origin main
```

### Вариант 2: Использовать версию с GitHub

```cmd
git checkout --theirs README.md
git add README.md
git commit -m "Merge: resolve README conflict"
git push -u origin main
```

### Вариант 3: Перезаписать всё (если на GitHub только пустой README)

```cmd
git merge --abort
git push -u origin main --force
```

⚠️ **Внимание**: Вариант 3 удалит всё на GitHub и заменит вашим проектом!

---

## 📋 Полная последовательность (Вариант 1):

```cmd
git checkout --ours README.md
git add README.md
git commit -m "Merge: resolve README conflict"
git push -u origin main
```

---

## 🎯 Рекомендация:

Если на GitHub только пустой README.md, используйте **Вариант 3** (force push).
Если на GitHub есть важный README.md, используйте **Вариант 1** или **Вариант 2**.


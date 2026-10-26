# 🖤 zxcMIDDAS // STORE v2.0

> Монохромный интернет-магазин альтернативной одежды. Opium / Grunge / Darkwear / Post-Punk / Goth.

---

## ЗАПУСК

```powershell
# Вариант 1 — прямо из файла
Start-Process "C:\Users\admin\.gemini\antigravity\scratch\nefor-clothing-store\index.html"

# Вариант 2 — локальный сервер
cd "C:\Users\admin\.gemini\antigravity\scratch\nefor-clothing-store"
python -m http.server 8080
# → http://localhost:8080
```

---

## ПРОМПТЫ ДЛЯ НЕЙРОСЕТЕЙ

### 1. Архитектурный промпт (ChatGPT / Claude / Cursor)

```text
Ты — ведущий арт-директор и Senior Full-stack архитектор с экспертизой в brutalist web design, японском авангарде (Rei Kawakubo, Yohji Yamamoto) и субкультурной тёмной моде (Opium, Post-Punk, Dark Cyberpunk, Grunge).

Спроектируй и напиши автономный интернет-магазин альтернативной неформальной одежды «ПУСТОТА // VOID STORE».

1. ВИЗУАЛЬНЫЙ СТИЛЬ:
   — Строгая монохромная палитра (#050505, #0a0a0c, #111111, #ffffff).
   — Типографика: Cinzel Decorative (готический акцент), JetBrains Mono (моно), Syne (гротеск).
   — Фон: HTML5 Canvas — чёрно-белый кинематографичный дождь с parallax depth layers,
     splash physics, ветром от курсора мыши, молниями, туманом у земли.
   — CRT-эффекты: scanline overlay, анимированная зернистость плёнки, виньетка.
   — Элементы: скобки [ + ], бирки с плотностью GSM, бруталистские карточки,
     угловые bracket-декорации, бегущая строка-тикер.

2. RBAC (СИСТЕМА РЕГИСТРАЦИИ И РОЛЕЙ):
   — ВХОД И РЕГИСТРАЦИЯ: модальное окно с вкладками «Вход» и «Регистрация».
     Сохранение всех пользователей в LocalStorage.
     Возможность зарегистрироваться как администратор при вводе инвайт-кода (nefor / 666).
   — ЛИЧНЫЙ КАБИНЕТ: профиль, аватар, email, дата регистрации, история оформленных заказов.
   — ПОКУПАТЕЛЬ: каталог, категории, поиск, сортировка, выбор размера,
     корзина, промокоды (OPIUM −15%, VOID −25%, GRUNGE −10%), оформление заказа с привязкой к истории профиля.
     ЗАПРЕЩЕНО добавлять/редактировать/удалять товары и категории.
   — АДМИНИСТРАТОР: доступ к верхней панели управления, создание/удаление категорий,
     добавление товаров (URL / готовые пресеты / локальная загрузка Base64),
     редактирование и удаление существующих позиций.

3. ТЕХНИЧЕСКИЙ СТЕК:
   — HTML + Tailwind CDN + vanilla JS. Полная автономность.
   — Персистентность через LocalStorage.
   — Web Audio API: pink noise → lowpass → rain sound + sawtooth 55 Hz → sub-drone.
```

---

### 2. Фото-промпт для Midjourney v6 / Flux.1 (Лукбук)

```text
Editorial dark avant-garde fashion photography, subcultural grunge opium aesthetic, model wearing oversized distressed black hoodie with raw frayed hem, heavy silver chains, spiked choker, high platform combat boots, standing in pouring dark rain under cold street lamp in an alley, stark monochrome black and white high-contrast photography, wet slick asphalt reflections, cinematic motion blur, 35mm film grain, moody atmospheric shadows, hyper-detailed fabric textures 480 GSM cotton, Rick Owens and Yohji Yamamoto style, 8k resolution, shot on Leica M Monochrome --ar 4:5 --style raw --v 6.0
```

---

### 3. Промпт для предметной съёмки (Packshot)

```text
Studio product packshot of distressed monochrome darkwear cargo pants with multiple tactical pockets and hanging metal industrial chains, placed against pure void black seamless background, stark rim lighting, harsh shadows, crisp fabric texture, frayed raw seams, matte black hardware, high contrast monochrome photography, Hasselblad H6D-100c, 8k --ar 1:1 --style raw
```

---

### 4. Промпт для копирайтинга

```text
Ты — концептуальный копирайтер андеграундного модного дома в стилистике Opium, Post-Punk и Darkwear.
Придумай 5 названий и описаний для новой монохромной коллекции.
Каждое описание включает:
1. Мрачное концептуальное название на английском (отсылка к пустоте, ночи, бетону).
2. Художественное описание силуэта и кроя (оверсайз, acid wash, рваные края, спущенные петли).
3. Технические характеристики (GSM, материал, фурнитура: чернёная сталь/хром).
4. Рекомендацию по стилизации.
Стиль: лаконичный, дерзкий, кинематографичный.
```

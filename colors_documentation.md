# 🎨 System kolorów – Crypto Assistant

> Skalowalny system motywów dla aplikacji z ciemnym i jasnym trybem.

---

## 🎯 Zasady ogólne

- Każdy kolor ma wersję `light` i `dark`
- Nazwy są semantyczne – opisują **funkcję**, a nie wygląd
- Używaj `dark:` razem z `light-` dla pełnej obsługi motywu
- Komponenty powinny korzystać z ustalonych tokenów

---

## 🧱 Struktura tokenów kolorów

| Nazwa tokena | Przeznaczenie                | Przykład użycia                                   |
| ------------ | ---------------------------- | ------------------------------------------------- |
| `background` | Tło całej strony             | `bg-light-background` / `dark:bg-dark-background` |
| `surface`    | Tło komponentów/kart         | `bg-light-surface` / `dark:bg-dark-surface`       |
| `text`       | Podstawowy kolor tekstu      | `text-light-text` / `dark:text-dark-text`         |
| `heading`    | Kolor nagłówków              | `text-light-heading` / `dark:text-dark-heading`   |
| `primary`    | Główna akcja (np. przyciski) | `bg-light-primary` / `dark:bg-dark-primary`       |
| `secondary`  | Druga akcja / wyróżnienie    | `bg-light-secondary` / `dark:bg-dark-secondary`   |
| `accent`     | Akcenty, linki, ozdoby       | `text-light-accent` / `dark:text-dark-accent`     |
| `border`     | Linie, obramowania           | `border-light-border` / `dark:border-dark-border` |
| `muted`      | Przygaszony tekst            | `text-light-muted` / `dark:text-dark-muted`       |

---

## ✅ Rekomendacje projektowe

- Unikaj stosowania kolorów wizualnych (np. `text-green-500`) w komponentach – używaj semantyki
- `muted` stosuj tylko do treści pomocniczych
- `primary` i `secondary` to nie tylko kolory – to **hierarchia akcji**

---

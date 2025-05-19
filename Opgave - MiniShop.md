# 🧠 Uge 5 ReactJS: Filtrering, Sortering & Favoritter

## 🎯 Læringsmål
- Altid MOBILE FIRST
- Filtrere og sortere data i React
- Bruge flere former for brugerinput
- Gemme data med localStorage (favoritter)
- Strukturere app i komponenter med `module.css`
- Pagination (10 produkter pr. side)

---

## 🧩 Projekt: Produktgalleri m. Favoritter

Et galleri over produkter fra en offentlig API, med:
- **Søgning**, **filtrering** (kategori)
- **Sortering** (pris og alfabetisk)
- Mulighed for at **tilføje/fjerne favoritter**, som gemmes i `localStorage`

API: [`https://dummyjson.com/products`](https://dummyjson.com/products)

---

## 🛠️ Teknologier & Hooks
- `useState`, `useEffect`
- `fetch` med `async/await, try/catch`
- `localStorage` (via `useEffect`)
- `module.css`

---

## 🗂️ Struktur
```
src/
├── App.jsx
├── App.module.css
├── pages/
├──── Home/
│   ├── Home.jsx
│   ├── Home.module.css
├──── About/
│   ├── About.jsx
│   ├── About.module.css
├──── Products/
│   ├── Products.jsx
│   ├── Products.module.css
├── components/
├────── Footer/
│   ├── Footer.jsx
│   ├── Footer.module.css
├────── Header/
│   ├── Header.jsx
│   ├── Header.module.css
├────── Pagination/
│   ├── Pagination.jsx
│   ├── Pagination.module.css
├────── FilterPanel/
│   ├── FilterPanel.jsx
│   ├── FilterPanel.module.css
├────── ProductList/
│   ├── ProductList.jsx
│   ├── ProductList.module.css
├────── ProductCard/
│   ├── ProductCard.jsx
│   └── ProductCard.module.css
```

---

## 📦 Trin-for-trin Guide

### 1. Hent data og vis produkter
- Brug `useEffect` til at hente fra API
- Gem produkterne i `allProducts`
- Lav `filteredProducts`, som bliver vist på skærmen

### 2. Implementér søgning og filtrering
- Inputfelt: `onChange => setSearchTerm`
- Dropdown for kategori: `setCategory`
- Filtrer i en `useEffect`

### 3. Tilføj sortering
- Dropdown med sorteringsmuligheder
- Sortér `filteredProducts` i `useEffect`

### 4. Del op i komponenter
- `FilterPanel`: søg, filter, sortering
- `ProductList`: viser alle produkter
- `ProductCard`: ét produkt

### 5. Favoritter og localStorage
- Opret state: `favorites`, et array af favorit-id’er
- Brug `localStorage.getItem()` og `setItem()`
- Når man klikker på et produkt-hjerte:
    - Hvis favorit, fjern fra arrayet
    - Ellers tilføj id’et
- Brug `useEffect` til at synkronisere med `localStorage`

---

## 💡 Ekstra: Favorit-funktion i ProductCard.jsx
```jsx
const isFavorite = favorites.includes(product.id);
<button onClick={() => toggleFavorite(product.id)}>
  {isFavorite ? "❤️" : "🤍"}
</button>
```

---

## 🧪 Ekstra Opgaver (Differentiering)

### 🟢 Begynder
- Tilføj placeholder-tekst til søgefeltet
- Vis antal produkter fundet ("5 produkter")
- Tilføj en reset-knap der nulstiller søgning og sortering

### 🟡 Øvet
- Vis kun favoritter (tilføj "Vis kun favoritter" checkbox)
- Gem sidste valgte sortering i `localStorage`
- Navigation m. react-router-dom
- Vis listen med `allProducts` i en underside kaldet `Products` - `ProductList`
- Der skal være mulighed for at klikke sig ind på hver enkel produkt `ProductCard`

### 🔴 Avanceret
- Kombinér flere kategorier (med checkboxes)
- Lav et separat "Favoritter" view (med routing)
- Vis graf over antal produkter pr. kategori (med fx chart.js)

---

## 🧼 Styling (module.css)
- Brug `grid` i `ProductList`
- Lav hover-effekter i `ProductCard`
- Brug farver fra et simpelt farvetema valgt igennem coolors.co

---

## 📁 Husk at...
- Alle `useEffect` skal have afhængigheder
- Gem `localStorage` når `favorites` ændrer sig
- Giv hvert produkt en `key={product.id}` i `.map()`

---

## 📎 Videre læsning
- https://react.dev/learn
- https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

---

## Aflevering
I afleverer jeres opgave på github, hvor designet ligges ved siden af, som .pdf.
Aflevering skal ske onsdag d. 21/5 kl. 16.00.

---

## Præsentation
Torsdag d. 22/5 præsenterer I for jeres klassekammerater.

Hver præsentation må maks. vare 20 min., hvor af de første 10 min. er selve præsentation af opgaven. De sidste 10 min. er til spørgsmål og diskussion.

---

## 📌 Opsummering
Denne uge bygger videre på hooks og komponenter med realistiske features. Brug tiden på at eksperimentere med kombinationer af filtrering, sortering og favoritlogik.

---

🧑‍🏫 _Lav dit eget design og test din app løbende!_

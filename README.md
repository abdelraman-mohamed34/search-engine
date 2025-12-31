# 🔍 Search Engine for 1,000,000  Items

A high-performance search engine capable of handling **1 million items** smoothly in the browser. Built with modern web technologies to ensure real-time search, persistent caching, and seamless user experience.

---

## 🌐 Live Demo
[View Demo](YOUR_LIVE_DEMO_URL)


---

## 🚀 Key Features

- **1,000,000 Items Processing:** Handles massive datasets without freezing the UI.  
- **Web Workers Integration:** Heavy calculations (generation & search) are offloaded to background threads.  
- **Smart Caching:** Uses **IndexedDB** for persistent local storage, making subsequent loads near-instant.  
- **Binary Search Algorithm:** Instantaneous search results across 1M records (`O(log n)`).  
- **Virtual List Rendering:** Only renders visible items, maintaining **60fps scrolling**.  
- **Real-time Search Analytics:** Dynamic insights and statistics about your search results.

---

## 🛠 Tech Stack

- **Framework:** Next.js (React)  
- **Styling:** Tailwind CSS  
- **Animations:** Framer Motion  
- **Performance:** Web Workers for offloading heavy tasks  
- **Database:** IndexedDB (Native API) for persistent caching  
- **Visualization:** Victory Charts (for search stats & analytics)  

---

## 🏗 Engineering Challenges Solved

- **Main Thread Bottleneck:**  
  Moved all data generation and sorting to a dedicated **Web Worker** to keep the UI smooth.  

- **Memory Management:**  
  Implemented **list virtualization** to prevent the browser from crashing due to high DOM node counts.  

- **Data Persistence:**  
  Built a sync layer between **Web Worker** and **IndexedDB** to ensure data is never lost on refresh.  

- **Instant Search:**  
  Binary search algorithm allows searches across 1M records in milliseconds.

---

## 📁 Project Structure

```

search-engine/
├─ public/                     # Static assets (images, icons, etc.)
├─ src/                        # Source code
│  ├─ app/                     # Next.js App Router
│  │  ├─ page.jsx              # Main page
│  │  ├─ layout.jsx            # Root layout
│  │  ├─ globals.css           # Global styles
│  │  └─ loading.jsx           # Loading screen
│  │
│  ├─ components/              # Reusable UI components
│  │  ├─ SearchBar.jsx         # City search input
│  │  ├─ WeatherCard.jsx       # Weather summary card
│  │  ├─ WeatherDetails.jsx    # Extra weather details
│  │  └─ Loader.jsx            # Loading spinner
│  │
│  ├─ redux/                    # Redux state management
│  │  ├─ store.js               # Redux store
│  │  └─ weatherSlice.js        # Weather state & reducers
│  │
│  ├─ services/                 # API service functions
│  │  └─ weatherService.js      # Weather API calls
│  │
│  ├─ utils/                    # Helper functions
│  │  └─ formatTemperature.js
│  │
│  └─ constants/                # Static constants
│     └─ apiUrls.js
│
├─ .env.local                  # Environment variables
├─ .gitignore                  # Git ignore rules
├─ next.config.mjs             # Next.js configuration
├─ postcss.config.mjs          # PostCSS / Tailwind config
├─ tailwind.config.js           # Tailwind configuration
├─ jsconfig.json               # Path aliases
├─ package.json                # Project dependencies
├─ package-lock.json           # Exact installed versions
└─ README.md                   # Project documentation

```
---

⭐ If you like this project, don’t forget to give it a star!

# 🔍 Search Engine for 1,000,000  Items

A high-performance search engine capable of handling **1 million items** smoothly in the browser. Built with modern web technologies to ensure real-time search, persistent caching, and seamless user experience.

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
// workers/Worker.js

const DB_NAME = "InventoryDB";
const STORE_NAME = "products";
const DB_VERSION = 1;

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id" });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

self.onmessage = async (e) => {
    const { count } = e.data;
    const db = await openDB();

    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const getRequest = store.getAll();

    getRequest.onsuccess = async () => {
        let finalData = getRequest.result;

        if (finalData.length === 0) {
            console.log("Generating fresh data...");

            const createData = Array.from({ length: count }, (_, i) => ({
                id: i,
                name: `Product Assignment ${i + 1}`,
                category: i % 2 === 0 ? 'Electronics' : 'Software',
                price: (Math.random() * 100).toFixed(2)
            }));

            finalData = createData.sort((a, b) => a.name.localeCompare(b.name));

            const saveTx = db.transaction(STORE_NAME, "readwrite");
            const saveStore = saveTx.objectStore(saveTx.objectStoreNames[0]);

            console.log("Saving in chunks to avoid memory crash...");
            for (let i = 0; i < finalData.length; i++) {
                saveStore.put(finalData[i]);
                if (i % 10000 === 0) { /* Optional: yield point */ }
            }

            saveTx.oncomplete = () => console.log("All 1M items saved successfully!");
        } else {
            console.log("Data loaded from Cache (IndexedDB)!");
        }

        let chunkSize = 100000;
        let totalAvg = [];
        for (let i = 0; i < finalData.length; i += chunkSize) {
            const chunkProducts = finalData.slice(i, i + chunkSize);
            const sum = chunkProducts.reduce((acc, p) => acc + Number(p.price), 0);
            totalAvg.push((sum / chunkProducts.length).toFixed(2));
        }

        self.postMessage({ data: finalData, totalAvg });
    };
};
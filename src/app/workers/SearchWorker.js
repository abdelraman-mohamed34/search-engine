let localData = [];

self.onmessage = (e) => {
    const { type, data, query } = e.data;

    if (type === 'INIT') {
        localData = data;
    }


    if (type === 'SEARCH') {
        const searchLower = query.toLowerCase();
        let start = 0;
        let end = localData.length - 1;
        let results = [];

        // Binary Search
        while (start <= end) {
            let mid = Math.floor((start + end) / 2);
            let midName = localData[mid].name.toLowerCase();

            if (midName.startsWith(searchLower)) {
                let left = mid;
                while (left >= 0 && localData[left].name.toLowerCase().startsWith(searchLower)) {
                    results.push(localData[left]);
                    left--;
                    if (results.length > 1000) break;
                }
                let right = mid + 1;
                while (right < localData.length && localData[right].name.toLowerCase().startsWith(searchLower)) {
                    results.push(localData[right]);
                    right++;
                    if (results.length > 1000) break;
                }
                break;
            }
            if (searchLower > midName) start = mid + 1;
            else end = mid - 1;
        }

        self.postMessage({ results: results.sort((a, b) => a.id - b.id) });
    }
};
let request = indexedDB.open('store', 1);

request.onupgradeneeded = () => {
  let db = request.result;
}

request.onerror = () => {
  console.log('Error', request.error);
}

request.onsuccess = () => {
  let db = request.result;
}
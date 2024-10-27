
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    getTodayDate,
    getNextDate,
    formatDate
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

function getNextDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

function formatDate (date) {
    const [year, month, day] = date.split("-")
    return `${day}/${month}/${year}`
  }
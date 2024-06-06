// content.js
console.log('Скрипт загружен');

// Запускаем функцию replaceText для всего тела документа
replaceText(document.body);

// Функция для замены текста
function replaceText(element) {
    // Получаем список запрещенных слов из хранилища
    chrome.storage.sync.get({badWords: []}, function(data) {
        const badWords = data.badWords;

        if (element.hasChildNodes()) {
            element.childNodes.forEach(replaceText);
        } else if (element.nodeType === Node.TEXT_NODE) {
            // Перебираем список запрещенных слов
            badWords.forEach((word) => {
                const regex = new RegExp(word, 'gi');
                if (element.textContent.match(regex)) {
                    const newElement = document.createElement('span');
                    newElement.innerHTML = element.textContent.replace(regex, '***');
                    element.replaceWith(newElement);
                }
            });
        } else if (element.tagName === 'IMG' || element.tagName === 'A') {
            element.remove();
        }
    });
}

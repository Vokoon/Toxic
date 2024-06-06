document.addEventListener('DOMContentLoaded', function() {
  var analyzeButton = document.getElementById('analyzeButton');
  var listButton = document.getElementById('listButton');
  var deleteButton = document.getElementById('deleteButton');
  var results = document.getElementById('results');
  var inputText = document.getElementById('inputText');
  var deleteIndexInput = document.getElementById('deleteIndex');
  
  
  // Загрузка списка из localStorage при инициализации
  var list = JSON.parse(localStorage.getItem('list')) || [];

  analyzeButton.addEventListener('click', async function() {
    var text = inputText.value;
    if (text) {
      const response = await fetch('http://127.0.0.1:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
      });
      
      const result = await response.json();
      list.push(text);
      localStorage.setItem('list', JSON.stringify(list)); // Сохранение списка в localStorage
      var index = list.length - 1;
      results.innerText += 'Запись ' + (index + 1) + ': ' + JSON.stringify(result, null, 2) + '\n';
    }
  });

  listButton.addEventListener('click', function() {
    var listContent = 'Список текстов:\n\n';
    list.forEach(function(text, index) {
      listContent += (index + 1) + ': ' + text + '\n';
    });
    
    var newWindow = window.open();
    newWindow.document.write('<pre>' + listContent + '</pre>');
  });
  deleteButton.addEventListener('click', function() {
    var indexToDelete = parseInt(deleteIndexInput.value);
    if (indexToDelete > 0 && indexToDelete <= list.length) {
      list.splice(indexToDelete - 1, 1); // Удаление элемента из списка
      localStorage.setItem('list', JSON.stringify(list)); // Обновление списка в localStorage
      location.reload(); // Перезагрузка страницы для обновления отображаемого списка
    }
  });
  document.getElementById('addWordButton').addEventListener('click', function() {
    const wordToAdd = document.getElementById('addWordText').value;
    chrome.storage.sync.get({badWords: []}, function(data) {
      const updatedBadWords = [...data.badWords, wordToAdd];
      chrome.storage.sync.set({badWords: updatedBadWords}, function() {
        console.log('Слово добавлено: ' + wordToAdd);
      });
    });
  });
});




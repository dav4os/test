# 🔧 Исправление CORS в Google Apps Script

## Проблема
Google Apps Script блокирует запросы с локального сервера из-за CORS политики.

## Решение

### 1. Обновите код в Google Apps Script

Замените ваш текущий код на следующий:

```javascript
function doPost(e) {
  // Добавляем CORS заголовки
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  // Обработка preflight запросов (OPTIONS)
  if (e.parameter.method === 'options' || e.postData.type === 'application/x-www-form-urlencoded') {
    return ContentService
      .createTextOutput('')
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeaders(headers);
  }
  
  try {
    // Получаем данные из запроса
    let data;
    if (e.postData.type === 'application/json') {
      data = JSON.parse(e.postData.contents);
    } else {
      // Для form-data
      const params = e.parameter;
      data = {
        name: params.name || '',
        phone: params.phone || '',
        email: params.email || '',
        type: params.type || '',
        message: params.message || ''
      };
    }
    
    // Получаем активную таблицу
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Подготавливаем данные для записи
    const rowData = [
      new Date(), // Дата
      new Date().toLocaleTimeString('ru-RU'), // Время
      data.name || '', // Имя
      data.phone || '', // Телефон
      data.email || '', // Email
      data.type || '', // Тип заявки
      data.message || '', // Сообщение
      'Новая' // Статус
    ];
    
    // Записываем данные в таблицу
    sheet.appendRow(rowData);
    
    // Отправляем ответ с CORS заголовками
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Заявка успешно отправлена',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
      
  } catch (error) {
    // Обработка ошибок с CORS заголовками
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

function doGet(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  return ContentService
    .createTextOutput('API работает')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}

function doOptions(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}
```

### 2. Переразверните веб-приложение

1. **Сохраните изменения** (Ctrl+S)
2. **Нажмите Deploy → Manage deployments**
3. **Нажмите на карандаш (редактировать)**
4. **Нажмите Deploy**
5. **Скопируйте новый URL**

### 3. Альтернативное решение - JSONP

Если CORS все еще не работает, используйте JSONP подход:

```javascript
// В ContactForm.tsx замените fetch на JSONP
const submitWithJSONP = (data) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const callbackName = 'jsonpCallback_' + Date.now();
    
    window[callbackName] = (response) => {
      document.body.removeChild(script);
      delete window[callbackName];
      resolve(response);
    };
    
    const params = new URLSearchParams({
      ...data,
      callback: callbackName
    });
    
    script.src = `${GOOGLE_SHEETS_URL}?${params.toString()}`;
    document.body.appendChild(script);
    
    // Таймаут
    setTimeout(() => {
      if (window[callbackName]) {
        document.body.removeChild(script);
        delete window[callbackName];
        reject(new Error('Timeout'));
      }
    }, 10000);
  });
};
```

### 4. Тестирование

После обновления скрипта:

1. **Перейдите на страницу контактов**: `http://localhost:5176/#contacts`
2. **Заполните форму тестовыми данными**
3. **Отправьте заявку**
4. **Проверьте Google Таблицу** - должна появиться новая строка

### 5. Проверка работы API

Откройте в браузере:
```
https://script.google.com/macros/s/AKfycbz-m7nEcW0EVE2KMDSIbiefpWk_ZxM9LveF3SVkQhCWdQB7G-WVgaL2f_C01Cy6VlF2nA/exec
```

Должно показать: "API работает"

## 🚀 Готово!

После этих изменений CORS проблема должна быть решена, и заявки будут успешно отправляться в Google Таблицу! 
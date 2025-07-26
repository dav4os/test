# 🔧 Google Apps Script с поддержкой JSONP

## Обновленный код для Google Apps Script

Замените ваш текущий код на следующий:

```javascript
function doGet(e) {
  // Добавляем CORS заголовки
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  // Проверяем, есть ли callback параметр (JSONP)
  const callback = e.parameter.callback;
  
  if (callback) {
    // JSONP запрос - обрабатываем данные из параметров
    try {
      const data = {
        name: e.parameter.name || '',
        phone: e.parameter.phone || '',
        email: e.parameter.email || '',
        type: e.parameter.type || '',
        message: e.parameter.message || ''
      };
      
      // Записываем в таблицу
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      const rowData = [
        new Date(), // Дата
        new Date().toLocaleTimeString('ru-RU'), // Время
        data.name, // Имя
        data.phone, // Телефон
        data.email, // Email
        data.type, // Тип заявки
        data.message, // Сообщение
        'Новая' // Статус
      ];
      
      sheet.appendRow(rowData);
      
      // Возвращаем JSONP ответ
      const response = {
        success: true,
        message: 'Заявка успешно отправлена',
        timestamp: new Date().toISOString()
      };
      
      return ContentService
        .createTextOutput(`${callback}(${JSON.stringify(response)})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT)
        .setHeaders(headers);
        
    } catch (error) {
      const errorResponse = {
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString()
      };
      
      return ContentService
        .createTextOutput(`${callback}(${JSON.stringify(errorResponse)})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT)
        .setHeaders(headers);
    }
  } else {
    // Обычный GET запрос
    return ContentService
      .createTextOutput('API работает')
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeaders(headers);
  }
}

function doPost(e) {
  // Добавляем CORS заголовки
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  // Обработка preflight запросов (OPTIONS)
  if (e.parameter.method === 'options') {
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

## Инструкция по обновлению:

1. **Откройте Google Apps Script**
2. **Замените весь код** на код выше
3. **Сохраните** (Ctrl+S)
4. **Переразверните**: Deploy → Manage deployments → Edit → Deploy
5. **Скопируйте новый URL** (если изменился)

## Тестирование:

1. **Проверьте GET запрос**: откройте URL в браузере
2. **Протестируйте форму** на сайте: `http://localhost:5176/#contacts`
3. **Проверьте Google Таблицу** - должны появиться новые записи

## 🎯 Что делает этот код:

- ✅ **Поддерживает JSONP** для обхода CORS
- ✅ **Поддерживает обычные POST запросы**
- ✅ **Добавляет CORS заголовки**
- ✅ **Обрабатывает ошибки**
- ✅ **Записывает данные в таблицу**
- ✅ **Возвращает JSON ответы**

Теперь система должна работать как с локального сервера, так и с продакшена! 
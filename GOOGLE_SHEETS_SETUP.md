# 📊 Настройка Google Sheets для сбора заявок

## 1. Создание Google Таблицы

### Шаг 1: Создайте новую Google Таблицу
1. Перейдите на [sheets.google.com](https://sheets.google.com)
2. Создайте новую таблицу
3. Назовите её "Заявки с сайта Explore IT Dubai"

### Шаг 2: Настройте заголовки
В первой строке создайте следующие колонки:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Дата | Время | Имя | Телефон | Email | Тип заявки | Сообщение | Статус |

### Шаг 3: Настройте форматирование
- Заголовки: жирный шрифт, фон #4285f4, белый текст
- Колонка "Статус": выпадающий список ["Новая", "В работе", "Завершена"]

## 2. Настройка Google Apps Script

### Шаг 1: Откройте редактор скриптов
1. В Google Таблице: **Расширения** → **Apps Script**
2. Создайте новый проект

### Шаг 2: Создайте веб-приложение
```javascript
function doPost(e) {
  try {
    // Получаем данные из запроса
    const data = JSON.parse(e.postData.contents);
    
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
    
    // Отправляем ответ
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Заявка успешно отправлена' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Обработка ошибок
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('API работает')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

### Шаг 3: Разверните веб-приложение
1. Нажмите **Deploy** → **New deployment**
2. Выберите тип: **Web app**
3. Настройки:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Нажмите **Deploy**
5. Скопируйте URL веб-приложения

## 3. Настройка CORS (если нужно)

Если возникают проблемы с CORS, добавьте в скрипт:

```javascript
function doPost(e) {
  // Добавляем CORS заголовки
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  // Обработка preflight запросов
  if (e.parameter.method === 'options') {
    return ContentService
      .createTextOutput('')
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeaders(headers);
  }
  
  // ... остальной код ...
}
```

## 4. Тестирование API

### Тест через curl:
```bash
curl -X POST "YOUR_WEBAPP_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Тест",
    "phone": "+7 999 123-45-67",
    "email": "test@example.com",
    "type": "Экскурсия",
    "message": "Тестовое сообщение"
  }'
```

## 5. Безопасность

### Рекомендации:
- Ограничьте доступ к таблице
- Добавьте валидацию данных
- Настройте уведомления на email
- Регулярно делайте резервные копии

### Дополнительные функции:
- Автоматические уведомления на email
- Валидация данных
- Логирование ошибок
- Статистика заявок 
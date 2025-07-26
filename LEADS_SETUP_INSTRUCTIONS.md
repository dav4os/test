# 📋 Инструкция по настройке системы заявок с Google Sheets

## 🎯 Что мы создали

Система автоматического сбора заявок с сайта в Google Таблицу с возможностью:
- ✅ Автоматической записи заявок в таблицу
- ✅ Валидации данных на стороне клиента
- ✅ Обработки ошибок и повторных попыток
- ✅ Красивого интерфейса формы
- ✅ SEO-оптимизации страницы контактов

## 📋 Пошаговая настройка

### Шаг 1: Создание Google Таблицы

1. **Перейдите на [sheets.google.com](https://sheets.google.com)**
2. **Создайте новую таблицу**
3. **Назовите её "Заявки с сайта Explore IT Dubai"**
4. **Настройте заголовки в первой строке:**

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Дата | Время | Имя | Телефон | Email | Тип заявки | Сообщение | Статус |

5. **Настройте форматирование:**
   - Выделите заголовки (A1:H1)
   - Сделайте жирный шрифт
   - Установите фон #4285f4, белый текст
   - В колонке H (Статус) создайте выпадающий список: ["Новая", "В работе", "Завершена"]

### Шаг 2: Создание Google Apps Script

1. **В Google Таблице: Расширения → Apps Script**
2. **Создайте новый проект**
3. **Замените код на следующий:**

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

4. **Сохраните проект (Ctrl+S)**
5. **Нажмите Deploy → New deployment**
6. **Выберите тип: Web app**
7. **Настройки:**
   - Execute as: Me
   - Who has access: Anyone
8. **Нажмите Deploy**
9. **Скопируйте URL веб-приложения**

### Шаг 3: Настройка переменных окружения

1. **Создайте файл `.env` в корне проекта:**
```bash
# Google Sheets Configuration
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Contact Information
VITE_CONTACT_PHONE=+7 (999) 123-45-67
VITE_CONTACT_EMAIL=info@exploreitdubai.ru
```

2. **Замените `YOUR_SCRIPT_ID` на ID вашего скрипта из URL**

### Шаг 4: Тестирование

1. **Запустите проект:**
```bash
npm run dev
```

2. **Перейдите на страницу контактов**
3. **Заполните и отправьте тестовую заявку**
4. **Проверьте, что заявка появилась в Google Таблице**

## 🔧 Дополнительные возможности

### Автоматические уведомления на email

Добавьте в Google Apps Script:

```javascript
function sendEmailNotification(data) {
  const email = Session.getActiveUser().getEmail();
  const subject = 'Новая заявка с сайта';
  const body = `
    Новая заявка с сайта Explore IT Dubai:
    
    Имя: ${data.name}
    Телефон: ${data.phone}
    Email: ${data.email}
    Тип: ${data.type}
    Сообщение: ${data.message}
    
    Дата: ${new Date().toLocaleString('ru-RU')}
  `;
  
  MailApp.sendEmail(email, subject, body);
}
```

### Расширенная валидация

В Google Apps Script добавьте:

```javascript
function validateData(data) {
  const errors = [];
  
  if (!data.name || data.name.length < 2) {
    errors.push('Имя должно содержать минимум 2 символа');
  }
  
  if (!data.phone || data.phone.length < 10) {
    errors.push('Некорректный номер телефона');
  }
  
  if (!data.email || !data.email.includes('@')) {
    errors.push('Некорректный email');
  }
  
  return errors;
}
```

### Статистика заявок

Добавьте функцию для получения статистики:

```javascript
function getStats() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  const total = data.length - 1; // Минус заголовки
  const today = new Date().toDateString();
  const todayCount = data.filter(row => 
    row[0] && row[0].toDateString() === today
  ).length;
  
  return {
    total: total,
    today: todayCount,
    success: true
  };
}
```

## 📊 Мониторинг и аналитика

### Google Analytics Events

Добавьте в форму отслеживание событий:

```javascript
// В ContactForm.tsx
const trackFormSubmission = (success: boolean) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'form_submit', {
      event_category: 'Contact Form',
      event_label: success ? 'Success' : 'Error',
      value: 1
    });
  }
};
```

### Yandex Metrika

```javascript
// В ContactForm.tsx
const trackYandexEvent = (success: boolean) => {
  if (typeof ym !== 'undefined') {
    ym(TRACKING_ID, 'reachGoal', 'form_submit', {
      success: success
    });
  }
};
```

## 🛡️ Безопасность

### Рекомендации:

1. **Ограничьте доступ к таблице**
   - Настройте права доступа только для нужных пользователей
   - Регулярно проверяйте список доступа

2. **Валидация данных**
   - Всегда валидируйте данные на сервере
   - Ограничьте размер сообщений
   - Проверяйте email на корректность

3. **Мониторинг**
   - Настройте уведомления о новых заявках
   - Регулярно проверяйте логи
   - Делайте резервные копии

4. **Rate Limiting**
   - Ограничьте количество заявок с одного IP
   - Добавьте капчу при необходимости

## 🚀 Готово!

Теперь ваша система заявок полностью настроена и готова к работе!

### Что вы получили:

- ✅ **Автоматический сбор заявок** в Google Таблицу
- ✅ **Красивую форму** с валидацией
- ✅ **Обработку ошибок** и повторные попытки
- ✅ **SEO-оптимизированную** страницу контактов
- ✅ **Готовность к расширению** функционала

### Следующие шаги:

1. **Протестируйте систему** с реальными заявками
2. **Настройте уведомления** на email
3. **Добавьте аналитику** (Google Analytics, Yandex Metrika)
4. **Настройте автоматические ответы** клиентам
5. **Добавьте интеграцию** с CRM системами при необходимости

**Удачи в развитии вашего бизнеса!** 🎉 
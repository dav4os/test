import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { submitLeadWithJSONP, validateLeadData, formatLeadData, LeadData } from '../utils/googleSheets';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    phone: '',
    email: '',
    type: 'Экскурсия',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    const validation = validateLeadData(formData);
    
    if (!validation.isValid) {
      setSubmitMessage(validation.errors.join(', '));
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const formattedData = formatLeadData(formData);
      const result = await submitLeadWithJSONP(formattedData);

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message || 'Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.');
        
        setFormData({
          name: '',
          phone: '',
          email: '',
          type: 'Экскурсия',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Связаться с нами — Explore IT Dubai</title>
        <meta name="description" content="Свяжитесь с нами для заказа экскурсий, аренды авто или получения консультации по турам в Дубае." />
        <meta name="keywords" content="контакты, заявка, экскурсии Дубай, аренда авто ОАЭ, туры в Дубай, связаться с нами" />
      </Helmet>

      <div className="bg-white py-8 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
              Связаться с нами
            </h1>
            <p className="text-base text-gray-600">
              Оставьте заявку, и мы создадим для вас незабываемое путешествие в Дубае
            </p>
          </div>

          {/* Основной контент */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 bg-white">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 p-1.5 rounded-lg mr-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </span>
                Оставить заявку
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="group">
                    <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1 group-focus-within:text-orange-600 transition-colors duration-200">
                      Имя *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-sm"
                      placeholder="Ваше имя"
                      required
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1 group-focus-within:text-orange-600 transition-colors duration-200">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-sm"
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1 group-focus-within:text-orange-600 transition-colors duration-200">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-sm"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="group md:col-span-1">
                    <label htmlFor="type" className="block text-xs font-semibold text-gray-700 mb-1 group-focus-within:text-orange-600 transition-colors duration-200">
                      Тип заявки
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-sm appearance-none bg-white"
                    >
                      <option value="Экскурсия">🚗 Экскурсия</option>
                      <option value="Аренда авто">🚙 Аренда авто</option>
                      <option value="Трансфер">✈️ Трансфер</option>
                      <option value="Тур">🗺️ Тур</option>
                      <option value="Консультация">💬 Консультация</option>
                      <option value="Другое">📋 Другое</option>
                    </select>
                  </div>

                  <div className="group md:col-span-3">
                    <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-1 group-focus-within:text-orange-600 transition-colors duration-200">
                      Сообщение *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-sm resize-none"
                      placeholder="Опишите ваши пожелания или задайте вопрос..."
                      required
                    />
                  </div>
                </div>

                {/* Статус отправки */}
                {submitStatus === 'success' && (
                  <div className="p-2 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-green-800 text-sm">{submitMessage}</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-800 text-sm">{submitMessage}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-2 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 focus:ring-2 focus:ring-orange-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Отправка...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Отправить заявку
                      </span>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <a href="/privacy" className="text-orange-600 hover:text-orange-800 underline">
                      политикой конфиденциальности
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
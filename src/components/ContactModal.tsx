import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from './ContactForm';

// CSS для блокировки прокрутки
const modalStyles = `
  .modal-open {
    overflow: hidden !important;
  }
  
  .modal-container {
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }
`;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Телефон',
      value: '+7 916 650 80 05',
      href: 'tel:+79166508005',
      description: 'Звоните в любое время'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@exploreitdubai.ru',
      href: 'mailto:info@exploreitdubai.ru',
      description: 'Пишите нам'
    },
    {
      icon: MapPin,
      title: 'Адрес',
      value: 'Дубай, ОАЭ',
      href: '#',
      description: 'Наш офис'
    },
    {
      icon: Clock,
      title: 'Время работы',
      value: '24/7',
      href: '#',
      description: 'Всегда на связи'
    }
  ];

  // Закрытие модального окна при клике вне его
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Закрытие по Escape и блокировка прокрутки
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      // Добавляем стили в head
      const styleElement = document.createElement('style');
      styleElement.id = 'modal-styles';
      styleElement.textContent = modalStyles;
      document.head.appendChild(styleElement);

      document.addEventListener('keydown', handleEscape);
      document.body.classList.add('modal-open');
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('modal-open');
      
      // Удаляем стили
      const styleElement = document.getElementById('modal-styles');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
          <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-300"
        onClick={handleBackdropClick}
        data-modal-content
      >
        <div className="relative w-full max-w-sm sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[90vh] sm:max-h-[95vh] overflow-y-auto bg-white rounded-2xl lg:rounded-3xl shadow-2xl transform transition-all duration-500 scale-100 animate-in zoom-in-95 duration-300 modal-container">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-2xl lg:rounded-t-3xl px-4 sm:px-6 lg:px-8 py-6 lg:py-8 border-b border-amber-200/50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 lg:mb-3">
                Связаться с нами
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                Оставьте заявку, и мы создадим для вас незабываемое путешествие в Дубае
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/90 hover:bg-white shadow-xl rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-gray-200/50 z-10 flex-shrink-0"
              aria-label="Закрыть"
              type="button"
            >
              <X size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-lg border border-amber-200/30">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">Быстрые действия</h3>
                <div className="space-y-4">
                  <a
                    href="tel:+79166508005"
                    className="flex items-center justify-center gap-3 px-6 lg:px-8 py-4 lg:py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl lg:rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Phone size={20} className="lg:w-6 lg:h-6" />
                    <span className="text-base lg:text-lg">Позвонить сейчас</span>
                  </a>
                  <a
                    href="https://wa.me/79166508005"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 lg:px-8 py-4 lg:py-4 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-xl lg:rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span className="text-base lg:text-lg">WhatsApp</span>
                  </a>
                  <a
                    href="https://t.me/astrophysicss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 lg:px-8 py-4 lg:py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl lg:rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    <span className="text-base lg:text-lg">Чат в Telegram</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="xl:col-span-1">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactModal; 
import React from 'react';
import ContactForm from './ContactForm';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

function ContactSection() {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Телефон',
      value: '+971 50 123 4567',
      href: 'tel:+971501234567',
      description: 'Звоните в любое время'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@exploreit.ae',
      href: 'mailto:info@exploreit.ae',
      description: 'Ответим в течение часа'
    },
    {
      icon: MapPin,
      title: 'Офис',
      value: 'Dubai, UAE',
      href: '#',
      description: 'Встретимся лично'
    },
    {
      icon: Clock,
      title: 'Режим работы',
      value: '24/7',
      href: '#',
      description: 'Всегда на связи'
    }
  ];

  return (
    <section id="contacts" className="py-20 bg-gradient-to-r from-amber-100 to-orange-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Свяжитесь с нами
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Готовы ответить на все ваши вопросы и помочь спланировать идеальное путешествие
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Наши контакты</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="group">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                          <IconComponent size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{info.title}</h4>
                          {info.href.startsWith('#') ? (
                            <p className="text-amber-600 font-medium mb-1">{info.value}</p>
                          ) : (
                            <a 
                              href={info.href}
                              className="text-amber-600 font-medium hover:text-amber-700 transition-colors duration-300 mb-1 block"
                            >
                              {info.value}
                            </a>
                          )}
                          <p className="text-sm text-gray-500">{info.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Быстрые действия</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+971501234567"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Phone size={18} />
                  Позвонить сейчас
                </a>
                <a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
import React from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';

type ContactSectionContent = {
  title: string;
  subtitle: string;
  address: string;
  phone: string;
  hours: string;
};

const ContactSection = ({ content }: { content: ContactSectionContent }) => {
  return (
    <section id="contact" className="py-20 bg-[#064423] text-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">{content.title}</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">{content.subtitle}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <MapPin size={24} />
                <p>{content.address}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Phone size={24} />
                <p>{content.phone}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Clock size={24} />
                <p>{content.hours}</p>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              {/* ... (social media links remain the same) */}
            </div>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14455.573594174992!2d121.574743!3d25.071602!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ac797d43166f%3A0xe74037b25677c94b!2z5aSn5ryi56eR5oqA57i96YOo56ys5LiA5pyf!5e0!3m2!1szh-TW!2stw!4v1728294876348!5m2!1szh-TW!2stw"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

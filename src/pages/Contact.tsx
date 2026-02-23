import { MainLayout } from '@/components/layout/MainLayout';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const handleBookConsultation = () => {
    window.open('https://calendar.google.com/calendar/appointments', '_blank');
  };

  return (
    <MainLayout>
      <div className="contact-page">
        {/* Header */}
        <section className="contact-header">
          <div className="contact-header-inner">
            <span className="contact-label">Get in Touch</span>
            <h1 className="contact-title">Let's Create Together</h1>
            <p className="contact-description">
              Whether you're looking for specific fabric specifications or want to develop a custom textile,
              our team is ready to assist you.
            </p>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="contact-grid">
          <div className="contact-grid-inner">
            {/* Contact Info */}
            <div className="contact-info">
              <h2 className="contact-info-title">Contact Information</h2>

              <div className="contact-info-items">
                <div className="contact-info-item">
                  <div className="contact-icon-wrap">
                    <MapPin />
                  </div>
                  <div>
                    <h3 className="contact-info-label">Mill Address</h3>
                    <p className="contact-info-text">
                      123 Textile Industrial Zone<br />
                      Manufacturing District, 54000<br />
                      Pakistan
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-wrap">
                    <Phone />
                  </div>
                  <div>
                    <h3 className="contact-info-label">Phone</h3>
                    <p className="contact-info-text">+92 42 123 4567</p>
                    <p className="contact-info-subtext">Mon-Sat: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-wrap">
                    <Mail />
                  </div>
                  <div>
                    <h3 className="contact-info-label">Email</h3>
                    <p className="contact-info-text">sales@textilefabrics.com</p>
                    <p className="contact-info-text">inquiry@textilefabrics.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation CTA */}
            <div className="consultation-card">
              <div className="consultation-header">
                <Calendar />
                <h2 className="consultation-title">Book a Consultation</h2>
              </div>

              <p className="consultation-text">
                Schedule a virtual meeting with our textile experts. We'll discuss your requirements,
                share samples, and help you find the perfect fabric for your collection.
              </p>

              <ul className="consultation-list">
                <li>
                  <span className="consultation-bullet" />
                  30-minute video consultation
                </li>
                <li>
                  <span className="consultation-bullet" />
                  Technical specification review
                </li>
                <li>
                  <span className="consultation-bullet" />
                  Sample arrangement discussion
                </li>
              </ul>

              <button onClick={handleBookConsultation} className="consultation-btn">
                <Calendar />
                Schedule on Google Meet
              </button>
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="business-hours">
          <div className="business-hours-inner">
            <h2 className="business-hours-title">Business Hours</h2>
            <div className="business-hours-grid">
              {[
                { day: 'Mon - Fri', hours: '9:00 AM - 6:00 PM' },
                { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
                { day: 'Sunday', hours: 'Closed' },
                { day: 'Holidays', hours: 'By Appointment' },
              ].map((item) => (
                <div key={item.day} className="hours-item">
                  <p className="hours-day">{item.day}</p>
                  <p className="hours-time">{item.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

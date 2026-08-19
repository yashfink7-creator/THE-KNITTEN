import { useState } from 'react';
import { CheckIcon } from '../components/common/Icons';
import './Contact.css';

const INITIAL_FORM = { name: '', email: '', message: '' };

const CONTACT_INFO = [
  { icon: '📞', label: 'Call Us', value: '+91 98765 43210' },
  { icon: '✉', label: 'Email Us', value: 'hello@theknitten.com' },
  { icon: '🕐', label: 'Working Hours', value: 'Mon – Sat: 10AM – 7PM' },
  { icon: '📍', label: 'Shipping', value: 'Pan India Shipping' },
];

function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setForm(INITIAL_FORM);
  }

  return (
    <div className="contact-page">
      <div className="page-hero">
        <h1>Get In Touch</h1>
        <p>Questions, custom ideas, or just want to say hi? We'd love to hear from you.</p>
      </div>

      <div className="container contact-layout">
        <div className="contact-info">
          {CONTACT_INFO.map((info) => (
            <div className="contact-info-card" key={info.label}>
              <span className="contact-info-icon">{info.icon}</span>
              <div>
                <h4>{info.label}</h4>
                <p>{info.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {submitted && (
            <div className="contact-success">
              <CheckIcon /> Thanks for reaching out! We'll reply within 24 hours.
            </div>
          )}
          <label>
            Name
            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
          </label>
          <label>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="How can we help?"
            />
          </label>
          <button type="submit" className="btn btn-primary btn-block">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;

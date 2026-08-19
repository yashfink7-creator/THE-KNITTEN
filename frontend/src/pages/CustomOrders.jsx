import { useState } from 'react';
import { UploadIcon, CheckIcon } from '../components/common/Icons';
import './CustomOrders.css';

const INITIAL_FORM = {
  name: '',
  contact: '',
  itemType: '',
  description: '',
};

function CustomOrders() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [referenceImage, setReferenceImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setReferenceImage({ name: file.name, url: URL.createObjectURL(file) });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="container custom-orders-success">
        <span className="success-icon">
          <CheckIcon />
        </span>
        <h2>Request Received!</h2>
        <p>
          Thank you, {form.name.split(' ')[0] || 'friend'}! We've received your custom order request
          and will get back to you within 1-2 business days.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setForm(INITIAL_FORM);
            setReferenceImage(null);
            setSubmitted(false);
          }}
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="custom-orders-page">
      <div className="page-hero">
        <h1>Custom Orders</h1>
        <p>Have something special in mind? Tell us about it and we'll bring it to life.</p>
      </div>

      <div className="container custom-orders-layout">
        <div className="custom-orders-intro">
          <h3>How it works</h3>
          <ol>
            <li>Share your idea, colors and reference images.</li>
            <li>We'll get back to you with a quote and timeline.</li>
            <li>Once confirmed, we start crocheting your custom piece.</li>
          </ol>
          <p className="custom-orders-note">
            Custom pieces typically take 5-14 days depending on complexity.
          </p>
        </div>

        <form className="custom-orders-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Full Name
              <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
            </label>
            <label>
              Email or Phone
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label>
            Item Type
            <input
              type="text"
              name="itemType"
              value={form.itemType}
              onChange={handleChange}
              placeholder="e.g. Amigurumi doll, tote bag, bouquet…"
            />
          </label>

          <label>
            Describe Your Custom Item
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Tell us about size, colors, style and any inspiration…"
            />
          </label>

          <label className="upload-label">
            Reference Image
            <div className="upload-dropzone">
              {referenceImage ? (
                <div className="upload-preview">
                  <img src={referenceImage.url} alt="Reference preview" />
                  <span>{referenceImage.name}</span>
                </div>
              ) : (
                <>
                  <UploadIcon />
                  <span>Click to upload a reference image</span>
                  <span className="upload-hint">PNG or JPG, up to 5MB</span>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          </label>

          <button type="submit" className="btn btn-primary btn-block">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomOrders;

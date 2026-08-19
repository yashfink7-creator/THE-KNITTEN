import { useState } from 'react';
import categoriesData from '../../data/categories';
import PlaceholderImage from '../../components/common/PlaceholderImage';
import { PlusIcon, EditIcon } from '../../components/common/Icons';
import Modal from '../components/Modal';
import './AdminCategories.css';

const EMPTY_FORM = { name: '', emoji: '🧶', description: '' };

function AdminCategories() {
  const [categories, setCategories] = useState(categoriesData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  function openAddModal() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEditModal(cat) {
    setEditingId(cat.id);
    setForm({ name: cat.name, emoji: cat.emoji, description: cat.description });
    setModalOpen(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editingId) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, ...form } : c))
      );
    } else {
      const newCategory = {
        id: Date.now(),
        slug: form.name.toLowerCase().trim().replace(/\s+/g, '-'),
        name: form.name,
        emoji: form.emoji || '🧶',
        bg: '#f4dde0',
        description: form.description,
      };
      setCategories((prev) => [...prev, newCategory]);
    }
    setModalOpen(false);
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Categories</h1>
          <p>Organize your products into browsable categories.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openAddModal}>
          <PlusIcon /> Add Category
        </button>
      </div>

      <div className="category-manage-grid">
        {categories.map((cat) => (
          <div className="category-manage-card" key={cat.id}>
            <div className="category-manage-thumb">
              <PlaceholderImage emoji={cat.emoji} bg={cat.bg} sources={[cat.image, cat.photo]} alt={cat.name} className="sm" />
            </div>
            <div className="category-manage-info">
              <h4>{cat.name}</h4>
              <p>{cat.description}</p>
            </div>
            <button type="button" className="admin-icon-btn" aria-label={`Edit ${cat.name}`} onClick={() => openEditModal(cat)}>
              <EditIcon />
            </button>
          </div>
        ))}
      </div>

      {modalOpen && (
        <Modal title={editingId ? 'Edit Category' : 'Add Category'} onClose={() => setModalOpen(false)}>
          <form className="admin-form" onSubmit={handleSubmit}>
            <label>
              Category Name
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              Icon (emoji)
              <input type="text" name="emoji" value={form.emoji} onChange={handleChange} maxLength={2} />
            </label>
            <label>
              Description
              <textarea name="description" rows={3} value={form.description} onChange={handleChange} />
            </label>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Save Changes' : 'Add Category'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default AdminCategories;

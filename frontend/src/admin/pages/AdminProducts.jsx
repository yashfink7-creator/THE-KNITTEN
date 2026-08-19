import { useState } from 'react';
import productsData from '../../data/products';
import categories from '../../data/categories';
import PlaceholderImage from '../../components/common/PlaceholderImage';
import { PlusIcon, EditIcon, TrashIcon, UploadIcon } from '../../components/common/Icons';
import Modal from '../components/Modal';

const EMPTY_FORM = {
  name: '',
  price: '',
  category: categories[0]?.slug || '',
  description: '',
  stock: '',
  imageUrl: '',
};

function AdminProducts() {
  const [products, setProducts] = useState(productsData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState(null);

  function openAddModal() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEditModal(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      stock: product.stock,
      imageUrl: product.imageUrl || '',
    });
    setModalOpen(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const categoryInfo = categories.find((c) => c.slug === form.category);

    if (editingId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: form.name,
                price: Number(form.price),
                category: form.category,
                categoryName: categoryInfo?.name || p.categoryName,
                description: form.description,
                stock: Number(form.stock),
                imageUrl: form.imageUrl,
              }
            : p
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        slug: form.name.toLowerCase().trim().replace(/\s+/g, '-'),
        name: form.name,
        price: Number(form.price) || 0,
        category: form.category,
        categoryName: categoryInfo?.name || '',
        isNew: true,
        featured: false,
        rating: 0,
        reviewCount: 0,
        stock: Number(form.stock) || 0,
        emoji: categoryInfo?.emoji || '🧶',
        bg: categoryInfo?.bg || '#f4dde0',
        description: form.description,
        details: [],
        imageUrl: form.imageUrl,
      };
      setProducts((prev) => [newProduct, ...prev]);
    }

    setModalOpen(false);
  }

  function confirmDelete() {
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Products</h1>
          <p>Manage your product catalog — {products.length} items total.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openAddModal}>
          <PlusIcon /> Add Product
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="admin-table-product">
                      <div className="admin-table-thumb">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <PlaceholderImage
                            emoji={product.emoji}
                            bg={product.bg}
                            sources={[product.image, product.photo]}
                            alt={product.name}
                            className="sm"
                          />
                        )}
                      </div>
                      <div>
                        <div>{product.name}</div>
                        {product.imageSearchTerm && (
                          <div className="admin-table-hint">Pinterest: "{product.imageSearchTerm}"</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{product.categoryName}</td>
                  <td>₹{Number(product.price).toLocaleString('en-IN')}</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className="admin-actions">
                      <button type="button" className="admin-icon-btn" aria-label="Edit" onClick={() => openEditModal(product)}>
                        <EditIcon />
                      </button>
                      <button
                        type="button"
                        className="admin-icon-btn danger"
                        aria-label="Delete"
                        onClick={() => setDeleteTarget(product)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <p className="admin-empty">No products yet. Add your first one!</p>}
        </div>
      </div>

      {modalOpen && (
        <Modal title={editingId ? 'Edit Product' : 'Add Product'} onClose={() => setModalOpen(false)}>
          <form className="admin-form" onSubmit={handleSubmit}>
            <label>
              Product Name
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </label>

            <div className="admin-form-row">
              <label>
                Price (₹)
                <input type="number" name="price" min="0" value={form.price} onChange={handleChange} required />
              </label>
              <label>
                Stock
                <input type="number" name="stock" min="0" value={form.stock} onChange={handleChange} required />
              </label>
            </div>

            <label>
              Category
              <select name="category" value={form.category} onChange={handleChange}>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Description
              <textarea name="description" rows={3} value={form.description} onChange={handleChange} />
            </label>

            <label className="upload-label">
              Product Image
              <div className="upload-dropzone">
                {form.imageUrl ? (
                  <div className="upload-preview">
                    <img src={form.imageUrl} alt="Preview" />
                  </div>
                ) : (
                  <>
                    <UploadIcon />
                    <span>Click to upload product image</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>
            </label>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <Modal title="Delete Product" onClose={() => setDeleteTarget(null)}>
          <p style={{ fontSize: 13.5, color: 'var(--color-text-soft)', marginBottom: 20 }}>
            Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.
          </p>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={confirmDelete}>
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AdminProducts;

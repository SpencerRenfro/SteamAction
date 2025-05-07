import { useState, useEffect } from 'react';

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  // Fetch items from the API
  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/items');

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch items. Is the server running?');
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new item
  const handleAddItem = async (e) => {
    e.preventDefault();

    if (!newItem.name.trim()) {
      return;
    }

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const addedItem = await response.json();
      setItems([...items, addedItem]);
      setNewItem({ name: '', description: '' });
    } catch (err) {
      setError('Failed to add item');
      console.error('Error adding item:', err);
    }
  };

  // Delete an item
  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      setError('Failed to delete item');
      console.error('Error deleting item:', err);
    }
  };

  // Load items when component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Items from SQLite Database</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleAddItem} className="mb-6 bg-base-200 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Add New Item</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Item name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            className="textarea textarea-bordered w-full"
            placeholder="Item description"
            rows="3"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Item
        </button>
      </form>

      {loading ? (
        <div className="text-center py-4">Loading items...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.length === 0 ? (
            <div className="col-span-full text-center py-4">No items found</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <h3 className="card-title">{item.name}</h3>
                  <p>{item.description || 'No description'}</p>
                  <div className="card-actions justify-end mt-2">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ItemList;

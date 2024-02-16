import React, { useState } from 'react';
import './MyCloset.css';

const MyCloset = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleAddItem = () => {
    // Validate input if needed
    //if (!itemName || !itemType || !selectedImage) {
    if (!itemName || !itemType) {
      alert('Please fill in all fields');
      return;
    }

    // Create an object representing the new item
    const newItem = {
      name: itemName,
      type: itemType,
      image: selectedImage, // Add the selected image to the item
    };

    // Pass the new item to the parent component
    onAddItem(newItem);

    // Clear input fields after adding the item
    setItemName('');
    setItemType('');
    setSelectedImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="add-item-container">
      <h2>Add Clothing Item</h2>
      <form>
        <label>Name:</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />

        <label>Type:</label>
        <input
          type="text"
          value={itemType}
          onChange={(e) => setItemType(e.target.value)}
        />

        <label>Upload Photo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {selectedImage && (
          <div>
            <h4>Selected Image:</h4>
            <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
          </div>
        )}

        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
      </form>
    </div>
  );
};

export default MyCloset;

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './MyCloset.css';
const supabaseUrl = 'https://ivksivkepfmrbgwvlqny.supabase.co'
const supabaseLink = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2a3NpdmtlcGZtcmJnd3ZscW55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyOTc4NDMsImV4cCI6MjAyNjg3Mzg0M30.MEA_BDrynBMJ9UGjMLIRFqdNraI5TMMxWinumEaGpu4'

export const supabase = createClient(supabaseUrl, supabaseLink);

  export const fetchClothingItems = async (supabase, user, setAddedItems) =>{
    try {
      const user = supabase.auth.user;
      if (user) {
        // Fetch clothing items associated with the current user
        const { data, error } = await supabase
          .from('clothing_items')
          .select('*')
          .eq('user_id', user.id); // Assuming 'user_id' is the column name for user IDs

        if (error) {
          throw error;
        }
        setAddedItems(data || []);
      }
    } catch (error) {
      console.error('Error fetching clothing items:', error.message);
    }
  }

// how to import: 
// import supabase from '../MyWardrobe/MyWardrobe'

//component 'MyCloset' that accepts a prop 'onAddItem'
  const MyCloset = ({ user }) => {
  // State hooks for managing form inputs and input data

  // name of clothing item, initial state as an empty string
  // setItemName is the function that will update the state of itemName
  const [itemName, setItemName] = useState('');
  // type of clothing (sweater, t-shirt, etc)
  // Set the default item type to 'T-Shirt' in the item type dropdown menu
  const [itemType, setItemType] = useState('T-Shirt');
  // user can upload an image of their clothing
  const [selectedImage, setSelectedImage] = useState(null);
  // user can add tags (cute, comfy, formal, etc) to their clothing
  const [tags, setTags] = useState([]);
  // this represents all the items a user has added to 'their wardrobe'
  const [addedItems, setAddedItems] = useState([]);
  // represents the present item types - custom types will be added here after they are inputted once by the user 
  const [presetTypes, setPresetTypes] = useState(['T-Shirt', 'Sweater', 'Long Sleeve', 'Jeans', 'Pants']);
  // represents the state of the 'add a custom item type' text box
  const [showTextBox, setShowTextBox] = useState(false);

  


  useEffect(() => {
    // Call fetchClothingItems inside useEffect
    fetchClothingItems(supabase, user, setAddedItems);
  }, [user]); 





  // this function validates form input, creating a new clothing item, 
  // updating the state of all the components of an added item, 
  // and notifying the parent comonent (App.js) about the newly added item.
  const handleAddItem = async () => {
    // Validate input - make sure no required fields are empty.
    if (!itemName || !itemType || !tags) {
      alert('Please fill in the item name, type, and at least one tag.');
      return;
    }

    // Determine if the type is a preset or custom type.
    const isPresetType = presetTypes.includes(itemType);

    // Add the custom type to the list ('customTypes' state) if it's not a preset or custom type already.
      if (!isPresetType && showTextBox) {
        setPresetTypes((prevTypes) => [...prevTypes, itemType]);
    }

    // Create an object representing the new item based on the uesr input.
    const newItem = {
      name: itemName,
      type: itemType,
      image: selectedImage,
      tags: [...tags],
    };

    try {
      // Insert the new item into the database using Supabase's insert() method
      const { data, error } = await supabase.from('clothing_items').insert([newItem]);
  
      if (error) {
        throw error;
      }
  
      console.log('Item inserted successfully:', data);
    } catch (error) {
      console.error('Error inserting item:', error.message);
      return; // Return early if there's an error inserting the item
    }
  
    // Adds a newItem to the addedItems state using the setAddedItems function.
    setAddedItems((prevItems) => [...prevItems, newItem]);

    // Pass the new item to the parent component using the onAddItem prop, 
    // It can be good to notify the patent component of updates in a state for many reasons:
    // State managment, data flow, reusability, debugging, etc.
    //onAddItem(newItem);

    // Clear input fields after adding the item to prepare to add another clothing item.
    setItemName('');
    setItemType('');
    setSelectedImage(null);
    setTags([]);
    setShowTextBox(false);  
  };

  // Arrow function that takes in 'tag', representing the tag being clicked or changed.
  const handleTagChange = (tag) => {
    // Check if the tag is already selected (included in the tags array)
    if (tags.includes(tag)) {
      // Tag is selected, remove it from the selected tags
      // Checks each element in tags and will include it in the new tags state if it is not equal to 'tag' 
      setTags((prevTags) => prevTags.filter((t) => t !== tag));
    } else {
      // Tag is not selected, add it to the selected tags (tags state)
      setTags((prevTags) => [...prevTags, tag]);
    }
  };

  // Arrow function that takes in 'e', representing the event object, containing information about the event that occured.
  const handleImageChange = (e) => {
    // Extracts the file from the input event (e).
    // Takes the first file from the array (I assume there is only one file added).
    const file = e.target.files[0];
    // Checks if the file was successfully selected.
    if (file) {
      // Creates a new FileReader object, which allows asychronous readings of the contents of the file.
      const reader = new FileReader();
      // Sets up an event handler that is triggered when the file reading operation is done.
      reader.onloadend = () => {
        // Updates the state variable 'selectedImage' with the result of the file reading operation (reader.result).
        // reader.result = a data URL representing the contents of the file. 
        setSelectedImage(reader.result);
      };
      // Initiates the file reading, will trigger 'loadend' event when completed.
      reader.readAsDataURL(file);
    }
  };

  // Function that takes in an index and removes it from updatedItems
  const removeItem = (index) => {
    // Arrow function to update the addedItems state
    setAddedItems((prevItems) => {
      // Copy over the addedItems state and then remove the index
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  return (
    <div className="wardrobe-container">
      <div className="add-item-container">
        <h2>Add Clothing Item</h2>
        <form>
          <label>Name:</label>
          {/* input field, type='text' specifies that this is a text input field */}
          {/* value={itemName} binds the input value to the itemName state variable */}
          {/* onChange... is an event handler that updates the itemName state to the new value
          (e.target.value) every time the input field changes */}
          <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />

          <label>Type:</label>

          {/* Check if the showTextBox state is true. If its false, the dropdown menu will render. */}
          {!showTextBox ? (
            <select
            value={itemType}
            onChange={(e) => {
              setItemType(e.target.value);
              setShowTextBox(e.target.value === '');
            }}
            >
                  {/* Render preset types */}
                  <option value=''>Add New Type</option> 
                  {presetTypes.map((type) => (
                    <>
                    <option key={type} value={type}>
                      {type}
                    </option>
                    </>
                  ))}
                   
              </select>
              )              
              : (
                <><input
                type='text'
                placeholder="Enter clothing type"
                value={itemType}
                onChange={(e) => setItemType(e.target.value)} />
                <button type="button" onClick={() => setShowTextBox(!showTextBox)}>
                  Choose Preset Types
                </button></>
              )
          }

          <label>Tags:</label>

          <div>
          <input
            type="checkbox"
            id="cuteTag"
            checked={tags.includes('cute')}
            onChange={() => handleTagChange('cute')}
          />
          <label htmlFor="cuteTag">Cute</label>
          </div>

          <div>
          <input
            type="checkbox"
            id="cuteTag"
            checked={tags.includes('comfy')}
            onChange={() => handleTagChange('comfy')}
          />
          <label htmlFor="cuteTag">Comfy</label>
          </div>

          <div>
          <input
            type="checkbox"
            id="cuteTag"
            checked={tags.includes('formal')}
            onChange={() => handleTagChange('formal')}
          />
          <label htmlFor="cuteTag">Formal</label>
          </div>


          <label>Upload Photo:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {selectedImage && (
            <div>
              <h4>Selected Image:</h4>
              <img src={selectedImage} alt="Selected" style={{ maxWidth: '20%' }} />
            </div>
          )}

          <button type="button" onClick={handleAddItem}>
            Add Item
          </button>
        </form>
      </div>

      <div className="wardrobe-title">
        <h2>Added Clothing Items:</h2>
      </div>

      <div className="added-clothing-container">
        {/* Render added items */}
        {addedItems.map((item, index) => (
          <div key={index} className="added-item">
            <p>Name: {item.name}</p>
            <p>Type: {item.type}</p>
            <p> Image: </p>
            <button type="button" onClick={() => removeItem(index)}>
              Remove Item
            </button>
            {item.image && <img src={item.image} alt={item.name} style={{ maxWidth: '50%' }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCloset;

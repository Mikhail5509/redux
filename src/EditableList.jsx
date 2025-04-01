import React, { useState } from "react";

const EditableList = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");

  const handleSave = () => {
    if (editingItem) {
      setItems(
        items.map((item) =>
          item.id === editingItem.id ? { ...item, text, price: Number(price) } : item
        )
      );
      setEditingItem(null);
    } else {
      const newItem = { id: Date.now(), text, price: Number(price) };
      setItems([...items, newItem]);
    }
    setText("");
    setPrice("");
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setText(item.text);
    setPrice(item.price.toString());
  };

  const handleCancel = () => {
    setEditingItem(null);
    setText("");
    setPrice("");
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div>
        <input type="text" placeholder="Название" value={text} onChange={(e) => setText(e.target.value)} />
        <input type="number" placeholder="Цена" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button onClick={handleSave}>{editingItem ? "Обновить" : "Добавить"}</button>
        {editingItem && <button onClick={handleCancel}>Отмена</button>}
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.text} {item.price}₽
            <button onClick={() => handleEdit(item)}>✏️</button>
            <button onClick={() => handleDelete(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditableList;

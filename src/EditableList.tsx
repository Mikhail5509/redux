import React, { useState } from "react";

interface Item {
  id: number;
  text: string;
  price: number;
}

const EditableList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const handleSave = () => {
    if (text.trim() === "" || price.trim() === "") return;

    if (editingItem) {
      setItems(items.map((item) =>
        item.id === editingItem.id ? { ...item, text, price: Number(price) } : item
      ));
      setEditingItem(null);
    } else {
      const newItem: Item = {
        id: Date.now(),
        text,
        price: Number(price),
      };
      setItems([...items, newItem]);
    }
    setText("");
    setPrice("");
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setText(item.text);
    setPrice(String(item.price));
  };

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Название" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Цена" type="number" />
      <button onClick={handleSave}>{editingItem ? "Сохранить" : "Добавить"}</button>
      <button onClick={() => { setEditingItem(null); setText(""); setPrice(""); }}>Отмена</button>
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

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, editItem, deleteItem } from "./store/itemsSlice.js";

const EditableList = () => {
  const items = useSelector((state) => state.items.list);
  const dispatch = useDispatch();
  
  const [editingItem, setEditingItem] = useState(null);
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [filter, setFilter] = useState("");

  const handleSave = () => {
    if (editingItem) {
      dispatch(editItem({ id: editingItem.id, text, price: Number(price) }));
      setEditingItem(null);
    } else {
      dispatch(addItem({ text, price: Number(price) }));
    }
    setText("");
    setPrice("");
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setText(item.text);
    setPrice(item.price);
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  const filteredItems = items.filter((item) => item.text.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <input
        type="text"
        placeholder="Фильтр"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <input
        type="text"
        placeholder="Название"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="number"
        placeholder="Цена"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleSave}>{editingItem ? "Сохранить" : "Добавить"}</button>
      <ul>
        {filteredItems.map((item) => (
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

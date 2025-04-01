import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addItem, editItem, deleteItem } from "../store/itemsSlice";

interface Item {
  id: number;
  text: string;
  price: number;
}

const EditableList = () => {
  const items = useSelector((state: RootState) => state.items.list);
  const dispatch = useDispatch();
  
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [filter, setFilter] = useState("");

  const handleSave = () => {
    if (!text || !price) return;
    
    if (editingItem) {
      dispatch(editItem({ 
        id: editingItem.id, 
        text, 
        price: Number(price) 
      }));
      setEditingItem(null);
    } else {
      dispatch(addItem({ 
        text, 
        price: Number(price) 
      }));
    }
    setText("");
    setPrice("");
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setText(item.text);
    setPrice(item.price.toString());
  };

  const handleDelete = (id: number) => {
    dispatch(deleteItem(id));
  };

  const filteredItems = items.filter((item: Item) => 
    item.text.toLowerCase().includes(filter.toLowerCase())
  );

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
      <button onClick={handleSave}>
        {editingItem ? "Сохранить" : "Добавить"}
      </button>
      <ul>
        {filteredItems.map((item: Item) => (
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
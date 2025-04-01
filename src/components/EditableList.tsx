import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addItem, editItem, deleteItem } from "../store/itemsSlice";

const EditableList = () => {
  // Получаем данные из Redux store
  const items = useSelector((state: RootState) => state.items.list);
  const dispatch = useDispatch();

  // Локальное состояние для формы
  const [editingId, setEditingId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [filter, setFilter] = useState("");

  // Обработчик сохранения
  const handleSave = () => {
    if (!text || !price) return;

    if (editingId) {
      dispatch(editItem({ id: editingId, text, price: Number(price) }));
    } else {
      dispatch(addItem({ text, price: Number(price) }));
    }

    setEditingId(null);
    setText("");
    setPrice("");
  };

  // Обработчик редактирования
  const handleEdit = (id: string) => {
    const item = items.find(item => item.id === id);
    if (item) {
      setEditingId(item.id);
      setText(item.text);
      setPrice(item.price.toString());
    }
  };

  // Обработчик удаления
  const handleDelete = (id: string) => {
    dispatch(deleteItem(id));
  };

  // Фильтрация элементов
  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {/* Поле фильтрации */}
      <input
        type="text"
        placeholder="Фильтр"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* Форма ввода */}
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
        {editingId ? "Сохранить" : "Добавить"}
      </button>

      {/* Список элементов */}
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>
            <span>
              {item.text} {item.price}₽
            </span>
            <div>
              <button onClick={() => handleEdit(item.id)}>✏️</button>
              <button onClick={() => handleDelete(item.id)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditableList;
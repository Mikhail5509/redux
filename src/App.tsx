import EditableList from "./EditableList.js";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="container mt-4">
      <h1>Редактируемый список</h1>
      <EditableList />
    </div>
  );
};

export default App;

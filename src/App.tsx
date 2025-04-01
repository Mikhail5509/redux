// src/App.tsx
import { Provider } from 'react-redux';
import { store } from './store';
import EditableList from './components/EditableList';

const App = () => (
  <Provider store={store}>
    <div className="container">
      <h1>Redux: Редактируемый список</h1>
      <EditableList />
    </div>
  </Provider>
);

export default App;
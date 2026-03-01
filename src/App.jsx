import { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoFilters from './components/TodoFilters';
import TodoItem from './components/TodoItem';
function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const body = document.body;
    if (theme === 'dark'){
      body.style.background = '#1a1a1a';
      body.style.color = '#ffffff';
    } else {
      body.style.background = '#ffffff';
      body.style.color = '#333333';
    }
    localStorage.setItem('theme', theme);
  },[theme]);
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }

  const themeStyles = {
    light: {
      bg: '#ffffff',
      text: '#333333',
      border: '#eeeeee',
      inputBg: '#ffffff',
      completed: '#999999'
    },
    dark: {
      bg: '#1a1a1a',
      text: '#ffffff',
      border: '#444444',
      inputBg: '#2d2d2d',
      completed: '#666666'
    }
  };

  const currentTheme = themeStyles[theme];
// Состояние для списка задач
  const [todos, setTodos] = useState(() => {
// Загружаем сохраненные задачи из localStorage
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
// Состояние для текущего фильтра
  const [filter, setFilter] = useState('all');
// Сохраняем задачи в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
// Добавление новой задачи
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };
// Переключение статуса задачи
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };
// Удаление задачи
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
// Фильтрация задач
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });
// Подсчет активных задач
  const activeCount = todos.filter(todo => !todo.completed).length;
  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: currentTheme.bg,
      color: currentTheme.text
    }}>
      <div>
        <button onClick={toggleTheme}
        style={{
          padding: '8px 16px',
          backgroundColor: currentTheme.inputBg,
          color: currentTheme.text,
          border: '1px solid ${currentTheme.border}',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          {theme === 'light' ? 'Темная тема' : 'Светлая тема'}
        </button>
      </div>
      <h1 style={{ textAlign: 'center' }}>Менеджер задач</h1>
      <AddTodoForm onAdd={addTodo} />
      <TodoFilters
        filter={filter}
        onFilterChange={setFilter}
        activeCount={activeCount}
      />
      {filteredTodos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999' }}>
          {filter === 'all' ? 'Задач пока нет' :
            filter === 'active' ? 'Нет активных задач' : 'Нет выполненных задач'}
        </p>
      ) : (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            task={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </ul>
    )}
    {todos.length > 0 && (
      <button
        onClick={() => setTodos([])}
        style={{
          marginTop: '20px',
          padding: '8px 16px',
          background: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Очистить всё
      </button>
      )}
    </div>
  );
}
export default App; 
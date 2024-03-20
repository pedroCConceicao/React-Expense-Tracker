import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard.js';
import Form from './components/Form.js';

function App() {
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
        <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded">Registro de Gastos</h1> 

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Dashboard */}
          <Dashboard></Dashboard>
          {/* Formulário */}
          <Form></Form>
        </div>
      </div>
    </div>
  );
}

export default App;

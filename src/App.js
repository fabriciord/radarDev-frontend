import React, { useState, useEffect } from 'react';
import api from './services/api';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import './components/DevItem/index';
import DevItem from './components/DevItem/index';
import DevForm from './components/DevForm/index';
 
// Componentes: um bloco isolado de HTML, CSS e JS não interfere no restante da aplicação.
// Propriedade: Informações que um componente PAI passa para o componente FILHO
// Estado: Informações mantida pelo componente (Lembrar: imutabilidade)
function App() {
  const [devs, setDevs] = useState([]);
  async function handleAddDev(data){
    const res = await api.post('/dev', data);
    if(!devs.map(dev => dev._id === res.data._id)[0])
      setDevs([...devs, res.data]);        
  }
  useEffect(() => {
    async function loadDev(){
      const response = await api.get('/devs');
      console.log(response.data);
      setDevs(response.data);
    };
    loadDev();    
  }, [])
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm  onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {
            devs.map(dev => (
              <DevItem key={dev._id} dev={dev} />
            ))
          }        
        </ul>
      </main>
    </div>
  );
}

export default App;
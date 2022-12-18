
import './App.css';

import { Route, Switch } from 'react-router-dom';
import TelaInicial from './pokemon/TelaInicial/index'
import Selecao from './pokemon/Selecao/index'
import Vitoria from './pokemon/Vitoria/index'
import Derrota from './pokemon/Derrota/index'

function App() {
  return (
    <div>
      <main>
        <Switch>
          <Route exact path='/' component={TelaInicial} />
          <Route path='/selecao' component={Selecao} />
          <Route path='/vitoria' component={Vitoria} />
          <Route path='/derrota' component={Derrota} />
        </Switch>
      </main>

    </div>
  )

}

export default App;

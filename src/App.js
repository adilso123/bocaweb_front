import './App.css';
import {Component} from 'react';
import {Buscadeoda} from './components/Buscadeoda';
import {Listadeoda} from './components/Listadeoda';
import {Cabecalho} from './components/Cabecalho';
import {Rodape} from './components/Rodape';

class App extends Component{
  state = {
    busca: '',
    odas: []
  }

  componentDidMount(){
    this.carregaODAs();
  }

  carregaODAs(){
    const {busca} = this.state;
    fetch('https://www.bocaweb.com.br/apibocaweb?nome='+busca)
    .then(response => response.json())
    .then(odas => this.setState({odas}))
  }

  buscaODA = (evento) => {
    this.setState({busca: evento.target.value});
    this.carregaODAs()
  }

  render(){
    const {odas} = this.state;
    return (
      <section className = "container">
        <Cabecalho/>
        <div className = 'buscadeoda'>
          <Buscadeoda
            busca={this.state.busca}
            buscaODA={this.buscaODA}
            />
        </div>

        <div className= "listadeoda">
        <p>Total de objetos: {odas.length} </p>
          {odas.map(oda => (
            <Listadeoda
              key= {oda._id}
              nome= {oda.nome}
              usuario= {oda.usuario}
              descricao= {oda.descricao}
              data_inclusao= {oda.data_inclusao}
              palavras_chave= {oda.palavras_chave}
            />
          ))}
        </div>
        <Rodape/>
      </section>
    )
  }
}

export default App;
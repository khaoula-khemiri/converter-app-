import './App.scss';
import Converter from './component/Converter';

function App() {
  return (
    <div className="App">
      <div className='appText'>
        Convertisseur de devise
      </div>

      <Converter />
    </div>
  );
}

export default App;

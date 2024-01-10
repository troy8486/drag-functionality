import Body from './components/Body';
import './App.css';
import { Provider } from 'react-redux';
import appStore from "./utils/appStore"
function App() {
  return (
    <Provider store={appStore}>
    <div className='grid place-items-center overflow-hidden bg-custom-background h-screen'>
      <Body/>
    </div>
    </Provider>

  );
}

export default App;

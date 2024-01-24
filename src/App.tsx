import './App.css';

import { LinkedButton } from './components/LinkedButton/LinkedButton';

function App(props:any) {
  return (
    <div>
        <LinkedButton productId={props.productId} label={props.label} />
    </div>
  );
}

export default App;

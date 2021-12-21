import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import '../assets/styles/index.scss';
import Header from './components/header';
import PickerForm from './components/picker-form';

initializeIcons();

const WinPicker = () => {
  return (
    <>
      <h1 className="sr-only">Win Picker</h1>
      <div className="layout__wrapper">
        <Header />
        <main>
          <PickerForm />
        </main>
        <footer />
      </div>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={WinPicker} />
      </Switch>
    </Router>
  );
}

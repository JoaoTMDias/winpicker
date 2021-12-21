import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import '../assets/styles/index.scss';
import Header from './components/header';
import PickerForm from './components/picker-form';
import { PickerStateProvider } from './containers/picker-state';

initializeIcons();

const WinPicker = () => {
  return (
    <>
      <h1 className="sr-only">Win Picker</h1>
      <PickerStateProvider>
        <div className="layout__wrapper">
          <Header />
          <main>
            <PickerForm />
          </main>
          <footer />
        </div>
      </PickerStateProvider>
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

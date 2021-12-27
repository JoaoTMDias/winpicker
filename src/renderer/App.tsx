import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { DefaultButton, Icon } from "@fluentui/react";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import "../assets/styles/index.scss";
import styles from "./App.module.scss";
import Header from "./components/header";
import PickerForm from "./components/picker-form";
import { PickerStateProvider } from "./containers/picker-state";

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
          <footer aria-label="Feedback and Help" className={styles.footer}>
            <DefaultButton
              className={styles.footer__button}
              as="a"
              href="https://github.com/JoaoTMDias/winpicker"
              target="_blank"
            >
              <Icon iconName="Info" />
              <span>About WinPicker</span>
            </DefaultButton>
            <DefaultButton
              className={styles.footer__button}
              as="a"
              href="https://webaim.org/articles/contrast/"
              target="_blank"
            >
              <Icon iconName="ReadingMode" />
              <span>Contrast and Colour Accessibility</span>
            </DefaultButton>
            <DefaultButton
              className={styles.footer__button}
              as="a"
              href="https://github.com/JoaoTMDias/winpicker/issues/new/choose"
              target="_blank"
            >
              <Icon iconName="Feedback" />
              <span>Give feedback</span>
            </DefaultButton>
          </footer>
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

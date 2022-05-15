import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { DefaultButton, Icon } from "@fluentui/react";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./app.module.scss";
import "./assets/styles/index.scss";
import Header from "./renderer/components/header";
import PickerForm from "./renderer/components/picker-form";
import { PickerStateProvider } from "./renderer/containers/picker-state";

initializeIcons();

const WinPicker = () => {
  return (
    <div id="winpicker">
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
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WinPicker />} />
      </Routes>
    </Router>
  );
}

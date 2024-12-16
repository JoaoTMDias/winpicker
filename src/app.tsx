import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { DefaultButton, Icon } from "@fluentui/react";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./app.module.scss";
import "./assets/styles/index.scss";
import Header from "./renderer/components/header";
import PickerForm from "./renderer/components/picker-form";
import { TextPreview } from "./renderer/components/text-preview";

initializeIcons();

const WinPicker = () => {
  return (
    <div id="winpicker">
      <h1 className="sr-only">Win Picker</h1>
      <div className="layout__wrapper">
        <Header />
        <main>
          <PickerForm />
          <TextPreview />
        </main>
        <footer
          aria-label="Feedback and Help"
          className={styles.footer}
          data-testid="footer-wrapper"
        >
          <DefaultButton
            className={styles.footer__button}
            as="a"
            href="https://github.com/JoaoTMDias/winpicker"
            target="_blank"
            data-testid="footer-link"
          >
            <Icon iconName="Info" data-testid="footer-link-icon" />
            <span data-testid="footer-link-text">About WinPicker</span>
          </DefaultButton>
          <DefaultButton
            className={styles.footer__button}
            as="a"
            href="https://webaim.org/articles/contrast/"
            target="_blank"
            data-testid="footer-link"
          >
            <Icon iconName="ReadingMode" data-testid="footer-link-icon" />
            <span data-testid="footer-link-text">
              Contrast and Colour Accessibility
            </span>
          </DefaultButton>
          <DefaultButton
            className={styles.footer__button}
            as="a"
            href="https://github.com/JoaoTMDias/winpicker/issues/new/choose"
            target="_blank"
            data-testid="footer-link"
          >
            <Icon iconName="Feedback" data-testid="footer-link-icon" />
            <span data-testid="footer-link-text">Give feedback</span>
          </DefaultButton>
        </footer>
      </div>
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

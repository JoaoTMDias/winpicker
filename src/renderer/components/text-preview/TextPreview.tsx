import { Text } from "@fluentui/react";
import styles from "./styles.module.scss";

function TextPreview({ style }: { style: React.CSSProperties }) {
  return (
    <div className={styles.content} style={style}>
      <Text as="h3" className={styles.title}>
        A Title
      </Text>
      <Text as="p" className={styles.subtitle}>
        A Subtitle below
      </Text>
      <dl>
        <div className={styles.term}>
          <dt>A description term</dt>
          <dd>
            A description definition. This is a description of the term above.
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default TextPreview;

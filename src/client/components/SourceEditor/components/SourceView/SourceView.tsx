import styles from "./index.css";

export const SourceView = ({ data }) => (
  <div className={styles.sourceView}>
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  </div>
);

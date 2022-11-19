import styles from './toolbar.css';

export default () => {
  return (
    <div className={styles['toolbar']}>
      <div className={`${styles['toolbarItem']} ${styles['bold']}`}>B</div>
      <div className={`${styles['toolbarItem']} ${styles['italic']}`}>I</div>
    </div>
  );
};

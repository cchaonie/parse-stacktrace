import { useState } from 'react';
import styles from './app.css';

export const App = () => {
  const [sourceMapUrl, setSourceMapUrl] = useState('');
  const [errorTrace, setErrorTrace] = useState('');
  const [parseResult, setParseResult] = useState('');
  const [parseInProgress, setParseInProgress] = useState(false);

  const onChangeUrl = e => setSourceMapUrl(e.target.value);
  const onChangeTrace = e => setErrorTrace(e.target.value);

  const handleParse = () => {
    if (!errorTrace || !sourceMapUrl) {
      alert('Please fill in the required fields');
      return;
    }
    if (!/^https/.test(sourceMapUrl)) {
      alert('The sourcemap url must start with "https"');
      return;
    }
    setParseInProgress(true);
    fetch('/parse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sourceMapUrl,
        errorTrace,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.message === 'OK') {
          setParseResult(json.data);
          console.log(`User login successfully`);
        }
      })
      .catch(e => {
        console.log('Parse failed because of ', e);
      })
      .finally(() => {
        setParseInProgress(false);
      });
  };

  return (
    <div className={styles.app}>
      <div className={styles.fieldItem}>
        <label className={styles.label} htmlFor='sourceMapUrl'>
          Source Map Url:
        </label>
        <input
          id='sourceMapUrl'
          className={styles.sourceMapUrl}
          value={sourceMapUrl}
          onChange={onChangeUrl}
        />
      </div>

      <div className={styles.fieldItem}>
        <label className={styles.label} htmlFor='sourceMapUrl'>
          Stack Trace:
        </label>
        <textarea
          id='stackTrace'
          className={styles.stackTrace}
          value={errorTrace}
          onChange={onChangeTrace}
        ></textarea>
      </div>

      {parseInProgress ? (
        <div className={styles.parseButton}>PARSING</div>
      ) : (
        <button className={styles.parseButton} onClick={handleParse}>
          PARSE
        </button>
      )}

      {!!parseResult && (
        <div className={styles.parseResults} contentEditable>
          {Array.isArray(parseResult)
            ? parseResult.map(l => <div key={l}>{l}</div>)
            : parseResult}
        </div>
      )}
    </div>
  );
};

export default App;

import { useState } from 'react';
import styles from './app.css';

export const App = () => {
  const [sourceMapUrl, setSourceMapUrl] = useState('');
  const [errorTrace, setErrorTrace] = useState('');
  const [parseResult, setParseResult] = useState('');

  const onChangeUrl = e => setSourceMapUrl(e.target.value);
  const onChangeTrace = e => setErrorTrace(e.target.value);

  const handleParse = () => {
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
      });
  };

  return (
    <div className={styles.app}>
      <input value={sourceMapUrl} onChange={onChangeUrl} />
      <br />
      <textarea value={errorTrace} onChange={onChangeTrace}></textarea>
      <br />
      <button onClick={handleParse}>PARSE</button>
      {!!parseResult && (
        <div className={styles.parseResults} contentEditable>
          {parseResult}
        </div>
      )}
    </div>
  );
};

export default App;

import { useState } from 'react';

function ReactCounter() {
  const [counter, setCounter] = useState(0);
  const name = 'React';

  return (
    <div style={styles.div}>
      <pre>{counter}</pre>
      <div>
        <button style={styles.button} onClick={() => setCounter((i) => i - 1)}>
          sub
        </button>
        <button style={styles.button} onClick={() => setCounter((i) => i + 1)}>
          add
        </button>
      </div>
      <p>I'm a {name} component</p>
    </div>
  );
}

const styles = {
  div: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '50px',
    margin: '20px',
    border: '2px dotted white',
  },
  button: {
    border: '5px solid pink',
    backgroundColor: 'gray',
    color: 'white',
    borderRadius: '10px',
    fontSize: '80px',
    margin: '0 20px',
    padding: '20px',
  },
};

export default ReactCounter;

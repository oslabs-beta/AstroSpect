import { useState } from 'react';
import ReactCounter from './ReactCounter';

function ReactSecret() {
  const [counter, setCounter] = useState(0);
  const name = 'React';

  return (
    <div style={styles.div}>
      <ReactCounter />
    </div>
  );
}

const styles = {
  div: {
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '50px',
    margin: '0',
  },
  button: {
    border: '5px solid pink',
    backgroundColor: 'gray',
    color: 'white',
    borderRadius: '10px',
    fontSize: '80px',
    margin: '0 20px',
    padding: '0',
  },
};

export default ReactSecret;

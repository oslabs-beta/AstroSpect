import React, { useState } from 'react';

function ReactComponent() {
  const [password, setPassword] = useState('');
  const [darthPW, setdarthPW] = useState('iloveobiwankenobi');

  const handleButtonClick = () => {
    if (password === 'iloveobiwankenobi') {
      window.location.href = '/secret';
    }
  };

  const handleInputChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div id='static-react' style={styles.divBody}>
      <img src='/death-star.webp' alt='Death Star' style={styles.image} />
      <div style={styles.passwordDiv}>
        <input
          type='text'
          placeholder='Input Password'
          style={styles.textInput}
          value={password}
          onChange={handleInputChange}
        />
        <button style={styles.submit} onClick={handleButtonClick}>
          Enter Database
        </button>
      </div>
    </div>
  );
}

const styles = {
  divBody: {
    color: 'white',
    margin: '0 20px 10px',
    alignItems: 'center',
    fontSize: '50px',
    width: '450px',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    maxWidth: '100%',
    border: '2px solid white',
    borderRadius: '100%',
  },
  passwordDiv: {
    margin: '20px auto',
    display: 'flex',
    alignItems: 'center',
    border: '10px outset white',
    padding: '20px 20px',
    background: 'gray',
  },
  textInput: {
    padding: '5px 10px',
    fontSize: '15px',
    width: '50%',
  },
  submit: {
    background: 'white',
    color: 'black',
    padding: '6px 10px',
    fontSize: '15px',
    width: '50%',
  },
};

export default ReactComponent;

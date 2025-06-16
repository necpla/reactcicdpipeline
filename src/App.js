import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0); // state to hold the counter value

  return (
    <div style={styles.container}>
      <h1>React Counter</h1>
      <h2>{count}</h2>
      <div style={styles.buttonContainer}>
        <button onClick={() => setCount(count - 1)} style={styles.button}>➖ Decremnt</button>
        <button onClick={() => setCount(0)} style={styles.button}>🔁 Reset</button>
        <button onClick={() => setCount(count + 1)} style={styles.button}>➕ Increment</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
    fontFamily: 'Arial',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  }
};

export default App;

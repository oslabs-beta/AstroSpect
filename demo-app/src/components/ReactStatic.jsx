function ReactStatic() {
  const name = 'React Static';

  return (
    <div id='static-react' style={styles.div}>
      <p>{name} component</p>
    </div>
  );
}

const styles = {
  div: {
    color: 'black',
    margin: '20px',
    alignItems: 'center',
    fontSize: '50px',
    border: '2px solid black',
  },
};

export default ReactStatic;

<script>
    let password = '';
    
    const handleButtonClick = () => {
      if (password === 'darthvaderiscool') {
        window.location.href = '/header';
      }
    };
    
    const handleInputChange = (event) => {
      password = event.target.value;
    };
  </script>
  
  <div id='static-svelte'>
    <img src='/death-star.webp' alt='Death Star' id='image' />
    <div id='passwordDiv'>
      <input
        type='text'
        placeholder='Input Password'
        id='textInput'
        bind:value={password}
        on:input={handleInputChange}
      />
      <button id='submit' on:click={handleButtonClick}>
        Enter Database
      </button>
    </div>
  </div>
  
  <style>
    #static-svelte {
      color: white;
      margin: 0 20px 10px;
      align-items: center;
      font-size: 50px;
      /*max-width: 100%;*/
      width: 450px;
      display: flex;
      flex-direction: column;
    }
  
    #image {
      max-width: 100%;
      border: 2px solid white;
      border-radius: 100%;
    }
  
    #passwordDiv {
      margin: 20px auto;
      display: flex;
      align-items: center;
      border: 10px outset white;
      padding: 20px 20px;
      background: gray;
    }
  
    #textInput {
      padding: 5px 10px;
      font-size: 15px;
      width: 50%;
    }
  
    #submit {
      background: white;
      color: black;
      padding: 6px 10px;
      font-size: 15px;
      width: 50%;
    }
  </style>
  
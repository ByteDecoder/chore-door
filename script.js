const app = () => {
  const doorImage1 = document.getElementById('door1');
  const doorImage2 = document.getElementById('door2');
  const doorImage3 = document.getElementById('door3');
  
  const botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
  const beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
  const spaceDoorPath  = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
  const closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
  
  const startButton  = document.getElementById('start');
  
  let numClosedDoors = 3;
  let openDoor1 = openDoor2 = openDoor3 = '';
  let currentlyPlaying  = true;
  
  const randomChoreDoorGenerator = () => {
    const choreDoor = Math.floor(Math.random() * numClosedDoors);
    if (choreDoor === 0) {
      openDoor1 = botDoorPath;
      openDoor2 = beachDoorPath;
      openDoor3 = spaceDoorPath;
    } else if (choreDoor === 1) {
      openDoor2 = botDoorPath;
      openDoor1 = spaceDoorPath;
      openDoor3 = beachDoorPath;
    } else {
      openDoor3 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor2 = spaceDoorPath;
    }
  };
  
  const isBot = door => {
  	if (door.src === botDoorPath) {
      return true;
    }  
    return false;
  };
  
  const isClicked = door => {
    if (door.src === closedDoorPath) {
      return false;
    }
    return true;
  };
  
  const gameOver = (status) => {
    if (status === 'win') {
      startButton.innerHTML = 'You win! Play again?';
    } else {
      startButton.innerHTML = 'Game over! Play again?';
    }
    currentlyPlaying  = false;
  };
  
  const playDoor = (door) => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
      gameOver('win');
    } else if (isBot(door)) {
      gameOver();
    }
  }
  
  const startRound = () => {
    numClosedDoors = 3;
    startButton.innerHTML = 'Good Luck!';
    currentlyPlaying = true;
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    randomChoreDoorGenerator();
  }
  
  doorImage1.onclick = () => { 
    if(currentlyPlaying && !isClicked(doorImage1)) {
      doorImage1.src = openDoor1;
      playDoor(doorImage1);
    }
  }
  doorImage2.onclick = () => {
    if(currentlyPlaying && !isClicked(doorImage2)) {
      doorImage2.src = openDoor2;
      playDoor(doorImage2);
    }
  }
  doorImage3.onclick = () => {
    if(currentlyPlaying && !isClicked(doorImage3)) {
      doorImage3.src = openDoor3;
      playDoor(doorImage3);
    }
  }
  
  startButton.onclick = () => {
    if (!currentlyPlaying) {
    	startRound();
    }
  };
  
  // Starting the game
  startRound();
};

app();

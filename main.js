const $player1Name = document.querySelector(".player1");
const $player2Name = document.querySelector(".player2");

const $board = document.querySelector(".board");
const $blocks = [...$board.querySelectorAll(".block")];

const X = "X";
const O = "O";

const Game = (() => {
  let player1 = null;
  let player2 = null;
  let turn = "player1";
  let board = Array(9).fill(null);

  const printBoard = () => {
    $blocks.forEach(($block, index) => {
      $block.innerHTML = board[index];
    });
  };

  const printPlayerNames = () => {
    // const player1Name = prompt("Type first player's name");
    // const player2Name = prompt("Type second player's name");
    // player1 = Player(player1Name, X);
    // player2 = Player(player2Name, O);
    player1 = Player("Lucas", X);
    player2 = Player("Suro", O);

    $player1Name.innerHTML = `${player1.name} (${player1.mark})`;
    $player2Name.innerHTML = `${player2.name} (${player2.mark})`;
  };

  const checkForEnd = () => {
    const lastPlayer = turn === "player1" ? player2 : player1;

    board.forEach((block, index) => {
      if (block === lastPlayer.mark) {
        if (index === 0) {
          if (board[1] === lastPlayer.mark && board[2] === lastPlayer.mark) {
            console.log("WIN with top horizontal line");
          }
          if (board[3] === lastPlayer.mark && board[6] === lastPlayer.mark) {
            console.log("WIN with left vertical line");
          }
          if (board[4] === lastPlayer.mark && board[8] === lastPlayer.mark) {
            console.log("WIN with topleft-bottomright diagonal line");
          }
        }

        if (index === 1) {
          if (board[4] === lastPlayer.mark && board[7] === lastPlayer.mark) {
            console.log("WIN with middle vertical line");
          }
        }

        if (index === 2) {
          if (board[5] === lastPlayer.mark && board[8] === lastPlayer.mark) {
            console.log("WIN with right vertical line");
          }
          if (board[4] === lastPlayer.mark && board[6] === lastPlayer.mark) {
            console.log("WIN with topright-bottomleft line");
          }
        }

        if (index === 3) {
          if (board[4] === lastPlayer.mark && board[5] === lastPlayer.mark) {
            console.log("WIN with middle horizontal line");
          }
        }

        if (index === 6) {
          if (board[7] === lastPlayer.mark && board[8] === lastPlayer.mark) {
            console.log("WIN with bottom horizontal line");
          }
        }
      }
    });

    if (board.every(Boolean)) {
      console.log("DRAW");
    }
  };

  const play = (target, index) => {
    if (target.innerHTML) {
      console.log("Node already clicked!");
      return;
    }

    if (turn === "player1") {
      board[index] = player1.mark;
      turn = "player2";
    } else if (turn === "player2") {
      board[index] = player2.mark;
      turn = "player1";
    }

    printBoard();
    checkForEnd();
  };

  const setEventListeners = () => {
    $blocks.forEach(($block, index) => {
      $block.addEventListener("click", e => play(e.target, index));
    });
  };

  const start = () => {
    printPlayerNames();
    printBoard();
    setEventListeners();
  };

  const stopGame = () => {
    player1 = null;
    player2 = null;
    board = Array(9).fill(null);
  };

  const restartGame = () => {
    stopGame();
    start();
  };

  return { start };
})();

const Player = (name, mark) => {
  return { name, mark };
};

Game.start();

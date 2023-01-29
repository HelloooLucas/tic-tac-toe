const $startButton = document.querySelector(".start");
const $restartButton = document.querySelector(".restart");
const $game = document.querySelector(".game");
const $player1Name = document.querySelector(".player1 h2");
const $player2Name = document.querySelector(".player2 h2");
const $player1Crown = document.querySelector(".player1 .crown");
const $player2Crown = document.querySelector(".player2 .crown");

const $board = document.querySelector(".board");
const $blocks = [...$board.querySelectorAll(".block")];

const DisplayController = (() => {
  const paintBoard = () => {
    const board = Game.getBoard();

    $blocks.forEach(($block, index) => {
      $block.innerHTML = board[index];
    });
  };

  const printPlayerNames = ({ player1, player2 }) => {
    $player1Name.innerHTML = `${player1.name} (${player1.mark})`;
    $player2Name.innerHTML = `${player2.name} (${player2.mark})`;
  };

  const resetDOMClasses = () => {
    $blocks.forEach($block => {
      $block.classList.remove("winning");
    });
    $player1Crown.classList.remove("active");
    $player2Crown.classList.remove("active");
  };

  return { paintBoard, printPlayerNames, resetDOMClasses };
})();

const Game = (() => {
  let player1;
  let player2;
  let board = Array(9).fill(null);
  let player1Playing = true;
  let winner;
  let winningCombination;
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const getBoard = () => board;

  const getPlayerNames = () => {
    const player1Name = prompt("Type first player's name");
    const player2Name = prompt("Type second player's name");
    player1 = Player(player1Name, "X");
    player2 = Player(player2Name, "O");
  };

  const checkIfGameOver = () => {
    const currentPlayer = player1Playing ? player1 : player2;

    winConditions.forEach(condition => {
      const allValid = condition.every(
        index => board[index] === currentPlayer.mark
      );

      if (allValid && !winner) {
        winner = currentPlayer;
        winningCombination = condition;
      }
    });

    if (winner) {
      $blocks.forEach((block, index) => {
        if (winningCombination.includes(index)) {
          block.classList.add("winning");
        }
      });

      if (player1Playing) {
        $player1Crown.classList.add("active");
      } else {
        $player2Crown.classList.add("active");
      }
    }

    if (board.every(Boolean)) {
      // Do some stuff in case of draw
      return true;
    }
  };

  const switchTurns = () => {
    player1Playing = !player1Playing;
  };

  const play = (target, index) => {
    if (winner) return;

    if (target.innerHTML) {
      console.log("Node already clicked!");
      return;
    }

    const currentPlayer = player1Playing ? player1 : player2;
    board[index] = currentPlayer.mark;
    DisplayController.paintBoard();
    checkIfGameOver();

    if (winner) return;

    switchTurns();
  };

  const setEventListeners = () => {
    $blocks.forEach(($block, index) => {
      $block.addEventListener("click", e => play(e.target, index));
    });
  };

  const resetState = () => {
    player1 = null;
    player2 = null;
    board = Array(9).fill(null);
    player1Playing = true;
    winner = null;
    winningCombination = null;
  };

  const start = () => {
    getPlayerNames();
    DisplayController.printPlayerNames({ player1, player2 });
    DisplayController.paintBoard();
    setEventListeners();
  };

  const restart = () => {
    resetState();
    DisplayController.resetDOMClasses();
    DisplayController.paintBoard();
    start();
  };

  return { start, restart, getBoard };
})();

const Player = (name, mark) => {
  return { name, mark };
};

$startButton.addEventListener("click", () => {
  $startButton.classList.add("hide");
  $game.classList.remove("hide");
  $restartButton.classList.remove("hide");

  Game.start();
});

$restartButton.addEventListener("click", Game.restart);

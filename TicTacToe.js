function row(number) {
  return [3 * (number - 1) + 1, 3 * (number - 1) + 2, 3 * (number - 1) + 3];
}

function column(number) {
  return [number, number + 3, number + 6];
}
// 贏的連線種類
const checkingLines = [
  row(1),
  row(2),
  row(3),
  column(1),
  column(2),
  column(3),
  [1, 5, 9],
  [3, 5, 7],
];
// 儲存下棋位置
var positions = {
  circle: [],
  cross: [],
};

var clickingThrottle = false;
var gameoverFlag = false;

// 事件監聽器
document.querySelectorAll("#app table tr td").forEach((cell) => {
  cell.addEventListener("click", onCellClicked);
});
// 點擊格子動作
function onCellClicked(event) {
  if (clickingThrottle) return;

  const position = Number(event.target.dataset.index);
  if (!position) return;

  draw(position, "circle");
  positions['circle'].push(position);
  clickingThrottle = true;

  setTimeout(() => {
    checkWinningCondition("circle");

    if (!gameoverFlag) {
      computerMove();
    }
  }, 500);
}
// 下棋
function draw(position, shape) {
  if (shape !== "circle" && shape !== "cross") {
    return console.error(
      "Unknown drawing shape, must be one of: circle, cross"
    );
  }

  const cell = document.querySelector(
    `#app table tr td[data-index='${position}']`
  );
  cell.innerHTML = `<div class='${shape}'></div>`;
}
// 顯示輸贏
function checkWinningCondition(player) {
  const winningPlayer = isPlayerWin(positions[player], player);
  if (winningPlayer) {
    gameoverFlag = true;
    removeClickListners();
    return alert(`${winningPlayer} player won!`);
  }

  if (getEmptyPositions().length === 0) {
    gameoverFlag = true;
    return alert("Tied!");
  }

  clickingThrottle = false;
}
// 判斷輸贏
function isPlayerWin(checkingPositions, player) {
  // [1, 4, 2 ,3]

  for (const line of checkingLines) {
    // [1, 2, 3]
    // [4, 5, 6]
    if (line.every((position) => checkingPositions.includes(position))) {
      return player;
    }
  }

  return false;
}
// 電腦移動
function computerMove() {
  const drawingPosition = getMostValuablePosition();
  draw(drawingPosition, "cross");
  positions["cross"].push(drawingPosition);
  checkWinningCondition("cross");
}
// 移除事件監聽器
function removeClickListners() {
  document.querySelectorAll("#app table tr td").forEach((cell) => {
    cell.removeEventListener("click", onCellClicked);
  });
}
// 找尋可下棋空位
function getEmptyPositions() {
  const allOccupiedPositions = positions["circle"].concat(positions["cross"]);

  return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
    (position) => !allOccupiedPositions.includes(position)
  );
}

//電腦計算最佳位置
function getMostValuablePosition() {
  const emptyPositions = getEmptyPositions();
  // 防守位置
  const defendPositions = [];

  for (const hypothesisPosition of emptyPositions) {
    const copiedCrossPositions = Array.from(positions["cross"]);
    const copiedCirclePositions = Array.from(positions["circle"]);
    copiedCrossPositions.push(hypothesisPosition);
    copiedCirclePositions.push(hypothesisPosition);

    // To win the game.
    if (isPlayerWin(copiedCrossPositions, "cross")) {
      return hypothesisPosition;
    }

    if (isPlayerWin(copiedCirclePositions, "circle")) {
      defendPositions.push(hypothesisPosition);
    }
  }

  if (defendPositions.length) {
    return defendPositions[0];
  }
  // 如果中間是空的就下中間5
  if (emptyPositions.includes(5)) {
    return 5;
  }
  return emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
}
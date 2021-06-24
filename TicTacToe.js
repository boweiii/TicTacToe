const table = document.querySelector('#app table')

let count = 0
const winLine = [
  // 橫列
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  // 直排
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  // 對角
  [1, 5, 9],
  [3, 5, 7]
]
const circleIndex = []
const crossIndex = []

table.addEventListener('click', function onTableClicked(event) {
  if (event.target.tagName !== 'TD') {
    return
  }
  draw(event.target, count)
  count += 1
  isPlayerWin(circleIndex, "circle")
  isPlayerWin(crossIndex, "cross")
})

function draw(cell, player) {
  if (player % 2 === 0) {
    cell.innerHTML = `<div class="circle"></div>`
    recordPlayerCircle(cell)
  } else {
    cell.innerHTML = `<div class="cross"></div>`
    recordPlayerCross(cell)
  }
}

function isPlayerWin(checkingPosittions, player) {

  winLine.forEach(line => {
    if (line.every(position => checkingPosittions.includes(position))) {
      alert(player + 'wins')
    }
  })
}
// 紀錄 Circle & Cross 下棋位置
function recordPlayerCircle(cell) {
  let chessIndex = cell.dataset.index
  circleIndex.push(Number(chessIndex))
  console.log(circleIndex)
}
function recordPlayerCross(cell) {
  let chessIndex = cell.dataset.index
  crossIndex.push(Number(chessIndex))
  console.log(crossIndex)
}
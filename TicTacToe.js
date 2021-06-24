const table = document.querySelector('#app table')
let count = 0


table.addEventListener('click', function onTableClicked(event) {
  if (event.target.tagName !== 'TD') {
    return
  }
  draw(event.target, count)
  count += 1
})

function draw(cell, player) {
  cell.innerHTML = player % 2 === 0 ? `<div class="circle"></div>` : `<div class="cross"></div>`
}
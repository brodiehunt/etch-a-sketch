
const refreshGridBtn = document.getElementById('refresh_grid_btn');
const colorInputEl = document.getElementById('color_input');
const gridSizeInputEl = document.getElementById('grid_dimension_input');
const eraseBtn = document.getElementById('erase_btn');
const gridContainer = document.getElementById('grid_container_el');

// Variables for states to be tracked
let gridDimensionXY = gridSizeInputEl.value;
let currentColor = colorInputEl.value
let mouseIsDown = false;

refreshGrid();

refreshGridBtn.addEventListener('click', () => {
  refreshGrid();
})

eraseBtn.addEventListener('click', () => {
  currentColor = '#fff';
})

colorInputEl.addEventListener('input', (event) => {
  currentColor = event.target.value;
})

gridSizeInputEl.addEventListener('change', (event) => {
  gridDimensionXY = parseInt(event.target.value);
  refreshGrid();
})





function refreshGrid() {
  deleteGridItems();
  populateNewGrid(gridDimensionXY)
}

function populateNewGrid(rowColumnLength) {
  const itemHeightWidth = 100/rowColumnLength;
  for (let i = 0; i < rowColumnLength; i++) {
    const gridRow = buildGridRow(itemHeightWidth);
    for (let x = 0; x < rowColumnLength; x++) {
      buildGridCell(itemHeightWidth, gridRow)
    } 
    gridContainer.append(gridRow)
  }
}

function buildGridRow(height) {
  let newRow = document.createElement('div');
  newRow.style.height = `${height}%`;
  newRow.classList.add('grid-row');
  return newRow
}

function buildGridCell(width, gridRow) {
  let newItem = document.createElement('div');
  newItem.classList.add('grid-item');
  newItem.style.width = `${width}%`;
  gridRow.append(newItem);
  newItem.addEventListener('mousedown', () => {
    mouseIsDown = true;
  })
  newItem.addEventListener('mouseup', () => {
    mouseIsDown = false;
  })
  newItem.addEventListener('mousemove', (event) => {
    if (mouseIsDown) {
      changeGridColor(event);
    }
  })
}

function deleteGridItems() {
  gridContainer.innerHTML = '';
}





function changeGridColor(event) {
  event.target.style.backgroundColor = currentColor;
}



let arr = [];
let delay = 100;

function resetArray() {
  arr = [];
  for (let i = 0; i < 20; i++) {
    arr.push(Math.floor(Math.random() * 100) + 10);
  }
  drawBars();
}

function drawBars() {
  const bars = document.getElementById("bars");
  bars.innerHTML = "";

  arr.forEach(v => {
    const div = document.createElement("div");
    div.className = "bar";
    div.style.height = v * 2 + "px";
    bars.appendChild(div);
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// 🔥 主控制
async function startSort(type) {
  if (type === "bubble") await bubbleSort();
  if (type === "selection") await selectionSort();
  if (type === "insertion") await insertionSort();
}

// Bubble
async function bubbleSort() {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        drawBars();
        await sleep(delay);
      }
    }
  }
}

// Selection
async function selectionSort() {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
    drawBars();
    await sleep(delay);
  }
}

// Insertion
async function insertionSort() {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
      drawBars();
      await sleep(delay);
    }
    arr[j + 1] = key;
  }
}

resetArray();

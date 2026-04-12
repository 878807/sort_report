let arr = [];
let delay = 100;

let compareCount = 0;
let swapCount = 0;

// 初始化
function resetArray() {
  arr = [];
  compareCount = 0;
  swapCount = 0;

  for (let i = 0; i < 20; i++) {
    arr.push(Math.floor(Math.random() * 100) + 10);
  }

  drawBars();
  updateStats();
}

// 畫圖
function drawBars(active = [], swapped = [], sorted = []) {
  const bars = document.getElementById("bars");
  bars.innerHTML = "";

  arr.forEach((v, i) => {
    const div = document.createElement("div");
    div.className = "bar";
    div.style.height = v * 2 + "px";

    if (active.includes(i)) div.classList.add("active");
    if (swapped.includes(i)) div.classList.add("swap");
    if (sorted.includes(i)) div.classList.add("sorted");

    bars.appendChild(div);
  });
}

// 統計
function updateStats() {
  document.getElementById("compare").innerText = compareCount;
  document.getElementById("swap").innerText = swapCount;
}

// 延遲
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// 主控制
async function startSort(type) {
  if (type === "bubble") await bubbleSort();
  if (type === "selection") await selectionSort();
  if (type === "insertion") await insertionSort();
}

// 🔥 Bubble
async function bubbleSort() {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {

      compareCount++;
      drawBars([j, j+1]);
      updateStats();
      await sleep(delay);

      if (arr[j] > arr[j + 1]) {
        swapCount++;
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        drawBars([], [j, j+1]);
        updateStats();
        await sleep(delay);
      }
    }
  }
}

// 🔥 Selection
async function selectionSort() {
  for (let i = 0; i < arr.length; i++) {
    let min = i;

    for (let j = i + 1; j < arr.length; j++) {
      compareCount++;
      drawBars([j, min]);
      updateStats();
      await sleep(delay);

      if (arr[j] < arr[min]) {
        min = j;
      }
    }

    swapCount++;
    [arr[i], arr[min]] = [arr[min], arr[i]];
    drawBars([], [i, min]);
    updateStats();
    await sleep(delay);
  }
}

// 🔥 Insertion
async function insertionSort() {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      compareCount++;
      arr[j + 1] = arr[j];
      drawBars([j]);
      updateStats();
      await sleep(delay);
      j--;
    }

    arr[j + 1] = key;
    swapCount++;
    drawBars([], [j+1]);
    updateStats();
    await sleep(delay);
  }
}function generateArray() {
    const bars = document.getElementById("bars");
    bars.innerHTML = "";

    let arr = [];

    for (let i = 0; i < 20; i++) {
        let value = Math.floor(Math.random() * 100) + 10;
        arr.push(value);

        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value + "px";

        bars.appendChild(bar);
    }

    return arr;
}

let array = generateArray();

function resetArray() {
    array = generateArray();
}

async function startSort(type) {
    if (type === "bubble") {
        await bubbleSort();
    }
}

async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

            bars[j].style.background = "red";
            bars[j + 1].style.background = "red";

            await sleep(100);

            if (array[j] > array[j + 1]) {
                // swap
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = array[j] + "px";
                bars[j + 1].style.height = array[j + 1] + "px";
            }

            bars[j].style.background = "steelblue";
            bars[j + 1].style.background = "steelblue";
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

resetArray();

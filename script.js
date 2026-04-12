let arr = [];
let delay = 100;

let compareCount = 0;
let swapCount = 0;

// 初始化
function resetArray() {
  const bars = document.getElementById("bars");
  if (!bars) return;

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
  if (!bars) return;

  bars.innerHTML = "";

  arr.forEach((v, i) => {
    const div = document.createElement("div");
    div.className = "bar";
    div.style.height = (v * 2) + "px";

    if (active.includes(i)) div.classList.add("active");
    if (swapped.includes(i)) div.classList.add("swap");
    if (sorted.includes(i)) div.classList.add("sorted");

    bars.appendChild(div);
  });
}

// 統計
function updateStats() {
  const c = document.getElementById("compare");
  const s = document.getElementById("swap");

  if (c) c.innerText = compareCount;
  if (s) s.innerText = swapCount;
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

  // 排序完成全部變綠
  drawBars([], [], arr.map((_, i) => i));
}

// Bubble Sort
async function bubbleSort() {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {

      compareCount++;
      drawBars([j, j + 1]);
      updateStats();
      await sleep(delay);

      if (arr[j] > arr[j + 1]) {
        swapCount++;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        drawBars([], [j, j + 1]);
        updateStats();
        await sleep(delay);
      }
    }
  }
}

// Selection Sort
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

    if (min !== i) {
      swapCount++;
      [arr[i], arr[min]] = [arr[min], arr[i]];

      drawBars([], [i, min]);
      updateStats();
      await sleep(delay);
    }
  }
}

// Insertion Sort（🔥 已修正）
async function insertionSort() {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0) {
      compareCount++;

      if (arr[j] > key) {
        arr[j + 1] = arr[j];

        drawBars([j]);
        updateStats();
        await sleep(delay);

        j--;
      } else {
        break;
      }
    }

    arr[j + 1] = key;
    swapCount++;

    drawBars([], [j + 1]);
    updateStats();
    await sleep(delay);
  }
}

// 🔥 最重要：確保 DOM 完全載入後才執行
document.addEventListener("DOMContentLoaded", function () {
  resetArray();
});

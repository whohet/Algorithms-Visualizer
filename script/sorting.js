var container = document.getElementById("array");
var arr = [];
generate();
document.getElementById("speed").defaultValue = 2;
var delay = 100;
//generate values
function generate() {
    arr = [];
    container.innerText = "";
    var n = Number(document.getElementById("display").innerText);
    var w = (100) / n;
    for (var i = 0; i < n; i++) {
        var value = Math.floor(Math.random() * 91) + 10;
        var newblock = document.createElement("div");
        newblock.classList.add("block");
        newblock.style.width = (String(w) + "%");
        newblock.style.height = (String(value * 5) + "px");
        arr.push(value);
        container.appendChild(newblock);
    }
}
//update slide text
function updateInput(val) {
    document.getElementById("display").innerText = val;
}

function updateSpeed(val) {
    document.getElementById("displayspeed").innerText = String(val) + "x";
    if (val == 1) {
        delay = 200;
    } else if (val == 2) {
        delay = 100;
    } else if (val == 3) {
        delay = 50;
    } else if (val == 4) {
        delay = 30;
    }
    console.log(delay);
}
//start sort
function start() {
    var sortalgo = document.getElementById("selectsort").value;
    if (sortalgo == "M") {
        MergeSort();
    } else if (sortalgo == "B") {
        BubbleSort();
    } else if (sortalgo == "I") {
        InsertionSort();
    } else if (sortalgo == "S") {
        SelectionSort();
    } else if (sortalgo == "Q") {
        QuickSort();
    }
}
//Pause

//disable buttons
function inprocess() {
    document.getElementById("generator").disabled = true;
    document.getElementById("rangechange").disabled = true;
    document.getElementById("selectsort").disabled = true;
    document.getElementById("start").disabled = true;
}
//enable buttons
function outprocess() {
    document.getElementById("generator").disabled = false;
    document.getElementById("rangechange").disabled = false;
    document.getElementById("selectsort").disabled = false;
    document.getElementById("start").disabled = false;
}
//Merge Sort Algo
async function MergeSort() {
    inprocess();
    var blocks = document.querySelectorAll(".block");
    var n = blocks.length;
    for (var m = 1; m <= n - 1; m = 2 * m) {
        for (var i = 0; i < n - 1; i += 2 * m) {
            var from = i,
                mid = i + m - 1;
            var to = Math.min(i + 2 * m - 1, n - 1);
            var k = from;
            var i1 = from;
            var j1 = mid + 1;
            var temp = [];
            while (i1 <= mid && j1 <= to) {
                if (arr[i1] < arr[j1]) {
                    temp[k] = arr[i1];
                    k++;
                    i1++
                } else {
                    temp[k] = arr[j1];
                    k++;
                    j1++;
                }
            }
            while (i1 < n && i1 <= mid) {
                temp[k] = arr[i1];
                i1++;
                k++;
            }
            while (j1 < n && j1 <= to) {
                temp[k] = arr[j1];
                j1++;
                k++;
            }
            for (var x = from; x <= to; x++) {
                blocks[x].style.backgroundColor = "yellow";
                await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve();
                    }, delay)
                );
                blocks[x].style.height = String(temp[x] * 5) + "px";
                blocks[x].style.backgroundColor = "blue";
                arr[x] = temp[x];
            }
            blocks = document.querySelectorAll(".block");

        }
    }
    for (var i = 0; i < n; i++) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 10)
        );
        blocks[i].style.backgroundColor = "#03fc07";
    }
    for (var i = 0; i < n; i++) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 10)
        );
        blocks[i].style.backgroundColor = "blue";
    }
    outprocess();
}
//Bubble Sort
async function BubbleSort() {
    inprocess();
    var blocks = document.querySelectorAll(".block");
    for (var i = 0; i < blocks.length; i += 1) {
        for (var j = 0; j < blocks.length - i - 1; j += 1) {
            blocks[j].style.backgroundColor = "orange";
            blocks[j + 1].style.backgroundColor = "orange";

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
            var value1 = Number(arr[j]);
            var value2 = Number(arr[j + 1]);
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1], j);
                blocks = document.querySelectorAll(".block");
            }
            blocks[j].style.backgroundColor = "blue";
            blocks[j + 1].style.backgroundColor = "blue";
        }
        blocks[blocks.length - i - 1].style.backgroundColor = "#03fc07";
    }
    for (var i = 0; i < blocks.length; i++) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 10)
        );
        blocks[i].style.backgroundColor = "blue";
    }
    outprocess();
}
//Swap bubble sort
function swap(el1, el2, j) {
    return new Promise((resolve) => {
        el1.style.backgroundColor = "red";
        el2.style.backgroundColor = "red";
        var temp = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = temp;
        window.requestAnimationFrame(function() {
            setTimeout(() => {
                container.insertBefore(el2, el1);
                resolve();
            }, delay);
        });
        var tmp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = tmp;
    });
}
//Insertion sort
async function InsertionSort() {
    inprocess();
    var blocks = document.querySelectorAll(".block");
    var n = blocks.length;
    for (var i = 1; i < n; i++) {
        var key = arr[i];
        var ele1 = blocks[i];
        var j = i - 1;
        blocks[i].style.backgroundColor = "red";
        var tmp = i;
        while (j >= 0 && arr[j] > key) {
            blocks[j + 1].style.backgroundColor = "red";
            blocks[tmp].style.backgroundColor = "red";
            arr[j + 1] = arr[j];
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
            blocks[j + 1].style.height = String(arr[j + 1] * 5) + "px";
            blocks[j + 1].style.backgroundColor = "blue";
            j--;
        }
        arr[j + 1] = key;
        blocks[j + 1].style.backgroundColor = "red";
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );
        blocks[j + 1].style.height = String(arr[j + 1] * 5) + "px";
        blocks[j + 1].style.backgroundColor = "blue";
        blocks[tmp].style.backgroundColor = "blue";
    }
    for (var i = 0; i < n; i++) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 10)
        );
        blocks[i].style.backgroundColor = "#03fc07";
    }
    for (var i = 0; i < n; i++) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 10)
        );
        blocks[i].style.backgroundColor = "blue";
    }
    outprocess();
}
//SelectionSort
async function SelectionSort() {
    inprocess();
    var blocks = document.querySelectorAll(".block");
    var n = blocks.length;
    for (var i = 0; i < blocks.length; i++) {
        var index = i;
        blocks[index].style.backgroundColor = "orange";
        var value1 = Number(arr[i]);
        for (var j = i + 1; j < n; j++) {
            blocks[j].style.backgroundColor = "red";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
            var value2 = Number(arr[j]);
            if (value2 < value1) {
                if (index != i)
                    blocks[index].style.backgroundColor = "blue";
                index = j;
                value1 = Number(arr[index]);
                blocks[index].style.backgroundColor = "yellow";
            } else {
                await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve();
                    }, delay)
                );
                blocks[j].style.backgroundColor = "blue";
            }
        }
        if (i != index) {
            blocks[index].style.height = String(arr[i] * 5) + "px";
            blocks[i].style.height = String(arr[index] * 5) + "px";
            [arr[i], arr[index]] = [arr[index], arr[i]];
            blocks = document.querySelectorAll(".block");
            blocks[index].style.backgroundColor = "blue";
        }
        blocks[i].style.backgroundColor = "#03fc07";
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );
    }
    for (var i = 0; i < n; i++) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 10)
        );
        blocks[i].style.backgroundColor = "blue";
    }
    outprocess();
}
//quicksort
async function QuickSort() {
    inprocess();
    var stack = [];
    var top = -1;
    var blocks = document.querySelectorAll(".block");
    var n = blocks.length;
    stack[++top] = 0;
    stack[++top] = n - 1;
    while (top >= 0) {
        var h = stack[top--];
        var l = stack[top--];
        //partition start
        var x = arr[h];
        var i = l - 1;
        for (var j = l; j <= h - 1; j++) {
            blocks[j].style.backgroundColor = "red";
            var tmp = Number(i + 1);
            blocks[tmp].style.backgroundColor = "red";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
            var changed = 0;
            if (arr[j] <= x) {
                blocks[j].style.backgroundColor = "#03fc07";
                blocks[tmp].style.backgroundColor = "#03fc07";
                await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve();
                    }, delay)
                );
                i++;
                blocks[i].style.height = String(arr[j] * 5) + "px";
                blocks[j].style.height = String(arr[i] * 5) + "px";
                [arr[i], arr[j]] = [arr[j], arr[i]];
                changed = 1;
            }
            blocks[j].style.backgroundColor = "blue";
            blocks[tmp].style.backgroundColor = "blue";
        }
        blocks[i + 1].style.backgroundColor = "#03fc07";
        blocks[h].style.backgroundColor = "#03fc07";
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );
        blocks[i + 1].style.height = String(arr[h] * 5) + "px";
        blocks[h].style.height = String(arr[i + 1] * 5) + "px";
        [arr[i + 1], arr[h]] = [arr[h], arr[i + 1]];
        blocks[i + 1].style.backgroundColor = "blue";
        blocks[h].style.backgroundColor = "blue";
        var p = i + 1;

        //partition stop

        if (p - 1 > l) {

            stack[++top] = l;
            stack[++top] = p - 1;
        }
        if (p + 1 < h) {
            stack[++top] = p + 1;
            stack[++top] = h;
        }
    }
    for (var i = 0; i < n; i++) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 10)
        );
        blocks[i].style.backgroundColor = "#03fc07";
    }
    for (var i = 0; i < n; i++) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 10)
        );
        blocks[i].style.backgroundColor = "blue";
    }
    outprocess();
}
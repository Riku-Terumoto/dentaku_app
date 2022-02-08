//要素取得
const num_btn = document.querySelectorAll(".js-num-btn");
const display = document.querySelector(".display");
const equal_btn = document.getElementById("equal-btn");
const clear_btn = document.getElementById("clear-btn");
let total = 0;
let state = "start";//状態
let mode = "integer_mode";//整数入力モード


// 1-9の数字ボタンを押した時
const one_nine = document.querySelectorAll(".one_nine");
one_nine.forEach( index => {
    index.addEventListener("click", () => {
        if (state === "start") {
            total = index.dataset.indexId;
        }else if (state === "finish") {
            reset();
            total = index.dataset.indexId;
        }else if (state === "calculation") {
            total += index.dataset.indexId;
        }
        display.setAttribute("value",total);
        state = 'calculation';//数字を入力している状態にする。
    });
});

// 0の数字ボタンを押した時
const zero = document.getElementById("zero");
zero.addEventListener("click", () => {
    if(total === 0) {
        return; 
    }else{
        total += zero.dataset.indexId;
    } 
    display.setAttribute("value",total);
    state = 'calculation';//数字を入力している状態にする。
});

// 「.」小数点ボタンを押した時
const point = document.getElementById("point");
point.addEventListener("click", () => {
    if (mode === "decimal_mode") {
        return;
    }else{
        total += point.dataset.indexId; 
    } 
    display.setAttribute("value",total);
    state = 'calculation';//数字を入力している状態にする。
    mode = 'decimal_mode'; //小数入力モードに変更
});

//「＋　÷　－　×」ボタンを押した時
const cal = document.querySelectorAll(".cal");
cal.forEach( index => {     
    index.addEventListener("click", () => {
        if (state === "start") {
            return;
        }else if (state === "calculation") {
            total += index.dataset.indexId;
        }else if (state === "finish") {
            total = display.getAttribute("value");
            total += index.dataset.indexId;
        }
        display.setAttribute("value",total);
        state = 'calBtn';//演算記号を入力している状態する。
        mode = "integer_mode";
    }); //click   
});
// 計算終了後(state === "finish") はBSを押せない。
// それ以外の時は、最初から最後から二文字目までをtotalに代入（最後の一文字を除きtotalに代入する）
// slice関数
// str.slice(0, -1) は、文字列から 0 番目の文字から最後から 2 番目の文字までを取り出します。
// BSボタン（バックスペース）を押した時
const bs = document.getElementById("backspace-btn");
bs.addEventListener("click", () => {
    if (state === "finish") {
        return;
    }else{
        total = total.slice(0,-1);
        display.setAttribute("value",total);
    }
});


equal_btn.addEventListener("click", () => {
    // totalの中身を計算したい
    // 計算結果を画面出力
    total = new Function("return " + total);
    if (display.value !== ""){
        display.setAttribute("value",total());
        state = "finish";
        mode = "integer_mode";
    }
});
clear_btn.addEventListener("click", () => {
    reset();
});

function reset(){
    total = 0;
    state = "start";
    mode = "integer_mode";
    display.setAttribute("value",total);
};










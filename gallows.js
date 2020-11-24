let answer = document.querySelector("#answer"),
    submit = document.querySelector("#submit"),
    sercetWord = document.querySelector(".secret-word"),
    words = ["виселица","яблоко","самолет","компьютер", "коловорот"],
    arr_ru = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'э', 'ю', 'я', 'ь', 'ы', 'ы'],
    steps = 0,
    score = 0;

answer.oninput = (e) => {

    let firstLetter = answer.value[0];

    if (answer.value.length > 0) {
        if (arr_ru.indexOf(firstLetter) != -1) {
            answer.value = '';
            answer.value = firstLetter;
        } else {
            answer.value = '';
        }
    }
}

submit.onclick = (e) => {
    e.preventDefault();
    if (answer.value == '') {
        return;
    } else {
        let symbol = answer.value.toLowerCase();

        if (checkSymbol(symbol) === 1) {
            for (let i in word) {
                if(word[i] === symbol) {
                    word = word.replace(symbol, '');
                }
            }
            showSymbol(symbol);
            answer.value = '';
        }
        steps++;
        document.querySelector(".info-steps").innerText = steps;
    }
}

function randomInteger (min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function randomWord () {
    let index = randomInteger(1, words.length) - 1;
    return words[index];
}

let word = randomWord();

for (let i = 0; i < word.length; i++) {
    let span = document.createElement("span");
    span.classList.add("secret-symbol");
    span.setAttribute("data-secret-symbol", word[i])
    span.innerText = "-";
    sercetWord.appendChild(span);
}

function checkSymbol (symbol) {
    if (word.search(symbol) != -1) {
        return 1;
    } else {
        return 0;
    }
}

function showSymbol (symbol) {
   let spans = document.querySelectorAll(".secret-symbol");

   for (i = 0; i < spans.length; i++) {
       if (spans[i].getAttribute("data-secret-symbol") == symbol) {
           spans[i].classList.remove("secret-symbol");
           spans[i].classList.add("open-symbol");
           spans[i].innerText = symbol;
           score++;
           document.querySelector(".info-score").innerText = score;
       }
   }
}

console.log("sercet word:", word);
console.log("length:", word.length);

addNote();

let txt_area = document.getElementById("txt");
let butt = document.querySelector(".addBtn");

// console.log(txt.value);
butt.addEventListener("click", function(e) {

    let stor = localStorage.getItem("stor")
    if (stor == null) {
        storeObj = [];
    } else {
        storeObj = JSON.parse(stor);
    }
    storeObj.push(txt_area.value);
    localStorage.setItem("stor", JSON.stringify(storeObj));
    txt_area.value = "";
    addNote();
    // console.log(storeObj);
});

function addNote() {
    let stor = localStorage.getItem("stor")
    if (stor == null) {
        storeObj = [];
    } else {
        storeObj = JSON.parse(stor);
    }
    let collect = "";
    storeObj.forEach(function(element, index) {
        collect += `<div class="card-body">
        <h2 class="card-H">Note${index+1}</h2>
        <p class="card-text">${element}</p>
        <button class="del" id="${index}" onclick="deletNote(this.id)">Delete</button>
    </div>`;
    });
    let noteMade = document.querySelector(".bottom");
    if (storeObj.length != 0) {
        noteMade.innerHTML = collect;
    } else {
        noteMade.style.color = "white";
        noteMade.innerHTML = `<h1>Please add something</h1>`;

    }
}

function deletNote(index) {
    // console.log(index);
    let stor = localStorage.getItem("stor")
    if (stor == null) {
        storeObj = [];
    } else {
        storeObj = JSON.parse(stor);
    }
    storeObj.splice(index, 1);
    localStorage.setItem("stor", JSON.stringify(storeObj));
    addNote();
}
let serch = document.getElementById("search");
serch.addEventListener("input", function() {
    let inpVal = serch.value.toLowerCase();
    let cardNote = document.getElementsByClassName("card-body");
    Array.from(cardNote).forEach(function(element) {
        // console.log(cardNote);
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inpVal)) {
            element.style.display = "block";
        } else {

            element.style.display = "none";
        }

    })

});









const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

const numBalls = 50;
const balls = [];

for (let i = 0; i < numBalls; i++) {
    let ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.background = colors[Math.floor(Math.random() * colors.length)];
    ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
    ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
    ball.style.transform = `scale(${Math.random()})`;
    ball.style.width = `${Math.random()}vh`;
    ball.style.height = ball.style.width;

    balls.push(ball);
    document.body.append(ball);
}

// Keyframes for balls
balls.forEach((el, i, ra) => {
    let to = {
        x: Math.random() * (i % 2 === 0 ? -11 : 11),
        y: Math.random() * 12
    };

    let anim = el.animate(
        [
            { transform: "translate(0, 0)" },
            { transform: `translate(${to.x}rem, ${to.y}rem)` }
        ], {
            duration: (Math.random() + 1) * 2000, // random duration
            direction: "alternate",
            fill: "both",
            iterations: Infinity,
            easing: "ease-in-out"
        }
    );
});
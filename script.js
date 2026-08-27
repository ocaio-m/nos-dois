console.log("Site iniciado!");


// =========================
// ELEMENTOS
// =========================

const bubbleSound =
    document.getElementById("bubble-sound");

const bumbleCircle =
    document.getElementById("bumble-circle");

const bumbleContainer =
    document.getElementById("bumble-container");

const personYou =
    document.getElementById("person-you");

const personHer =
    document.getElementById("person-her");

const svg =
    document.getElementById("connection-lines");

const lineYou =
    document.getElementById("line-you");

const lineHer =
    document.getElementById("line-her");

const lineBottom =
    document.getElementById("line-bottom");

const chatIcon =
    document.getElementById("chat-icon");

const chatX =
    document.getElementById("chat-x");

const banIcon =
    document.getElementById("ban-icon");


// =========================
// SOM
// =========================

function playBubble() {

    bubbleSound.currentTime = 0;

    bubbleSound.play();

}


// =========================
// LINHAS LATERAIS
// =========================

function prepareLine(line, startElement, endElement) {

    const startRect =
        startElement.getBoundingClientRect();

    const endRect =
        endElement.getBoundingClientRect();

    const svgRect =
        svg.getBoundingClientRect();


    // Centro do elemento inicial

    const startCenter = {

        x:
            startRect.left +
            startRect.width / 2,

        y:
            startRect.top +
            startRect.height / 2

    };


    // Centro do elemento final

    const endCenter = {

        x:
            endRect.left +
            endRect.width / 2,

        y:
            endRect.top +
            endRect.height / 2

    };


    // Direção

    const dx =
        endCenter.x -
        startCenter.x;

    const dy =
        endCenter.y -
        startCenter.y;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    const dirX =
        dx / distance;

    const dirY =
        dy / distance;


    // Raios dos círculos

    const startRadius =
        Math.min(
            startRect.width,
            startRect.height
        ) / 2;

    const endRadius =
        Math.min(
            endRect.width,
            endRect.height
        ) / 2;


    // Começa na borda

    const startX =
        startCenter.x +
        dirX * startRadius;

    const startY =
        startCenter.y +
        dirY * startRadius;


    // Termina na borda

    const endX =
        endCenter.x -
        dirX * endRadius;

    const endY =
        endCenter.y -
        dirY * endRadius;


    // Converte para SVG

    const x1 =
        ((startX - svgRect.left) /
            svgRect.width) * 100;

    const y1 =
        ((startY - svgRect.top) /
            svgRect.height) * 100;

    const x2 =
        ((endX - svgRect.left) /
            svgRect.width) * 100;

    const y2 =
        ((endY - svgRect.top) /
            svgRect.height) * 100;


    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);


    // Comprimento

    const length =
        line.getTotalLength();


    line.style.strokeDasharray =
        length;

    line.style.strokeDashoffset =
        length;

    line.style.opacity =
        "1";


    // Força atualização

    line.getBoundingClientRect();


    // Anima

    line.style.transition =
        "stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1)";

    line.style.strokeDashoffset =
        "0";

}


// =========================
// POSICIONAR ÍCONES
// =========================

function positionIcons() {

    /*
        CHAT
        Coloca o ícone exatamente
        no centro da linha inferior.
    */

    const lineRect =
        lineBottom.getBoundingClientRect();


    const chatXPosition =
        lineRect.left +
        lineRect.width / 2;


    const chatYPosition =
        lineRect.top +
        lineRect.height / 2;


    chatIcon.style.left =
        `${chatXPosition}px`;

    chatIcon.style.top =
        `${chatYPosition}px`;


    /*
        X
        Fica exatamente sobre o chat.
    */

    chatX.style.left =
        `${chatXPosition}px`;

    chatX.style.top =
        `${chatYPosition}px`;


    /*
        BANIMENTO
        Fica no centro da sua foto.
    */

    const youRect =
        personYou.getBoundingClientRect();


    const banXPosition =
        youRect.left +
        youRect.width / 2;


    const banYPosition =
        youRect.top +
        youRect.height / 2;


    banIcon.style.left =
        `${banXPosition}px`;

    banIcon.style.top =
        `${banYPosition}px`;

}


// =========================
// CLIQUE NO BUMBLE
// =========================

bumbleCircle.addEventListener("click", () => {


    // SOM DO BUMBLE

    playBubble();


    // BUMBLE SOBE

    bumbleContainer.style.transform =
        "translateY(-80px)";


    // =========================
    // SUA FOTO
    // =========================

    setTimeout(() => {

        personYou.classList.add(
            "person-show"
        );

        playBubble();

    }, 600);


    // =========================
    // FOTO DELA
    // =========================

    setTimeout(() => {

        personHer.classList.add(
            "person-show"
        );

        playBubble();

    }, 1200);


    // =========================
    // LINHA → VOCÊ
    // =========================

    setTimeout(() => {

        prepareLine(
            lineYou,
            bumbleCircle,
            personYou
        );

    }, 1900);


    // =========================
    // LINHA → ELA
    // =========================

    setTimeout(() => {

        prepareLine(
            lineHer,
            bumbleCircle,
            personHer
        );

    }, 2500);



    setTimeout(() => {

        const youRect =
            personYou.getBoundingClientRect();

        const herRect =
            personHer.getBoundingClientRect();

        const svgRect =
            svg.getBoundingClientRect();




        const startX =
            youRect.left;




        const endX =
            herRect.right;




        const y =
            youRect.top +
            youRect.height / 2;




        const x1 =
            ((startX - svgRect.left) /
                svgRect.width) * 100;

        const x2 =
            ((endX - svgRect.left) /
                svgRect.width) * 100;

        const yPosition =
            ((y - svgRect.top) /
                svgRect.height) * 100;


        lineBottom.setAttribute(
            "x1",
            x1
        );

        lineBottom.setAttribute(
            "y1",
            yPosition
        );

        lineBottom.setAttribute(
            "x2",
            x2
        );

        lineBottom.setAttribute(
            "y2",
            yPosition
        );


        // Comprimento

        const length =
            lineBottom.getTotalLength();


        lineBottom.style.strokeDasharray =
            length;

        lineBottom.style.strokeDashoffset =
            length;

        lineBottom.style.opacity =
            "1";


        // Força atualização

        lineBottom.getBoundingClientRect();


        // Anima

        lineBottom.style.transition =
            "stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1)";

        lineBottom.style.strokeDashoffset =
            "0";


    }, 3100);


    // =========================
    // CHAT
    // =========================

    setTimeout(() => {

        // Primeiro calcula a posição
        // real da linha no dispositivo

        positionIcons();


        // Depois aparece

        chatIcon.classList.add(
            "chat-show"
        );


    }, 4000);


    // =========================
    // X + BANIMENTO
    // =========================

    setTimeout(() => {

        // Recalcula a posição
        // antes de mostrar

        positionIcons();


        chatX.classList.add(
            "x-show"
        );


        banIcon.classList.add(
            "ban-show"
        );


    }, 4800);


});


// =========================
// RESPONSIVIDADE
// =========================

window.addEventListener("resize", () => {

    if (
        chatIcon.classList.contains("chat-show") ||
        chatX.classList.contains("x-show") ||
        banIcon.classList.contains("ban-show")
    ) {

        positionIcons();

    }

});
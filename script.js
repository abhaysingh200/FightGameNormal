var dragon = document.querySelector('.dragon');
let dino3 = document.querySelector('.dino');
var play = document.querySelector('#play');
var intervalId; // Variable to store the interval ID
let totalscore = document.getElementById("totalscore");
let privouScore = document.getElementById("previousScore");
let backgroundsong = document.createElement('audio');
backgroundsong.src = 'music.mp3';
backgroundsong.loop = true;
let dinosong = document.createElement('audio');
dinosong.src = 'gameover.mp3';

let prev=0;
let score = 0;
let round = true;
backgroundsong.volume=0.2


play.addEventListener("click", () => {
    if (play.innerText == "Start") {
        backgroundsong.play();
        totalscore.innerText = "currentScore= " + score;
        play.innerText = "Stop";
        dragon.style.right=0;
        dragon.style.animationDuration = '3s';
        

        document.onkeydown = function (e) {
            if (e.keyCode == 38) {
                setTimeout(()=>{
                    dinosong.play();
                },1000);
                dino3.classList.add('animateDino');
                setTimeout(() => {
                    dino3.classList.remove('animateDino');

                }, 700);
            }
            if (e.keyCode == 37) {
                let dx = parseInt(window.getComputedStyle(dino3).getPropertyValue('left'));

                if (dx > 50) {
                    dino3.style.left = (dx - 112) + "px";
                }
            }
            if (e.keyCode == 39) {
                let dx = parseInt(window.getComputedStyle(dino3).getPropertyValue('left'));
                if (dx < 1100) {
                    dino3.style.left = (dx + 112) + "px";
                }
            }
        };

        intervalId = setInterval(() => {
            let dragon = document.querySelector('.dragon');
            let dino = document.querySelector('.dino');

            let dx = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
            let dy = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));

            let dix = parseInt(window.getComputedStyle(dragon).getPropertyValue('left'));
            let diy = parseInt(window.getComputedStyle(dragon).getPropertyValue('top'));

            let offsetX = Math.abs(dx - dix);
            let offsetY = Math.abs(dy - diy);

            if (offsetX < 300 && offsetY < 30) {
                dragon.style.animationDuration = '0s';
                dino3.classList.remove('animateDino');
                dino3.style.left = "500px";
                dinosong.pause();
                backgroundsong.pause();
                privouScore.innerText="previous score= "+score;
                totalscore.innerText = "currentScore= " + score;
                score=0;
                
                
                play.innerText = "Start";
                clearInterval(intervalId);
                document.onkeydown = null;
            } 
            
            else if (offsetX < 100 && round) {
                score += 1;
                totalscore.innerText = "currentScore= " + score;
                round = false;

                setTimeout(() => {
                    round = true;
                }, 1000);

        }
        

        }, 10); // Check more frequently for collision and score updates
    } else {
        privouScore.innerText="previous score= "+score;
        totalscore.innerText="currentScore= " + 0;
        play.innerText = "Start";
        dinosong.pause();
        backgroundsong.pause();
        score=0;
        clearInterval(intervalId); // Clear the interval to stop the loop
        document.onkeydown = null; // Remove the keydown event listener
        dragon.style.animationDuration = '0s';
    }
    
});

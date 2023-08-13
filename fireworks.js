

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


//canvas init setting
canvas.style.backgroundColor = "black";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles=[];

function create_particle(x,y,vx,vy,color){
    let particle={
        x,y,
        vx,vy,
        radius:3,
        color:color,
        life:100,
        x_history:[],
        y_history:[]
    };
    particles.push(particle);
}


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i = 0;i<particles.length;i++){
        const particle = particles[i];
        particle.x_history.push(particle.x);
        particle.y_history.push(particle.y);
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (3<particle.x_history.length){
            particle.x_history.shift();
            particle.y_history.shift();
        }
        particle.vy += gravity;
        particle.life--;

        ctx.beginPath();
        ctx.arc(particle.x,particle.y,particle.radius,0,Math.PI*2);
        ctx.fillStyle = `hsl(${particle.color}, 100%, 50%)`;
        ctx.fill();

        ctx.beginPath();
        for (let i=0;i<particle.x_history.length;i++){
            ctx.arc(particle.x_history[i], particle.y_history[i], particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${particle.color}, 100%, ${i*5}%)`;
            ctx.fill();
        }
        ctx.closePath();
        if (particle.life <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}


const music = new Audio('sound.mp3');
canvas.addEventListener('click', (event) => {

    music.currentTime = 0;
    music.play();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const base_color = 360*Math.random()
    for (let i = 0; i < 50; i++) {
        const theta = 2*Math.random()*Math.PI;
        const abs_v=  5+5*Math.random();
        create_particle(mouseX, mouseY,
            abs_v*Math.cos(theta),
            abs_v*Math.sin(theta),
            color = base_color+Math.random() * 60);
    }
});


const gravity=0.5;
animate();
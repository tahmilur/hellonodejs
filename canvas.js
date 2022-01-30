// https://www.youtube.com/watch?v=Yvz_axxWG4Y&t=1649s
// https://www.youtube.com/watch?v=GXvNEwu9cgM

let hue = 0;
const particlesArray = [];
const mouse = { x:undefined, y:undefined };
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); 
// console.log(ctx);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;  

    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());        
    }    
});

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;

    for (let i = 0; i < 2; i++) {
        particlesArray.push(new Particle());        
    }    
});

// particle
class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ' , 100%, 50%)';
    }
    
    update(){
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.size > 0.2) this.size -=0.1;
    }

    draw(){

        ctx.fillStyle = this.color;
        // ctx.fillStyle ='green';
        // ctx.strokeStyle ='red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.size, 0, Math.PI*2);
        // ctx.stroke();
        ctx.fill();        
    }
}


function  init() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());        
    }
}

init();

function  handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();  
        particlesArray[i].draw();        
        
        /*
        for (let j = 0; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < 100){
                ctx.beginPath();
                ctx.stockStyle =particlesArray[i].color;
                ctx.lineWidth =particlesArray[i].size/10;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
        */

        if( particlesArray[i].size <= 0.3){
            particlesArray.splice(i,1);
            i--;
        }        
    }
}

function  animate() {
    ctx.clearRect(0,0, canvas.width, canvas.width);

    // const img = document.createElement("img");
    var img = new Image();
    img.src = 'tree.jpg';
    ctx.drawImage(img, 0,0);

    // ctx.fillStyle ='black';
    // ctx.fillStyle ='rgba(0,0,0,0.1)';
    // ctx.fillStyle ='rgba(0,0,0,0.02)';
    // ctx.fillRect(0,0, canvas.width, canvas.height);
    handleParticles();

    hue++; if(hue>360) hue = 0;

    console.log(particlesArray.length);
    requestAnimationFrame(animate);
}

animate();

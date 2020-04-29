const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = document.body.clientWidth;
const height = document.body.clientHeight;
canvas.width = width;
canvas.height = height;

let nodes = [];
let node_count = 5;

class Node {
  constructor() {
    this.angle = Math.floor(Math.random() * 360);
    this.y = Math.random() * width;
    this.x = Math.random() * height;
    this.speed = 3;
    this.radius = 5;
    this.vel_y = Math.cos(this.angle) * this.speed;
    this.vel_x = Math.sin(this.angle) * this.speed;
  }

  draw(ctx) {
    if (this.y >= height || this.y < 0) {
      this.vel_y *= -1;
    }
    if (this.x >= width || this.x < 0) {
      this.vel_x *= -1;
    }
    this.y += this.vel_y;
    this.x += this.vel_x;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
  }
}

function distance(n1, n2) {
  let dx = n1.x - n2.x;
  let dy = n1.y - n2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function check_and_draw_lines(node) {
  let max_distance = 400;
  for (let n of nodes) {
    let dist = distance(node, n);
    if (dist > max_distance) continue;
    // console.log(dist);

    let opacity = 0.8 - (dist / max_distance) * 0.8;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    ctx.moveTo(node.x, node.y);
    ctx.lineTo(n.x, n.y);
    ctx.closePath();
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  nodes.forEach((node) => {
    // draw the nodes
    node.draw(ctx);

    // check the distances and draw the lines between nodes
    check_and_draw_lines(node);
  });
  window.requestAnimationFrame(render);
}
function init() {
  nodes = [];
  for (let i = 0; i < node_count; i++) {
    nodes.push(new Node());
  }
  window.requestAnimationFrame(render);
}

init();

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Player, Projectile, Enemy } from "../core/core";

const canvasRef = ref();

onMounted(() => {
  if (!canvasRef.value) {
    throw new Error("canvas is undefined");
  }
  const canvas: HTMLCanvasElement = canvasRef.value;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error("the canvas's 2D context is null");
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // create a player
  const player = new Player(canvas.width / 2, canvas.height / 2, 25, 'white');

  // create projectile when click mouse
  const projectiles: Projectile[] = [];
  window.addEventListener('click', (event: MouseEvent) => {
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
    const velocity = {x: Math.cos(angle), y: Math.sin(angle)};

    projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, 'red', velocity));
  });

  // create enemy while times over
  const enemies: Enemy[] = [];
  (function spawnEnemies() {
    setInterval(() => {
      const radius = Math.random() * (30 - 5) + 5;

      let x: number;
      let y: number;
      if (Math.random() < 0.5) {
        x = Math.random() * canvas.width;
        y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
      } else {
        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
        y = Math.random() * canvas.height;
      }

      const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
      const velocity = {x: Math.cos(angle), y: Math.sin(angle)};

      enemies.push(new Enemy(x, y, radius, 'blue', velocity));
    }, 1500);
  })();

  // update animate
  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);

    projectiles.forEach((projectile) => {
      projectile.update(ctx);
    });

    enemies.forEach((enemy) => {
      enemy.update(ctx);
    });

    requestAnimationFrame(animate);
  })();

});
</script>

<template>
  <div>
    <canvas ref="canvasRef">
      This web runtime does not support canvas.
    </canvas>
  </div>
</template>

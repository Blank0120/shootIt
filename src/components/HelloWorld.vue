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
  const player = new Player(canvas.width / 2, canvas.height / 2, 10, 'white');

  // create projectile when click mouse
  const projectiles: Projectile[] = [];
  window.addEventListener('click', (event: MouseEvent) => {
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
    const velocity = { x: Math.cos(angle) * 5, y: Math.sin(angle) * 5 };

    projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, 'white', velocity));
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
      const velocity = { x: Math.cos(angle), y: Math.sin(angle) };

      enemies.push(new Enemy(x, y, radius, `hsl(${Math.random() * 360}, 50%, 50%)`, velocity));
    }, 1500);
  })();

  // update animate
  (function animate() {
    const animateID = requestAnimationFrame(animate);
    
    ctx.fillStyle = 'rgb(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);

    projectiles.forEach((projectile, index) => {
      projectile.update(ctx);

      // remove from edges of screen
      if (
        projectile.x + projectile.radius < 0 ||
        projectile.x - projectile.radius > canvas.width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > canvas.height
      ) {
        projectiles.splice(index, 1);
      }
    });

    enemies.forEach((enemy, index) => {
      enemy.update(ctx);

      // remove from edges of screen
      if (
        enemy.x + enemy.radius < 0 ||
        enemy.x - enemy.radius > canvas.width ||
        enemy.y + enemy.radius < 0 ||
        enemy.y - enemy.radius > canvas.height
      ) {
        enemies.splice(index, 1);
      }

      // collision between enemy and player
      const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
      if (dist - enemy.radius - player.radius < 1) {
        cancelAnimationFrame(animateID);
      }

      // collision between enemy and projectile
      projectiles.forEach((projectile, projectileIndex) => {
        const dist = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y);
        if (dist - enemy.radius - projectile.radius < 1) {
          // remove flash with setTimeout
          setTimeout(() => {
            enemies.splice(index, 1);
            projectiles.splice(projectileIndex, 1);
          }, 0);
        }

      });

    });

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

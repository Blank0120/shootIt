<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Player } from "../core/core";

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

  const player = new Player(canvas.width / 2, canvas.height / 2, 25, 'white');
  player.draw(ctx);

})
</script>

<template>
  <div>
    <canvas ref="canvasRef">
      This web runtime does not support canvas.
    </canvas>
  </div>
</template>

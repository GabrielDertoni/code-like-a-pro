<template>
  <div class="glitch"></div>
</template>
<script>
export default {
  name: "Glitch"
};
</script>

<style lang="scss">
.glitch {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: rgba(255, 255, 255, 0.1);

  animation: glitch-anim linear both 5s infinite;
}
@keyframes glitch-anim {
  from {
    top: 0;
  }
  to {
    top: 100%;
  }
}
</style>


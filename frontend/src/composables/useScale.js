import { onMounted, onBeforeUnmount, ref } from 'vue'

// Design canvas locked to 1920x1080; scale to fit any desktop
// (1920x1080 -> scale 1, 1366x768 -> scale ~0.711) so proportions,
// spacing and typography stay pixel-faithful to the mockup.
const DESIGN_W = 1920
const DESIGN_H = 1080

export function useScale() {
  const scale = ref(1)

  const apply = () => {
    const sx = window.innerWidth / DESIGN_W
    const sy = window.innerHeight / DESIGN_H
    scale.value = Math.min(sx, sy)
  }

  onMounted(() => {
    apply()
    window.addEventListener('resize', apply)
  })
  onBeforeUnmount(() => window.removeEventListener('resize', apply))

  return { scale, DESIGN_W, DESIGN_H }
}

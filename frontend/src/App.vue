<template>
  <div class="app-viewport">
    <div
      class="app-stage"
      :style="{ transform: `translate(-50%, -50%) scale(${scale})` }"
    >
      <Dashboard />
    </div>
  </div>
</template>

<script setup>
import Dashboard from '@/views/Dashboard.vue'
import { useScale } from '@/composables/useScale.js'

const { scale } = useScale()
</script>

<style lang="scss" scoped>
.app-viewport {
  position: fixed;
  inset: 0;
  overflow: hidden;
  // Atmospheric glows are anchored to the (unscaled) viewport so they fill the
  // whole frame — including corners and any letterbox border — per the
  // reference: dark navy base + top-center blue glow, upper-left purple &
  // upper-right teal corner glows, lower-left purple wash.
  background-color: var(--bg-deep);
  background-image:
    radial-gradient(60% 52% at 50% -8%, rgba(48, 130, 202, 0.56) 0%, rgba(48, 130, 202, 0) 62%),
    radial-gradient(46% 82% at -6% 26%, rgba(122, 42, 166, 0.52) 0%, rgba(122, 42, 166, 0) 60%),
    radial-gradient(46% 82% at 106% 26%, rgba(24, 166, 182, 0.46) 0%, rgba(24, 166, 182, 0) 60%),
    linear-gradient(180deg, var(--bg-base) 0%, var(--bg-deep) 100%);
}

.app-stage {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1920px;
  height: 1080px;
  transform-origin: center center;
  // Scaled decorative texture only (transparent base so the viewport glows show
  // through here and through the semi-transparent panels): the ghost world map +
  // faint HUD rings (self-contained SVG, ~5% opacity) and the fine cyan tech grid.
  background-color: transparent;
  background-image:
    url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221920%22%20height%3D%221080%22%20viewBox%3D%220%200%201920%201080%22%3E%3Cline%20x1%3D%22560%22%20y1%3D%22470%22%20x2%3D%221360%22%20y2%3D%22470%22%20stroke%3D%22%235abedc%22%20stroke-opacity%3D%220.035%22%20stroke-width%3D%221%22%2F%3E%3Cline%20x1%3D%22560%22%20y1%3D%22560%22%20x2%3D%221360%22%20y2%3D%22560%22%20stroke%3D%22%235abedc%22%20stroke-opacity%3D%220.035%22%20stroke-width%3D%221%22%2F%3E%3Cline%20x1%3D%22560%22%20y1%3D%22650%22%20x2%3D%221360%22%20y2%3D%22650%22%20stroke%3D%22%235abedc%22%20stroke-opacity%3D%220.035%22%20stroke-width%3D%221%22%2F%3E%3Cpath%20d%3D%22M600%2C470%20L690%2C452%20L760%2C495%20L735%2C560%20L660%2C585%20L604%2C530%20Z%22%20fill%3D%22%239fdcff%22%20fill-opacity%3D%220.05%22%20stroke%3D%22%237fe3ff%22%20stroke-opacity%3D%220.07%22%20stroke-width%3D%221.2%22%2F%3E%3Cpath%20d%3D%22M792%2C430%20L835%2C440%20L812%2C472%20L778%2C458%20Z%22%20fill%3D%22%239fdcff%22%20fill-opacity%3D%220.05%22%20stroke%3D%22%237fe3ff%22%20stroke-opacity%3D%220.07%22%20stroke-width%3D%221.2%22%2F%3E%3Cpath%20d%3D%22M712%2C620%20L762%2C606%20L788%2C678%20L744%2C758%20L706%2C700%20L704%2C648%20Z%22%20fill%3D%22%239fdcff%22%20fill-opacity%3D%220.05%22%20stroke%3D%22%237fe3ff%22%20stroke-opacity%3D%220.07%22%20stroke-width%3D%221.2%22%2F%3E%3Cpath%20d%3D%22M930%2C470%20L992%2C462%20L996%2C500%20L940%2C512%20L922%2C488%20Z%22%20fill%3D%22%239fdcff%22%20fill-opacity%3D%220.05%22%20stroke%3D%22%237fe3ff%22%20stroke-opacity%3D%220.07%22%20stroke-width%3D%221.2%22%2F%3E%3Cpath%20d%3D%22M948%2C528%20L1016%2C520%20L1040%2C592%20L1004%2C676%20L958%2C652%20L940%2C580%20Z%22%20fill%3D%22%239fdcff%22%20fill-opacity%3D%220.05%22%20stroke%3D%22%237fe3ff%22%20stroke-opacity%3D%220.07%22%20stroke-width%3D%221.2%22%2F%3E%3Cpath%20d%3D%22M1006%2C452%20L1196%2C444%20L1258%2C500%20L1214%2C552%20L1064%2C540%20L1012%2C500%20Z%22%20fill%3D%22%239fdcff%22%20fill-opacity%3D%220.05%22%20stroke%3D%22%237fe3ff%22%20stroke-opacity%3D%220.07%22%20stroke-width%3D%221.2%22%2F%3E%3Cpath%20d%3D%22M1086%2C548%20L1118%2C542%20L1130%2C590%20L1096%2C596%20Z%22%20fill%3D%22%239fdcff%22%20fill-opacity%3D%220.05%22%20stroke%3D%22%237fe3ff%22%20stroke-opacity%3D%220.07%22%20stroke-width%3D%221.2%22%2F%3E%3Cpath%20d%3D%22M1230%2C560%20L1268%2C556%20L1276%2C586%20L1240%2C592%20Z%22%20fill%3D%22%239fdcff%22%20fill-opacity%3D%220.05%22%20stroke%3D%22%237fe3ff%22%20stroke-opacity%3D%220.07%22%20stroke-width%3D%221.2%22%2F%3E%3Cpath%20d%3D%22M1236%2C672%20L1312%2C666%20L1324%2C722%20L1258%2C734%20L1230%2C700%20Z%22%20fill%3D%22%239fdcff%22%20fill-opacity%3D%220.05%22%20stroke%3D%22%237fe3ff%22%20stroke-opacity%3D%220.07%22%20stroke-width%3D%221.2%22%2F%3E%3Ccircle%20cx%3D%22430%22%20cy%3D%22560%22%20r%3D%2270%22%20fill%3D%22none%22%20stroke%3D%22%2363c8e0%22%20stroke-opacity%3D%220.05%22%20stroke-width%3D%221%22%2F%3E%3Ccircle%20cx%3D%22430%22%20cy%3D%22560%22%20r%3D%22120%22%20fill%3D%22none%22%20stroke%3D%22%2363c8e0%22%20stroke-opacity%3D%220.05%22%20stroke-width%3D%221%22%2F%3E%3Ccircle%20cx%3D%22430%22%20cy%3D%22560%22%20r%3D%22170%22%20fill%3D%22none%22%20stroke%3D%22%2363c8e0%22%20stroke-opacity%3D%220.05%22%20stroke-width%3D%221%22%2F%3E%3Ccircle%20cx%3D%22430%22%20cy%3D%22560%22%20r%3D%226%22%20fill%3D%22%2363c8e0%22%20fill-opacity%3D%220.10%22%2F%3E%3Ccircle%20cx%3D%221500%22%20cy%3D%22560%22%20r%3D%2270%22%20fill%3D%22none%22%20stroke%3D%22%2363c8e0%22%20stroke-opacity%3D%220.05%22%20stroke-width%3D%221%22%2F%3E%3Ccircle%20cx%3D%221500%22%20cy%3D%22560%22%20r%3D%22120%22%20fill%3D%22none%22%20stroke%3D%22%2363c8e0%22%20stroke-opacity%3D%220.05%22%20stroke-width%3D%221%22%2F%3E%3Ccircle%20cx%3D%221500%22%20cy%3D%22560%22%20r%3D%22170%22%20fill%3D%22none%22%20stroke%3D%22%2363c8e0%22%20stroke-opacity%3D%220.05%22%20stroke-width%3D%221%22%2F%3E%3Ccircle%20cx%3D%221500%22%20cy%3D%22560%22%20r%3D%226%22%20fill%3D%22%2363c8e0%22%20fill-opacity%3D%220.10%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(rgba(90, 190, 220, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(90, 190, 220, 0.05) 1px, transparent 1px);
  background-repeat: no-repeat, repeat, repeat;
  background-size: 1920px 1080px, 44px 44px, 44px 44px;
  background-position: center, 0 0, 0 0;
}
</style>

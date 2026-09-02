<script setup lang="ts">
import { ref } from 'vue'

// Interactive demo of the order lifecycle from the architecture doc:
// created -> validated -> paid -> fulfilled -> completed (+ cancelled)
const states = ['created', 'validated', 'paid', 'fulfilled', 'completed']
const current = ref(0)
const cancelled = ref(false)

const advance = () => {
  if (!cancelled.value && current.value < states.length - 1) current.value++
}
const back = () => {
  if (cancelled.value) {
    cancelled.value = false
    return
  }
  if (current.value > 0) current.value--
}
const cancel = () => {
  if (current.value <= 1) cancelled.value = true
}
const reset = () => {
  current.value = 0
  cancelled.value = false
}

const label = cancelled.value ? 'cancelled' : states[current.value]
</script>

<template>
  <div class="order-stepper">
    <div class="steps" role="list" aria-label="Order state stepper">
      <div
        v-for="(s, i) in states"
        :key="s"
        role="listitem"
        class="step"
        :class="{
          done: !cancelled && i < current,
          active: !cancelled && i === current,
          dimmed: cancelled
        }"
      >
        <span class="dot" aria-hidden="true">{{ !cancelled && i <= current ? '✓' : i + 1 }}</span>
        <span class="name">{{ s }}</span>
      </div>
      <div v-if="cancelled" class="step cancelled" role="listitem">
        <span class="dot" aria-hidden="true">✕</span>
        <span class="name">cancelled</span>
      </div>
    </div>

    <p class="status">
      Current state: <code>{{ label }}</code>
    </p>

    <div class="controls">
      <button type="button" @click="back" :disabled="current === 0 && !cancelled">
        ← Back
      </button>
      <button
        type="button"
        @click="advance"
        :disabled="cancelled || current === states.length - 1"
      >
        Advance →
      </button>
      <button
        type="button"
        class="danger"
        @click="cancel"
        :disabled="cancelled || current > 1"
        :title="current > 1 ? 'Only reachable from created or validated' : ''"
      >
        Cancel order
      </button>
      <button type="button" @click="reset">Reset</button>
    </div>
  </div>
</template>

<style scoped>
.order-stepper {
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}
.steps {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-bottom: 0.75rem;
}
.step {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
.step .dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.75rem;
  background: var(--vp-c-bg);
}
.step.active {
  color: var(--vp-c-text-1);
  font-weight: 600;
}
.step.active .dot {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
}
.step.done .dot {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.step.dimmed {
  opacity: 0.4;
}
.step.cancelled {
  color: var(--vp-c-danger-1);
  font-weight: 600;
}
.step.cancelled .dot {
  border-color: var(--vp-c-danger-1);
  color: var(--vp-c-danger-1);
}
.status {
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.controls button {
  padding: 0.35rem 0.75rem;
  font-size: 0.85rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
}
.controls button:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.controls button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.controls button.danger:hover:not(:disabled) {
  border-color: var(--vp-c-danger-1);
  color: var(--vp-c-danger-1);
}
</style>

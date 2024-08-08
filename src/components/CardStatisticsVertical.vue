<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { controlledComputed } from '@vueuse/core'

interface Props {
  title: string;
  color?: string;
  icon: string;
  stats: string;
  change?: number;
  subtitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
});

const isPositive = controlledComputed(
  () => props.change,
  () => Math.sign(props.change || 0) === 1
);
</script>

<template>
  <div class="flex flex-col gap-3 bg-base-100 dark:bg-[#211f1f] shadow rounded-[20px] p-5">
    <div class="flex items-center justify-center">
      <div
        v-if="props.icon"
        class="w-9 h-9 bg-opacity-20 rounded-lg flex items-center justify-center"
        :class="[`bg-${props?.color}`]"
      >
      <Icon 
        :class="[`text-${props?.color}`]" 
        :icon="props.icon" 
        size="32" 
      />
    </div>

      <div
        v-if="props.change"
        :class="isPositive ? 'text-success' : 'text-error'"
        class="flex items-center text-sm font-semibold"
      >
        <span>{{ isPositive ? `+${props.change}` : props.change }}%</span>
        <Icon :icon="isPositive ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
      </div>
    </div>

    <div class="flex flex-col gap-[10px]">
      <h6 class="text-xl text-center dark:text-white">
        {{ props.stats || '-'}}
      </h6>
      <p class="f-light text-sm text-center dark:text-zinc-200">
        {{ props.title }}
      </p>

      <div v-if="props.subtitle" size="x-small" class="font-semibold">
        <span class="truncate">{{ props.subtitle }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  model: string | number | null;
  required?: boolean;
  beforeLabel?: string;
  beforeLabelWidth?: string;
  beforeLabelAlign?: "left" | "center" | "right";
}

const props = withDefaults(defineProps<Props>(), {
  beforeLabelAlign: "right",
});

const emit = defineEmits(["update:model"]);

const beforeLabelStyle = computed(() => ({
  width: props.beforeLabelWidth + "px",
  textAlign: props.beforeLabelAlign,
}));
</script>

<template>
  <q-input
    :model-value="props.model"
    @update:model-value="emit('update:model', $event)"
    v-bind="props"
    dense
    outlined
  >
    <template v-if="beforeLabel" v-slot:before>
      <span :style="beforeLabelStyle">
        {{ props.beforeLabel }}
        <span v-if="required" class="text-negative">*</span>
      </span>
    </template>
  </q-input>
</template>

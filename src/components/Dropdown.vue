<template>
  <div class="relative" :class="{ 'z-10': opened }">
    <div
      class="relative"
      :class="{ 'z-10': opened }"
      @click.prevent="opened = !opened"
    >
      <slot name="button" />
    </div>

    <button
      tabindex="-1"
      v-if="opened"
      class="fixed inset-0 w-full bg-black bg-opacity-50"
      @click.prevent="opened = false"
    />
    <div
      @click.prevent="opened = false"
      :class="{ hidden: !opened }"
      class="absolute right-0 flex flex-col w-48 py-2 mt-2 text-gray-900 bg-gray-100 rounded-lg shadow-md "
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: "dropdown",
  data() {
    return {
      opened: false,
    };
  },
};
</script>

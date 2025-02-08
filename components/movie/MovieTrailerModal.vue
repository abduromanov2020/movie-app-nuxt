<template>
    <TransitionRoot appear :show="show" as="template">
      <Dialog as="div" @close="$emit('close')" class="relative z-50">
        <TransitionChild
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/75" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <DialogPanel class="w-full max-w-4xl rounded-lg overflow-hidden">
              <iframe
                v-if="videoKey"
                :src="`https://www.youtube.com/embed/${videoKey}`"
                class="w-full aspect-video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup lang="ts">
  import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
  
  defineProps<{
    show: boolean
    videoKey: string
  }>()
  
  defineEmits<{
    (e: 'close'): void
  }>()
  </script>
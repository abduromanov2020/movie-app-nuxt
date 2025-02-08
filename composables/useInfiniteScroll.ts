import { useIntersectionObserver } from '@vueuse/core'

interface InfiniteScrollOptions {
    threshold?: number
    disabled?: boolean
}

export const useInfiniteScroll = (
    callback: () => Promise<void>,
    options: InfiniteScrollOptions = {}
) => {
    const target = ref<HTMLElement | null>(null)
    const loading = ref(false)

    const { threshold = 0.5, disabled = false } = options

    const { stop } = useIntersectionObserver(
        target,
        async ([{ isIntersecting }]) => {
            if (isIntersecting && !loading.value && !disabled) {
                loading.value = true
                try {
                    await callback()
                } finally {
                    loading.value = false
                }
            }
        },
        { threshold }
    )

    onUnmounted(() => {
        stop()
    })

    return {
        target,
        loading
    }
}
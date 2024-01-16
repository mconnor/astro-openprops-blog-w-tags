import { navigate } from 'astro:transitions/client'

document.addEventListener('astro:page-load', () => {
    document
        .querySelector('[data-navigate-select]')
        ?.addEventListener(
            'change',
            (e: Event) =>
                e.target && navigate((e.target as HTMLSelectElement).value),
        )
})

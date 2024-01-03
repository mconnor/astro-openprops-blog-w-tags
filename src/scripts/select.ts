import { navigate } from 'astro:transitions/client'

document.addEventListener('astro:page-load', () => {
    const navSelect = document.querySelector('[data-navigate-select]')
    navSelect &&
        navSelect.addEventListener(
            'change',
            (e: Event) =>
                e.target && navigate((e.target as HTMLSelectElement).value),
        )
})

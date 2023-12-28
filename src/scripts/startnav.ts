
import { navigate } from 'astro:transitions/client'


// Navigate to the selected option automatically.
document && document.querySelector('select').onchange = (ev) => {
    let href = ev.target.value
    navigate(href)
}
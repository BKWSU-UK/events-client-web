export default function extractText (html) {
    console.log('html', html)
    return new DOMParser().parseFromString(html,
        'text/html').documentElement.textContent
}

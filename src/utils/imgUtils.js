export const removeBadStylesFromImg = (description) => {
    return description?.replace(/(<img.+style=["'])[^"']+(["'].+>)/g, '$1width:100%$2')
}

export const extractImageFromEvent = (event) => {
    let image = event.image1 || event.image2 || event.image3
    if (!!image && image.startsWith('/')) {
        image = `https://events.brahmakumaris.org${image}`
    }
    return image
}

export const imageAdapter = (ev, eventsConfig) => {
    const image = extractImageFromEvent(ev)
    if (!!image) {
        return image
    }
    const randomImages = eventsConfig.randomImages
    if(!!randomImages) {
        return randomImages[Math.floor(Math.random() * randomImages.length)]
    }
    return null
}
export const removeBadStylesFromImg = (description) => {
    const replacedDesc = description?.replace(/(<img.+style=["'])[^"']+(["'].+>)/g, '$1width:100%$2')
    if(description?.includes("img")) {
        console.log('Changed desc after', replacedDesc)
    }
    return replacedDesc
}

export const extractImageFromEvent = (event) => {
    let image = event.image1 || event.image2 || event.image3
    if (!!image && image.startsWith('/')) {
        image = `https://events.brahmakumaris.org${image}`
    }
    return image
}
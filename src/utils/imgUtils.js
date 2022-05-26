export const removeBadStylesFromImg = (description) => {
    const replacedDesc = description?.replace(/(<img.+style=["'])[^"']+(["'].+)>/g, '$1width:100%$2')
    if(description.includes("img")) {
        console.log('Changed desc before', description)
        console.log('Changed desc after', replacedDesc)
    }
    return replacedDesc
}
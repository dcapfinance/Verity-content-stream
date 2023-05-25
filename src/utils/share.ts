export const onShare = async () => {
    const title = '#CIRCLELIVE2023'
    const url = window.document.location.href
    const text = 'Take a look at how quick it is to build a #CIRCLELIVE2023 using pwa'

    if (navigator.share) {
        try {
            await navigator.share({
                title,
                url,
                text,
            })
        } catch (err) {
            console.warn(err)
        }
    } else {
        alert('Use this application on a mobile')
    }
}

function share() {
    if (navigator.share) {
        navigator.share({
                title: "title.value",
                text: "text.value",
                url: "url.value",
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
    } else {
        console.log("Web Share API is not supported in your browser.")
    }
}
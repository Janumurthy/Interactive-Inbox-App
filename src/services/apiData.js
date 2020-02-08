const apiData = () => 
    fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=4030c8f785ad459eaa77b0573983ebb5')
        .then((response) => 
            (response.ok && response.status>=200 && response.status<300) ? 
                response.clone().json() : null
        )
        .catch((error)=> null)

export {apiData};
            
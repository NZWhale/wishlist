export const backendWishesURL = "http://127.0.0.1:3000/wishes"
// "http://zverevn420.fvds.ru:3000/wishes"
// "http://82.146.33.4:3000/wishes"


export function fetchPostRequest(method, url, body = null) {
    const headers = {
        "Content-Type": "application/json"
    }

    const response = fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: headers,
    }).then(response => {
        return response.json()
    }, err => {
        // console.error
        console.log(err, "data wasn't wrote")
        throw err
    })
}


export function fetchGetRequest(url) {
    return fetch(url).then(response => {
        return response.json()
    })
}
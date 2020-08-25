export const backendURL = "http://127.0.0.1:3000/users"
export const regHandler = "http://127.0.0.1:3000/registration"
export const logHandler = "http://127.0.0.1:3000/login"
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
        return response.text()
    }, err => {
        console.log(err, "data wasn't wrote")
    })
}


export function fetchGetRequest(url) {
    return fetch(url).then(response => {
        return response.json()
    })
}
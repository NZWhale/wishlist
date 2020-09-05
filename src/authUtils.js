export const backendUsersURL = "http://127.0.0.1:3000/users"
export const regHandler = "http://127.0.0.1:3000/registration"
export const logHandler = "http://127.0.0.1:3000/login"
export const backendCheckLoginURL = "http://127.0.0.1:3000/check-login"
"http://zverevn420.fvds.ru:3000/"
// "http://82.146.33.4:3000/"


export function fetchPostRequest(method, url, body = {}) {
    const headers = {
        "Content-Type": "application/json"
    }

    const responsePromise = fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: headers,
        credentials: "same-origin"
    }).then(response => {
        return response.json()
    }, err => {
        console.log(err, "data wasn't wrote")
    })
    return responsePromise
}
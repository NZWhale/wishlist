export const createDiv = (idName, className) => {
    const div = document.createElement("div")
    div.setAttribute("id", `${idName}`)
    div.setAttribute("class", `${className}`)
    return div
}

export const createInput = (type, placeholder, idName, className) => {
    const button = document.createElement("input")
    button.setAttribute("type", `${type}`)
    button.setAttribute("id", `${idName}`)
    button.setAttribute("class", `${className}`)
    button.setAttribute("placeholder", `${placeholder}`)
    return button
}

// very bad, this function relies on some conditions that are not guaranteed
export const clearTextArea = () => {
    document.getElementById("titleArea").value = ""
    document.getElementById("bodyArea").value = ""
    document.getElementById("urlArea").value = ""
}

export const deleteCookie = (name) => {
    setCookie(name, "", {
      'max-age': -1
    })
  }

export const setCookie = (name, value, options = {}) => {

    options = {
      path: '/',
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
  }

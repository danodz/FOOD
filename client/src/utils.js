const basicFetch = (url, method, body)=>{
    const options = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    if(method)
        options.method = method;
    if(body)
        options.body = body;

    return fetch(url, options);
}

export {basicFetch}
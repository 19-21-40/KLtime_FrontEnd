import { API_BASE_URL } from "../app-config";

export async function call(api,method,request){
    let options={
        headers: new Headers({
            "Content-Type":"application/json",
        }),
        url:API_BASE_URL+api,
        method:method,
        };
    if(request){
        options.body = JSON.stringify(request);
    }
    const response = await fetch(options.url, options);
    const json = await response.json();
    if (!response.ok) {
        return Promise.reject(json);
    }
    console.log(json);
    return json;
};

export function signin(userDTO){
    return call("/auth/sign-in","POST",userDTO).then((responese)=>{
        if(responese.token){
            window.location.href="/";
        }
    });
}
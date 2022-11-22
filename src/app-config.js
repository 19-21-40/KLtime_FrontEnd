let backendHost;

const hostname=window && window.location && window.location.hostname;

if(hostname=="localhost"){
    backendHost="http://43.200.136.102:8080";
}

export const API_BASE_URL=`${backendHost}`;

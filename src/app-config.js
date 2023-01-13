let backendHost;

const hostname=window && window.location && window.location.hostname;

if(hostname=="localhost"){
    backendHost="http://15.165.213.128:8080";
}

export const API_BASE_URL=`${backendHost}`;

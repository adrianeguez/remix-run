export function LoaderSetQueryparams(requestUrl: string) {
    const urlSearchParams = new URLSearchParams(requestUrl.split('?')[1]);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
}
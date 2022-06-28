export function GenerarFormData(registro: any) {
    const formData = new FormData();
    for (const key in registro) {
        formData.append(key, registro[key]);
    }
    return formData;
}
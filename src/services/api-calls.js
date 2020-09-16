export function getWeatherDataFromBackEnd(formData){
    return fetch('/api/weather', {
        method: "POST",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(formData)
    }, {mode: "cors"})
    .then(res => res.json())
}
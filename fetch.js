let url='https://api.wheretheiss.at/v1/satellites/25544'

let iss_lon=document.querySelector('#iss_lon')
let iss_lat=document.querySelector('#iss_lat')
let time=document.querySelector('#update_time')

let iss_Marker
let iss_Marker_icon = L.icon({
    iconUrl: 'icon.png',
    iconSize:[50,50]
})
let update = 10000

let map=L.map('iss_map').setView([0,0],1)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copywrite">OpenStreetMap</a>',
}).addTo(map)

iss()
setInterval(iss, update)
function iss() {
    fetch(url)
        .then(res => res.json())
        .then(iss_data => {
            iss_lat.innerHTML=iss_data.latitude
            iss_lon.innerHTML=iss_data.longitude
            time.innerHTML=Date()
            if (!iss_Marker) {
            iss_Marker = L.marker([iss_data.latitude, iss_data.longitude], {icon:iss_Marker_icon}).addTo(map)}
            else {
                iss_Marker.setLatLng([iss_data.latitude, iss_data.longitude])
            }
        })
        .catch(err=>{console.log(err)})
}
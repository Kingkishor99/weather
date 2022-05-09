
import React, { useState } from 'react'
function Home() {

    const [text, setText] = useState("")
    const [w, setW] = useState({})

    const api = {
        key: "67dbcc38cb18a629efe224674edd34bc",
        base: "https://api.openweathermap.org/data/2.5/"
    }

    const search = e => {


        if (e.key === "Enter") {
            console.log(e.key)
            fetch(`${api.base}weather?q=${text}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setW(result)
                    console.log(result.cod)
                    if (result.cod == 404) { alert("please enter correct city name") }
                })
        }


    }

    const a = (c) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[c.getDay()]
        let month = months[c.getMonth()]
        let date = c.getDate()
        let year = c.getFullYear()

        return `${day} ${date} ${month} ${year}`

    }

    return (
        <div className={(typeof w.main != "undefined") ? ((w.main.temp > 16) ? 'warm' : 'winter') : 'rainy'}>
            <div className='main'>
                <div className='search'>
                    <input type="text" className='searchbar' placeholder='Search...'
                        onKeyPress={e => search(e)} onChange={e => setText(e.target.value)} />
                </div>
                {(typeof w.main != "undefined") ? (
                    <div className='wrap'>
                        <div className='place'>{w.name}, {w.sys.country}</div>
                        <div className='date'>{a(new Date())} </div>
                        <div className='temp'>
                            <div className='temp1'>{Math.round(w.main.temp)}°C</div>
                        </div>
                        <div className='weather'>{w.weather[0].main}</div>
                    </div>
                ) : ('')}


            </div>
        </div>
    )

}

export default Home
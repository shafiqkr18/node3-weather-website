
const weatherForm = document.querySelector('form')
const m1 = document.querySelector('#p1')
const m2 = document.querySelector('#p2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = document.querySelector('input').value
    m1.textContent = 'Loading...'
    m2.textContent = ''
    //using for forecast
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) =>{
            if(data.error)
            {
               // console.log(data.error)
               m1.textContent = data.error
            }else{
                //console.log(data.location)
                //console.log(data.address)
                m1.textContent = data.location
                m2.textContent = data.address
            }
            
        })
    })
})
var nav = document.getElementById(nav)

window.addEventListener(scroll, ()=> {
    var scroll = window.scrollY
    if(crolll>10){
        nav.style.backgroundColor = '#af02f5'
    }else{
        nav.style.backgroundColor = 'transparent'
    }
})


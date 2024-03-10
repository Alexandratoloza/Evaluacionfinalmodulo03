//cargue el dom 
$(document).ready(function(){
//Elementos del dom

const HeroeForm = $("#HeroeForm")
const HeroeNumber = $("#HeroeNumber")
const heroResult = $("heroResult")



//formulario

HeroeForm.on("submit", function (event){
    event.preventDefault()
    //console.log("procesando")

    // ver lo q escribio el usuario

     // console.log(HeroeNumber.val()) //para ver en la consola el numero q coloco el usuario
    const HeroeNumberUser = parseInt(HeroeNumber.val())
    HeroeNumber.removeClass('is-valid is-invalid') // para remover las clases
        //console.log(typeof (HeroeNumberUser))

    //validar q sea numero/mayor a 0 / espacios
    if(HeroeNumberUser <= 731 ){
       // console.log("es correcta")
        HeroeNumber.addClass('is-valid')
        getHeroe(HeroeNumberUser)

    } else{
        //console.log("no es correcta")
        HeroeNumber.addClass('is-invalid')
    }



})

        // consumir la API de los Super Herores con ajax
        //https://www.superheroapi.com/api.php/4905856019427443/100

        const getHeroe = (HeroeNumberfn) => {
            $.ajax({
               url: "https://www.superheroapi.com/api.php/4905856019427443/" +  HeroeNumberfn, //o la interpolacion
               method: "GET",
               
               success(Heroe) {
                    console.log(Heroe)
               },
               error (e){
                console.log (e)

               }


            })



        }


})
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
                    //console.log(Heroe)
                    
                    // construir el objeto 
                    const  mysuperHeroe = {
                        image:  Heroe.image.url,
                        name: Heroe.name,
                        height: Heroe.appearance.height,
                        weight: Heroe.appearance.weight,
                        connections: Heroe.connections,
                        powerstats: Heroe.powerstats,
                        appearance: Heroe.appearance,
                        occupation: Heroe.work.occupation,
                        aliases: Heroe.biography.aliases

                    }

                    // console.log(mysuperHeroe)
                    heroResult.html(` 
                    <div class="card">
                    <img src="${mysuperHeroe.image}"
                    alt="" class="card-img-top">
                <div class=" card-body">
                    <h6>Name ${mysuperHeroe.name}:</h6>
                </div>   
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">height: ${mysuperHeroe.height}</li>
                        <li class="list-group-item">weight: ${mysuperHeroe.weight}</li>
                        <li class="list-group-item">connections: ${mysuperHeroe.connections} </li>
                        <li class="list-group-item">powerstats: ${mysuperHeroe.powerstats} </li>
                        <li class="list-group-item">first_appearance: ${mysuperHeroe.appearance} </li>
                        <li class="list-group-item">occupation: ${mysuperHeroe.occupation} </li>
                        <li class="list-group-item">aliases: ${mysuperHeroe.aliases} </li>
                      </ul>

                </div>
                    
                    `)


               },
               error (e){
                console.log (e)

               }


            })



        }


})
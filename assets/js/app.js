//cargue el dom 
$(document).ready(function () {
    //Elementos del dom

    const HeroeForm = $("#HeroeForm")
    const HeroeNumber = $("#HeroeNumber")
    const heroeResult = $("#heroeResult")
    const chartContainer = $("#chartContainer")



    //formulario

    HeroeForm.on("submit", function (event) {
        event.preventDefault()
        //console.log("procesando")

        // ver lo q escribio el usuario

        // console.log(HeroeNumber.val()) //para ver en la consola el numero q coloco el usuario
        const HeroeNumberUser = parseInt(HeroeNumber.val())
        HeroeNumber.removeClass('is-valid is-invalid') // para remover las clases
        //console.log(typeof (HeroeNumberUser))

        //validar q sea numero/mayor a 0 / espacios
        if (HeroeNumberUser <= 731) {
            // console.log("es correcta")
            HeroeNumber.addClass('is-valid')
            getHeroe(HeroeNumberUser)

        } else {
            //console.log("no es correcta")
            HeroeNumber.addClass('is-invalid')
        }



    })

    // consumir la API de los Super Herores con ajax
    //https://www.superheroapi.com/api.php/4905856019427443/100

    const getHeroe = (HeroeNumberfn) => {
        $.ajax({
            url: "https://www.superheroapi.com/api.php/4905856019427443/" + HeroeNumberfn, //o la interpolacion
            method: "GET",

            success(Heroe) {
                // console.log(Heroe)
                console.log("imagen:", Heroe.image.url)
                console.log("name:", Heroe.name)
                console.log("height:", Heroe.appearance.height)
                console.log("weight:", Heroe.appearance.weight)
                console.log("connections:", Heroe.connections)
                console.log("powerstats:", Heroe.powerstats)
                console.log("appearance:", Heroe.appearance)
                console.log("occupation:", Heroe.work.occupation)
                console.log("aliases:", Heroe.biography.aliases)



                // construir el objeto 
                const mysuperHeroe = {
                    image: Heroe.image.url,
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
                //pintar la Tarjeta 
                heroeResult.html(` 
                    <div class="card">
                        <img src="${mysuperHeroe.image}"
                            alt="" class="card-img-top">
                    <div class=" card-body">
                        <h6>Name ${mysuperHeroe.name}:</h6>
                    </div>   
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Height: ${mysuperHeroe.height}</li>
                        <li class="list-group-item">Weight: ${mysuperHeroe.weight}</li>
                        <li class="list-group-item">Connections: ${mysuperHeroe.connections} </li> 
                        <li class="list-group-item">Powerstats: ${mysuperHeroe.powerstats} </li> 
                        <li class="list-group-item">First_appearance: ${mysuperHeroe.appearance} </li>
                        <li class="list-group-item">Occupation: ${mysuperHeroe.occupation} </li>
                        <li class="list-group-item">Aliases: ${mysuperHeroe.aliases} </li>
                      </ul>

                     </div>
                    `)

                //pintar el Grafico

                const dataPoints = Object.entries(mysuperHeroe.powerstats).map(([label, y]) => {
                    return ({
                        label: label,
                        y: y
                    })
                })

                //  console.log("dataPoints", dataPoints)


                const GraficoSH = {
                    animationEnabled: true,
                    title: {
                        text: "Estadisticas del Super Heroe "
                    },

                    data: [
                        {
                            type: "pie",
                            showlnLengend: "true",
                            legenText: "{label}",
                            indexLabel: "{label} ({y})",
                            yValueFormatString: "#,##0.#" % "",
                            dataPoints: dataPoints
                        }]
                };
                $("#chartContainer").CanvasJSChart(GraficoSH);



                {


                    error(e)
                    console.log(e)
                }
            }

        })
    }
})

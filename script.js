let container = document.getElementById('container');
let form = document.getElementById('buscador')
let buscador = document.getElementById("buscador_input");
let btn_buscador= document.getElementById('boton-buscador');
let temp =document.getElementById("inputTemp__celsius");
let icono = document.getElementById('iconoClima');
let descripcion = document.getElementById('inputTemp__descripcion');
let ciudad = document.getElementById("locacion__ciudad");
let fecha = document.getElementById("locacion__dia");
let min = document.getElementById('temperatura__min');
let max = document.getElementById('temperatura__max');
let humedad= document.getElementById('temparatura__humedad');


const imagen =(obj)=>{
	let check=(obj.count)

	if( check ==0){
		alert ("error esa ciudad no existe");
	}
	
	let llueve = obj.list[0].rain
	console.log(obj)
	let hora= obj.list[0].weather[0].icon.indexOf("d")
		
		
	if (hora==-1){
		container.classList.remove("dia")
		container.classList.add("noche");
	}else{
		container.classList.remove("noche");
		container.classList.add("dia");
	}if (llueve != null){
		container.classList.add("lluvia");
	}else{
		container.classList.remove("lluvia");
	}
	
}

const llenar =(obj)=>{
	ciudad.innerHTML= obj.list[0].name
	fecha.innerHTML =  new Date(obj.list[0].dt*1000).toLocaleString ("es-AR",{
		dateStyle: "short",
	});
	descripcion.innerHTML= obj.list[0].weather[0].description
	let Rtemp = obj.list[0].main.temp
	temp.innerHTML = Math.trunc(obj.list[0].main.temp)
	min.innerHTML = `<small>Min</small>${Math.trunc(obj.list[0].main.temp_min)}<span>°C</span></div>`
	max.innerHTML = `<small>Max</small>${Math.trunc(obj.list[0].main.temp_max)}<span>°C</span></div>`
	const icon = obj.list[0].weather[0].icon
	icono.innerHTML= `<img class="iconoClima" src="imagenes/${icon}.png">`
	humedad.innerHTML="Humedad: " + obj.list[0].main.humidity + "%";
	console.log(obj)

}

const obtenerData = async (ciudad)=>{
	const res = await fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${ciudad}&units=metric&lang=sp`, {
	"headers": {
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"x-rapidapi-key": "66c8c8086cmshc569b1938b8ff52p1aac09jsnd5be8678f302",
	}});
	const data = await res.json();
	imagen(data);
	llenar(data)
}



window.onload = () =>{
	obtenerData("Ciudad Autónoma de Buenos Aires")
}

form.addEventListener("submit", e=>{
	e.preventDefault();
	obtenerData (buscador.value);
	buscador.value=""
})


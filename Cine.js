//Definir el array y las variables.
let Sala=[]
let numOriginal=0
let nomOriginal=""

//Configurar la caja de texto para que sólo acepte números.
function soloNumeros(event) {
    var key = window.event ? event.keyCode : event.which;
//Permitir las teclas de control como retroceso, suprimir, etc.
    if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39) {
        return true;
    }
    else if (key < 48 || key > 57) {
        event.preventDefault();
    }
}

function Reservar(){
    let nomAsiento=document.getElementById("nomAsiento").value; //Llamar al valor introducido en la caja de texto "nomAsiento".

    //Si no se ha introducido un nombre en la caja de texto, mostrar una alerta de error.
    if(nomAsiento===""){
        alert("Lo siento, es necesario registrar un nombre para completar su reserva.");
        return;
    }

    let numAsiento=document.getElementById("numAsiento").value; //Llamar al valor introducido en la caja de texto "numAsiento".
    
    //Si el número introducido es menor a 1 o mayor a 24, mostrar una alerta de error.
    if(numAsiento<1||numAsiento>24) {
        alert("Lo siento, "+nomAsiento+", el asiento que has seleccionado no es válido. Inténtalo de nuevo.");
        return;}
    //Si el array "Sala" ya incluye el número introducido, mostrar una alerta de error.
    else if (Sala.some(asiento=>asiento.numero===parseInt(numAsiento))){
        alert("Lo siento, "+nomAsiento+", ese asiento no está disponible. Selecciona otro.");
        return;
    }
//Si la reserva se completa sin ningún error, guardar los datos en el array "Sala".
Sala.push({numero:parseInt(numAsiento),nombre:nomAsiento});

    //Cambiar la imagen del asiento a uno ocupado.
    const img=document.getElementById("Asiento"+numAsiento);
    img.src="Occupied seat.png";
    //Cambiar la etiqueta "Disponible" por el nombre de la reserva.
    const label=document.getElementById("Etiqueta"+numAsiento);
    label.innerHTML=numAsiento+"<br>"+nomAsiento;
    //Vaciar las cajas de texto.
    let nomVacio=document.getElementById("nomAsiento");
    let numVacio=document.getElementById("numAsiento");
    nomVacio.value="";
    numVacio.value="";
}

//Crear el modal para editar o eliminar la reserva.
function Ventana(AsientoInt){
    var modal=document.getElementById("miModal");
    //Mostrar el número de asiento dentro de la caja de texto.
    const numAsiento2=document.getElementById("numAsiento2");
    numAsiento2.value=AsientoInt;
    //Mostrar el nombre de asiento dentro de la caja de texto.
    const nomAsiento2=document.getElementById("nomAsiento2");
    let asiento=Sala.find(asiento => asiento.numero === parseInt(AsientoInt));
    //Si el asiento está reservado, abrir el modal con los datos.
    if(asiento){
        numOriginal=asiento.numero;
        nomOriginal=asiento.nombre;
        nomAsiento2.value=asiento.nombre;
        var img=document.getElementById("Asiento"+parseInt);
        var span=document.getElementsByClassName("close")[0];
        modal.style.display = "block";}
    //Si el asiento está disponible, mostrar una alerta sin abrir el modal.
    else{
        alert("Asiento disponible.")
    }
}

//Cerrar el modal al hacer clic en la x.
function cerrarModal(){
    var modal=document.getElementById("miModal");
    modal.style.display="none";
}

//Cerrar el modal al hacer clic en cualquier parte fuera de este.
window.onclick = function(event){
    var trailer=document.getElementById("trailer");
    var modal2= document.getElementById("miModal2");
    if (event.target==modal2){
        trailer.src="" //Detener la reproducción del trailer.
        modal2.style.display="none"; //Ocultar el modal.
    }
}

//Eliminar asiento desde el modal
function Eliminar(){
    let indice=Sala.findIndex(asiento=>asiento.numero===numOriginal); //Buscar los datos en el array "Sala".
    if(indice!==-1){
        Sala.splice(indice,1); //Eliminar los datos del array "Sala".
        //Cambiar la imagen del asiento ocupado a uno vacío.
        const img=document.getElementById("Asiento"+numOriginal);
        img.src="Empty seat.png";
        //Cambiar la etiqueta con el nombre de la reserva a la leyenda "Disponible".
        const label=document.getElementById("Etiqueta"+numOriginal);
        label.innerHTML=numOriginal+"<br>Disponible";
        cerrarModal(); //Llamar a la función "cerrarModal()"
    }
}

//Guardar los datos de la reserva editados desde el modal.
function Guardar(){
    let indice=Sala.findIndex(asiento=>asiento.numero===numOriginal); //Buscar los datos en el array "Sala".
    if(indice!==-1){
        //Llamar a los datos de reserva del asiento introducidos en las cajas de texto del modal.
        var nomAsiento2= document.getElementById("nomAsiento2").value;
        var numAsiento2= document.getElementById("numAsiento2").value;

        //Si se cambia el número de asiento, entonces...
        if(numOriginal!=parseInt(numAsiento2)){
            
            //Si no se ha introducido un nombre de reserva, mostrar una alerta de error.
            if(nomAsiento2===""){
                alert("Lo siento, es necesario registrar un nombre para completar su reserva.");
                return;
            }
            //Si el número introducido es menor a 1 o mayor a 24, mostrar una alerta de error.
            if(numAsiento2<1||numAsiento2>24) {
                alert("Lo siento, "+nomAsiento2+", el asiento que has seleccionado no es válido. Inténtalo de nuevo.");
                return;
            }
            //Si el array "Sala" ya incluye el número introducido, mostrar una alerta de error.
            else if (Sala.some(asiento=>asiento.numero===parseInt(numAsiento2))){
                alert("Lo siento, "+nomAsiento2+", ese asiento no está disponible. Selecciona otro.");
                return;
            }
            //Borrar los datos originales de reserva del array "Sala".
            Sala.splice(indice,1);
            //Cambiar la imagen del asiento ocupado a uno vacío.
            const img2=document.getElementById("Asiento"+numOriginal);
            img2.src="Empty seat.png";
            //Cambiar la etiqueta con el nombre de reserva por una leyenda de "Disponible".
            const label2=document.getElementById("Etiqueta"+numOriginal);
            label2.innerHTML=numOriginal+"<br>Disponible";
            //Guardar lo datos nuevos en el array "Sala".
            Sala.push({numero:parseInt(numAsiento2),nombre:nomAsiento2});
            //Cambiar la imagen del asiento vacío por uno ocupado en el nuevo asiento seleccionado.
            const img=document.getElementById("Asiento"+numAsiento2);
            img.src="Occupied seat.png";
            //Cambiar la etiqueta con la leyenda "Disponible" por el nombre de reserva en el nuevo asiento seleccionado.
            const label=document.getElementById("Etiqueta"+numAsiento2);
            label.innerHTML=numAsiento2+"<br>"+nomAsiento2;
        } 
        //Si se cambia el nombre de la reserva, entonces...
        else {
            Sala.splice(indice,1); //Borrar el nombre de reserva original.
            Sala.push({numero:numOriginal,nombre:nomAsiento2}); //Guardar el nuevo nombre de reserva.
            //Cambiar el nombre original de la etiqueta por el nuevo nombre de reserva.
            const label=document.getElementById("Etiqueta"+numOriginal);
            label.innerHTML=numOriginal+"<br>"+nomAsiento2;
        }
        cerrarModal(); //Llamar a la función "cerrarModal()"
    }
}

//Crear el modal para reproducir el trailer de la película seleccionada.
function Ventana2(idVideo){
    var modal=document.getElementById("miModal2");
    modal.style.display = "block";
    var trailer=document.getElementById("trailer");
    //Reproducir cierto video de acuerdo con la película seleccionada.
    switch(idVideo){
        case 1:trailer.src="https://www.youtube.com/embed/3PkkHsuMrho?si=YSDmBQz80XSLbl8T"; break;
        case 2:trailer.src="https://www.youtube.com/embed/AwwbhhjQ9Xk?si=8YfIITPTDNH4Mqho"; break;
        case 3:trailer.src="https://www.youtube.com/embed/oVzVdvGIC7U?si=jAlmurz4lPprPnEl"; break;
        case 4:trailer.src="https://www.youtube.com/embed/Ur_DIHs92NM?si=9HPvZrUPWrrbpx7Z"; break;
        case 5:trailer.src="https://www.youtube.com/embed/QDRLSqm_WVg?si=fG0pVpm5CEGV8EXC"; break;
        case 6:trailer.src="https://www.youtube.com/embed/hc4CiTvQ-YE?si=NcHyl2U9rwK9PZaV"; break;
    }
}
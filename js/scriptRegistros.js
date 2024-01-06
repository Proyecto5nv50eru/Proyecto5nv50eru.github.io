// Referencia a la colección "registros"
const registrosRef = firebase.firestore().collection("registros");

// Función para agregar un registro
function agregarRegistro() {
  // Obtiene los valores de los campos
  const fecha = new Date(prompt("Ingrese la fecha (formato: DD/MM/AAAA):"));
  const producto = prompt("Ingrese el nombre del producto vendido:");
  const costo = prompt("Ingrese el costo del producto:");
  const comprador = prompt("Ingrese el nombre del comprador:");
  const vendedor = prompt("Ingrese el nombre del vendedor:");

  // Crea un objeto con los valores
  const registro = {
    fecha: fecha,
    producto: producto,
    costo: costo,
    comprador: comprador,
    vendedor: vendedor,
  };

  // Agrega el registro a la base de datos
  registrosRef.add(registro);
}
// Función para borrar un registro
function borrarRegistro() {
  // Pide al usuario el ID del registro que quiere borrar
  const id = prompt("Ingrese el ID del registro que desea borrar:");

  // Borra el registro de la base de datos
  registrosRef.doc(id).delete().then(() => {
    console.log("Registro borrado con éxito");
  }).catch((error) => {
    console.error("Error al borrar el registro: ", error);
  });
}

// Función para editar un registro
function editarRegistro() {
  // Pide al usuario el ID del registro que quiere editar
  const id = prompt("Ingrese el ID del registro que desea editar:");

  // Pide al usuario los nuevos datos del registro
  const fecha = prompt("Ingrese la nueva fecha (formato: DD/MM/AAAA):");
  const producto = prompt("Ingrese el nuevo nombre del producto vendido:");
  const costo = prompt("Ingrese el nuevo costo del producto:");
  const comprador = prompt("Ingrese el nuevo nombre del comprador:");
  const vendedor = prompt("Ingrese el nuevo nombre del vendedor:");

  // Crea un objeto con los nuevos datos
  const nuevoRegistro = {
    fecha: fecha,
    producto: producto,
    costo: costo,
    comprador: comprador,
    vendedor: vendedor,
  };

  // Actualiza el registro en la base de datos
  registrosRef.doc(id).update(nuevoRegistro).then(() => {
    console.log("Registro actualizado con éxito");
  }).catch((error) => {
    console.error("Error al actualizar el registro: ", error);
  });
}

// Escucha los cambios en la colección
registrosRef.onSnapshot((snapshot) => {
  // Obtiene la lista de registros
  const registrosList = document.getElementById("registros");

  // Limpia la lista
  registrosList.innerHTML = '';

  // Recorre cada registro
  snapshot.forEach((doc) => {
  // Obtiene los datos del registro
  const registro = doc.data();

  // Convierte la fecha a una cadena legible
  const fecha = registro.fecha.toDate().toLocaleDateString();

  // Crea un elemento de lista para el registro
  const registroItem = document.createElement("li");
  registroItem.textContent = `ID: ${doc.id}, ${fecha} - ${registro.producto} - $${registro.costo} - ${registro.comprador} - ${registro.vendedor}`;

  // Agrega el registro a la lista
  registrosList.appendChild(registroItem);
});

});



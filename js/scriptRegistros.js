// Referencia a la colección "registros"
const registrosRef = firebase.firestore().collection("registros");

// Función para agregar un registro
function agregarRegistro() {
  // Obtiene los valores de los campos
  const fecha = prompt("Ingrese la fecha (formato: DD/MM/AAAA):");
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

    // Crea un elemento de lista para el registro
    const registroItem = document.createElement("li");
    registroItem.textContent = `${registro.fecha} - ${registro.producto} - $${registro.costo} - ${registro.comprador} - ${registro.vendedor}`;

    // Agrega el registro a la lista
    registrosList.appendChild(registroItem);
  });
});


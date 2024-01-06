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

  // Agrega el registro a la lista
  const registrosList = document.getElementById("registros");
  const registroItem = document.createElement("li");
  registroItem.textContent = `${fecha} - ${producto} - $${costo} - ${comprador} - ${vendedor}`;
  registrosList.appendChild(registroItem);
}

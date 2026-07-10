let tareas = [
  {
    id: 1,
    titulo: 'Revisar documentación de la API',
    ciudad: 'Monterrey',
    completada: false
  },
  {
    id: 2,
    titulo: 'Configurar certificado HTTPS',
    ciudad: 'Guadalajara',
    completada: true
  }
];

let siguienteId = 3;

module.exports = {
  obtenerTodas: () => tareas,

  obtenerPorId: (id) => tareas.find(t => t.id === id),

  crear: (titulo,ciudad) => {
    const nueva = {
      id: siguienteId++,
      titulo,
      ciudad,
      completada: false
    };

    tareas.push(nueva);
    return nueva;
  },

  actualizar: (id, datos) => {
    const tarea = tareas.find(t => t.id === id);

    if (!tarea) return null;

    Object.assign(tarea, datos);

    return tarea;
  },

  eliminar: (id) => {
    const indice = tareas.findIndex(t => t.id === id);

    if (indice === -1) return false;

    tareas.splice(indice, 1);

    return true;
  }
};
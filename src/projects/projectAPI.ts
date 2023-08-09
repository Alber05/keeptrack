// Importamos la interfaz 'Project' desde el archivo './Project'
import { Project } from './Project'

// Definimos la URL base para la API
const baseUrl = 'http://localhost:4000'
// Combinamos la URL base con el endpoint específico de proyectos
const url = `${baseUrl}/projects`

// Función que traduce el estado de la respuesta HTTP a mensajes de error legibles
function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return 'Por favor, inicie sesión de nuevo'
    case 403:
      return 'No tienes permiso para ver el/los proyecto(s)'
    default:
      return 'Hubo un error al recuperar el/los proyecto(s). Por favor, inténtalo de nuevo.'
  }
}

// Función que verifica el estado de la respuesta HTTP y maneja errores
function checkStatus(response: any) {
  if (response.ok) {
    return response // Si la respuesta es exitosa, la devolvemos
  } else {
    // Información sobre el error HTTP
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    }
    console.log(
      `Registrar error HTTP del servidor: ${JSON.stringify(httpErrorInfo)}`
    )

    // Traducimos el estado a un mensaje de error y lanzamos una excepción
    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status)
    throw new Error(errorMessage)
  }
}

// Función que convierte la respuesta JSON a un objeto JavaScript
function parseJSON(response: Response) {
  return response.json()
}

// Función que introduce un retraso en una promesa
function delay(ms: number) {
  return function (x: any): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms))
  }
}

// Función que convierte los datos de proyectos en objetos de tipo 'Project'
function convertToProjectModels(data: any[]): Project[] {
  let projects: Project[] = data.map(converToProjectModel) // Mapeamos cada dato a un objeto 'Project'
  return projects
}

// Función que convierte un objeto de datos en un objeto de tipo 'Project'
function converToProjectModel(item: any): Project {
  return new Project(item) // Creamos una instancia de 'Project' a partir del objeto de datos
}

// Definición del objeto 'projectAPI' que contiene métodos para interactuar con la API de proyectos
const projectAPI = {
  get(page = 1, limit = 20) {
    return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
      .then(delay(600)) // Introducimos un retraso simulado de 600ms
      .then(checkStatus) // Verificamos el estado de la respuesta HTTP
      .then(parseJSON) // Parseamos la respuesta JSON
      .then(convertToProjectModels) // Convertimos los datos a objetos 'Project'
      .catch((error: TypeError) => {
        console.log('Registrar error en el cliente: ' + error)
        throw new Error(
          'Hubo un error al recuperar los proyectos. Por favor, inténtalo de nuevo.'
        )
      })
  },

  put(project: Project) {
    return fetch(`${url}/${project.id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(checkStatus) // Verificamos el estado de la respuesta HTTP
      .then(parseJSON) // Parseamos la respuesta JSON
      .catch((error: TypeError) => {
        console.log('Registrar error en el cliente: ' + error)
        throw new Error(
          'Hubo un error al actualizar el proyecto. Por favor, inténtalo de nuevo.'
        )
      })
  },
}

// Exportamos el objeto 'projectAPI' para su uso en otros archivos
export { projectAPI }

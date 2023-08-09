import { useState, useEffect } from 'react'
import ProjectList from './ProjectList'
import { Project } from './Project'
import { projectAPI } from './projectAPI'

// Componente funcional ProjectsPage que muestra una lista de proyectos y permite su edición
function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]) // Estado para almacenar la lista de proyectos
  const [loading, setLoading] = useState(false) // Estado para controlar el estado de carga
  const [error, setError] = useState<string | undefined>(undefined) // Estado para almacenar errores
  const [currentPage, setCurrentPage] = useState(1) // Estado para almacenar la página actual

  // Función para guardar un proyecto editado
  const saveProject = (project: Project) => {
    projectAPI
      .put(project)
      .then((updatedProject) => {
        // Actualizamos la lista de proyectos con el proyecto editado
        let updatedProjects = projects.map((p: Project) => {
          return p.id === project.id ? new Project(updatedProject) : p
        })
        setProjects(updatedProjects)
      })
      .catch((e) => {
        if (e instanceof Error) {
          setError(e.message) // Mostramos errores en caso de falla
        }
      })
  }

  // Manejador de eventos para cargar más proyectos al hacer clic en el botón
  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1)
  }

  useEffect(() => {
    async function loadProjects() {
      setLoading(true) // Indicamos que se está cargando
      try {
        const data = await projectAPI.get(currentPage) // Cargamos los proyectos de la página actual
        setError('') // Limpiamos errores en caso de éxito
        if (currentPage === 1) {
          setProjects(data) // Si es la primera página, sobrescribimos la lista de proyectos
        } else {
          setProjects((projects) => [...projects, ...data]) // Si no, agregamos más proyectos a la lista existente
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message) // Mostramos errores en caso de falla
        }
      } finally {
        setLoading(false) // Indicamos que la carga ha finalizado
      }
    }
    loadProjects()
  }, [currentPage]) // Se ejecuta cuando cambia la página actual

  return (
    <>
      <h1>Projects</h1>
      {/* Mostramos mensajes de error si existen */}
      {error && (
        <div className='row'>
          <div className='card large error'>
            <section>
              <p>
                <span className='icon-alert inverse '></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}
      {/* Mostramos la lista de proyectos */}
      <ProjectList projects={projects} onSave={saveProject} />
      {/* Mostramos el botón para cargar más proyectos */}
      {!loading && !error && (
        <div className='row'>
          <div className='col-sm-12'>
            <div className='button-group fluid'>
              <button className='button default' onClick={handleMoreClick}>
                Más...
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Mostramos el indicador de carga */}
      {loading && (
        <div className='center-page'>
          <span className='spinner primary'></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  )
}

export default ProjectsPage // Exportamos el componente como el valor predeterminado

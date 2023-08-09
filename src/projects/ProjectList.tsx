import { useState } from 'react'
import { Project } from './Project'
import ProjectCard from './ProjectCard'
import ProjectForm from './ProjectForm'

// Definimos la interfaz para las propiedades del componente ProjectList
interface ProjectListProps {
  projects: Project[] // Lista de proyectos a mostrar en la lista
  onSave: (project: Project) => void // Función llamada cuando se guarda un proyecto editado
}

// Componente funcional ProjectList que muestra una lista de proyectos con opciones de edición
function ProjectList({ projects, onSave }: ProjectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({}) // Estado que almacena el proyecto que se está editando

  // Manejador de eventos para iniciar la edición de un proyecto
  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project) // Actualizamos el estado para indicar el proyecto en edición
  }

  // Función para cancelar la edición y limpiar el proyecto en edición
  const cancelEditing = () => {
    setProjectBeingEdited({}) // Limpiamos el proyecto en edición
  }

  return (
    <div className='row'>
      {/* Mapeamos los proyectos y mostramos el formulario de edición o la tarjeta según el estado */}
      {projects.map((project) => (
        <div className='cols-sm' key={project.id}>
          {project === projectBeingEdited ? (
            <ProjectForm
              onCancel={cancelEditing}
              onSave={onSave}
              project={project}
            />
          ) : (
            <ProjectCard project={project} onEdit={handleEdit}></ProjectCard>
          )}
        </div>
      ))}
    </div>
  )
}

export default ProjectList // Exportamos el componente como el valor predeterminado

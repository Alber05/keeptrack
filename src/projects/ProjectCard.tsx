import React from 'react'
import { Project } from './Project'

// Función que recorta la descripción para que tenga una longitud máxima de 60 caracteres y agrega "..."
function formatDescription(description: string): string {
  return description.substring(0, 60) + '...'
}

// Definimos la interfaz para las propiedades del componente ProjectCard
interface ProjectCardProps {
  project: Project // El proyecto que se mostrará en la tarjeta
  onEdit: (project: Project) => void // Función que se llama cuando se hace clic en el botón de edición
}

// Componente funcional ProjectCard que muestra los detalles de un proyecto en una tarjeta
function ProjectCard(props: ProjectCardProps) {
  const { project, onEdit } = props

  // Manejador de eventos para el clic en el botón de edición
  const handleEditClick = (projectBeingEdited: Project) => {
    onEdit(projectBeingEdited) // Llamamos a la función 'onEdit' pasando el proyecto que se está editando
  }

  return (
    <div className='card'>
      <img src={project.imageUrl} alt='project name' />
      <section className='section dark'>
        <h5 className='strong'>
          <strong>{project.name}</strong>
        </h5>
        <p>{formatDescription(project.description)}</p>
        <p>Budget: {project.budget.toLocaleString()}</p>
        <button
          className='bordered'
          onClick={() => {
            handleEditClick(project) // Llamamos al manejador de edición pasando el proyecto actual
          }}
        >
          <span className='icon-edit'></span>
          Editar
        </button>
      </section>
    </div>
  )
}

export default ProjectCard // Exportamos el componente como el valor predeterminado

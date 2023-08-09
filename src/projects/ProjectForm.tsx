import React, { SyntheticEvent, useState } from 'react'
import { Project } from './Project'

// Definimos la interfaz para las propiedades del componente ProjectForm
interface ProjectFormProps {
  project: Project // Proyecto que se mostrará y editará en el formulario
  onCancel: () => void // Función llamada cuando se cancela el formulario
  onSave: (project: Project) => void // Función llamada cuando se guarda el proyecto editado
}

// Componente funcional ProjectForm que permite editar y guardar los detalles de un proyecto
function ProjectForm({
  onSave,
  onCancel,
  project: initialProject,
}: ProjectFormProps) {
  // Estado para almacenar el proyecto actual
  const [project, setProject] = useState(initialProject)
  // Estado para almacenar los errores de validación
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    budget: '',
  })

  // Manejador de eventos para el envío del formulario
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    // Validamos antes de guardar
    if (!isValid()) return
    onSave(project) // Llamamos a la función 'onSave' pasando el proyecto editado
  }

  // Manejador de eventos para cambios en los campos del formulario
  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target

    // Actualizamos el valor según el tipo de campo
    let updatedValue = type === 'checkbox' ? checked : value
    if (type === 'number') {
      updatedValue = Number(updatedValue)
    }

    const change = {
      [name]: updatedValue,
    }

    // Actualizamos el proyecto y los errores de validación
    let updatedProject: Project
    setProject((previousValue) => {
      updatedProject = new Project({ ...previousValue, ...change })
      return updatedProject
    })
    setErrors(() => validate(updatedProject))
  }

  // Función que realiza la validación de los campos del proyecto
  function validate(project: Project) {
    let errors: any = { name: '', description: '', budget: '' }

    if (project.name.length === 0) {
      errors.name = 'El nombre es requerido'
    }
    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = 'El nombre debe tener al menos 3 caracteres'
    }
    if (project.description.length === 0) {
      errors.description = 'La descripción es requerida'
    }
    if (project.budget === 0) {
      errors.budget = 'El presupuesto debe ser mayor a $0'
    }

    return errors
  }

  // Función que verifica si el formulario es válido
  function isValid() {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    )
  }

  return (
    <form className='input-group vertical' onSubmit={handleSubmit}>
      {/* Campos de edición */}
      <label htmlFor='name'>Nombre del Proyecto</label>
      <input
        type='text'
        name='name'
        placeholder='Ingrese el nombre'
        value={project.name}
        onChange={handleChange}
      />
      {/* Mostrar mensaje de error si existe */}
      {errors.name.length > 0 && (
        <div className='card error'>
          <p>{errors.name}</p>
        </div>
      )}

      <label htmlFor='description'>Descripción del Proyecto</label>
      <textarea
        name='description'
        placeholder='Ingrese la descripción'
        value={project.description}
        onChange={handleChange}
      ></textarea>
      {/* Mostrar mensaje de error si existe */}
      {errors.description.length > 0 && (
        <div className='card error'>
          <p>{errors.description}</p>
        </div>
      )}

      <label htmlFor='budget'>Presupuesto del Proyecto</label>
      <input
        type='number'
        name='budget'
        placeholder='Ingrese el presupuesto'
        value={project.budget}
        onChange={handleChange}
      />
      {/* Mostrar mensaje de error si existe */}
      {errors.budget.length > 0 && (
        <div className='card error'>
          <p>{errors.budget}</p>
        </div>
      )}

      <label htmlFor='isActive'>¿Activo?</label>
      <input
        type='checkbox'
        name='isActive'
        checked={project.isActive}
        onChange={handleChange}
      />

      {/* Botones para guardar y cancelar */}
      <div className='input-group'>
        <button className='primary bordered medium'>Guardar</button>
        <span></span>
        <button type='button' className='bordered medium' onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default ProjectForm // Exportamos el componente como el valor predeterminado

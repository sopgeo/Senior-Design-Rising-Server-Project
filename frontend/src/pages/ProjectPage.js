import { useEffect, useState } from "react"

import ProjectDetails from "../components/ProjectDetails"

const ProjectPage = () => {
  const [projects, setProjects] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('http://localhost:5000/api/project')
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const json = await response.json()

      if (response.ok) {
        setProjects(json)
      }

    }

    fetchProjects()
  }, [])

  return (
    <div>
        {projects && projects.map(project => (
          <ProjectDetails key = {project.project_id} project={project} />
        ))}
      
    </div>
  )
}

export default ProjectPage
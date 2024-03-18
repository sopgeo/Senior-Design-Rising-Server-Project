const ProjectDetails = ({project}) => {
    return(
        <div>
            <h>{project.name} {project.end_semester} {project.end_year}</h>
            
        </div>
    )
}

export default ProjectDetails
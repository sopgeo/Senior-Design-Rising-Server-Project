const ProjectDetails = ({project}) => {
    return(
        <div>
            {project.documents.length > 0 ? (
                <h className="hidelink">
                    <a href={project.documents[0].filepath} target="_blank">
                        {project.name} {project.end_semester} {project.end_year} 
                    </a>
                </h>
            ) : (
                <h1>
                    {project.name} {project.end_semester} {project.end_year} {project.project_id} {project.documents.length}
                </h1>
            )
            }
        </div>
    )
}

export default ProjectDetails
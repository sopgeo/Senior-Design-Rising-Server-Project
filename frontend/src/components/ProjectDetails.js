const ProjectDetails = ({project}) => {
    return(
        <div>
            {project.documents.length > 0 &&
                <h className="hidelink">
                    <a href={project.documents[0].filepath} target="_blank">
                        {project.name} {project.end_semester} {project.end_year}
                    </a>
                </h>
            }
        </div>
    )
}

export default ProjectDetails
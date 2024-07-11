import { useState } from 'react'
import Select from "react-select";
import "../css/TagsInput.css";

const options = [
    {value: "HTML", label: "HTML"},
    {value: "Machine Learning", label: "Machine Learning"},
    {value: "Artificial Intelligence", label: "Artificial Intelligence"},
    {value: "Figma", label: "Figma"},
    {value: "Java", label: "Java"},
    {value: "JavaScript", label: "JavaScript"},
    {value: "Unity", label: "Unity"},
    {value: "Object Oriented Programming", label: "Object Oriented Programming"},
    {value: "Web Development", label: "Web Development"},
    {value: "Tensorflow", label: "Tensorflow"},
    {value: "C#", label: "C#"},
    {value: "C++", label: "C++"},
    {value: "Python", label: "Python"},
    {value: "Research", label: "Research"},
    {value: "Internet of Things", label: "Internet of Things"},
    {value: "Game Development", label: "Game Development"},
    {value: "Mechanical Engineering", label: "Mechanical Engineering"},
    {value: "Computer Science", label: "Computer Science"},
    {value: "Electrical Engineering", label: "Electrical Engineering"},
    {value: "CSS", label: "CSS"},
    {value: "Sensors", label: "Sensors"},
    {value: "Detection/", label: "AWS"},
    {value: "Biology", label: "Biology"},
    {value: "Genomics", label: "Genomics"},
    {value: "Robotics", label: "AWS"},
    {value: "VR", label: "VR"},
    {value: "Linguistics", label: "Linguistics"},
    {value: "MySQL", label: "MySQL"},
    {value: "MongoDB", label: "MongoDB"},
    {value: "AWS", label: "AWS"},
    {value: "Scientific Research", label: "Scientific Research"},
    {value: "Computer Vision", label: "Computer Vision"},
    {value: "UI/UX", label: "UI/UX"}
]

function TagsInput(){
    const [selectedOptions, setSelectedOptions] = useState([])

    const handleChange = (selectedOption) => {
        setSelectedOptions(selectedOption);
    };

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          fontSize: 14,
          color: 'black',
          borderColor: 'black',
          backgroundColor: 'black',
          backgroundColor: state.isSelected ? 'black' : 'white',
        }),
      };

    return (
        <div className="tags-input-container">
            <Select
                options={options}
                value={selectedOptions}
                onChange={handleChange}
                isMulti={true}
            />
        </div>
    )
}

export default TagsInput
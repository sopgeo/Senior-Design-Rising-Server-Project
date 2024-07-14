import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import Select from "react-select";
import "../css/TagsInput.css";
import Path from "../components/Path";



const TagsInput = forwardRef((props, _ref) => {
    const [selectedOptions, setSelectedOptions] = useState([])
    const [options, setOptions] = useState([])

    useImperativeHandle(_ref, () => ({
      getOptions: () => {
        return selectedOptions
      }
    }))

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

      const getTagOptions = async() => {
        try {
            const response = await fetch(
                Path.buildPath("api/tag/tags", true),
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
        
              if (!response.ok) {
                throw new Error("Failed to fetch tags");
              }
    
              const json = await response.json();
    
              if (response.ok) {
                return(json)
              }
    
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

        useEffect (() => {
            const fetchOptions = async () => {
                const options = await getTagOptions()
                const formattedOptions = options.map(tag => ({
                    value: tag.tag_id,
                    label: tag.name
                  }));
                setOptions(formattedOptions)
            }

            fetchOptions()
        }, [])

        

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
)

export default React.memo(TagsInput)
import React from "react";
import { useState, useEffect } from "react";
import { TextField, Chip, Autocomplete } from "@mui/material";


// TODO: languages (propsy są przekazywane z góry a na górze nie uważane)
export default function LanguageTags({ languages, languageList, handleLanguageTags }) {
  const [tags, setTags] = useState(languages);

  // useEffect(() => {
  //   setTags([...languages]);
  // }, []);


  const handleAddTag = (event) => {
    console.log(event);
    if (event.key === "Enter" && event.target.value && !tags.includes(event.target.value)) {
      setTags([...tags, event.target.value]);
      event.target.value = "";
      handleLanguageTags([...tags]);
    }
  };

  const handleAddTagToo = (event) => {
    console.log(event);
    // (event._reactName === "onKeyDown" || event._reactName === "onClick")
    if (event.target.value) {
      setTags([...tags, event.target.value]);
      console.log(tags);
      event.target.value = "";
      handleLanguageTags([...tags]);
    }
  };

  const handleDeleteTag = (index) => {
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
    handleLanguageTags([...tags]);
  };

  return (
    <div>
      <Autocomplete
        options={languageList}
        renderInput={(params) => <TextField {...params} label="Languages" />}
        // onKeyPress={handleAddTag}
        onKeyDown={handleAddTag}
        size="small"
      />
      {tags.map((tag, index) => (
        <Chip key={index} label={tag} onDelete={() => handleDeleteTag(index)} />
      ))}
    </div>
  );
}

// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

<<<<<<< HEAD
  function MyApp() {
    const [characters, setCharacters] = useState([]);
  
    function removeOneCharacter(index) {
      /*
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);*/
        const promise = fetch("Http://localhost:8000/users/:"+index, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      
        return promise;
      }

      function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
      }

      function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      
        return promise;
      }

      function updateList(person) {
        postUser(person)
          .then((response) => {if(response.status === 201){setCharacters([...characters, person])}})
          .then((response) => response.JSON())
          .catch((error) => {
            console.log(error);
          });
      }

      useEffect(() => {
        fetchUsers()
          .then((res) => res.json())
          .then((json) => setCharacters(json["users_list"]))
          .catch((error) => {
            console.log(error);
          });
      }, []);
    
      return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
          <Form handleSubmit={updateList} />
        </div>
      );
      
=======
function MyApp() {
  const [characters, setCharacters] = useState([]);

  function deleteUser(person) {
    const promise = fetch(`http://localhost:8000/users/:${person.id}`, {
      method: "DELETE",
      hedaers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    });
    return promise;
>>>>>>> new_main
  }

  function removeOneCharacter(index) {
    const person = characters[index];
    deleteUser(person)
      .then((response) => {
        if (response.status == 204) {
          const updated = characters.filter((user) => user._id != person.id);
          setCharacters(updated);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          return res.json();
        } else {
          throw new Error("Error")
        }
      })
      .then((person) => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );

}
export default MyApp;
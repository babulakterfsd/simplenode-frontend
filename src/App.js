// import axios from 'axios';
import { useEffect,useRef,useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
     fetch('http://localhost:8080/users')
      .then(res => res.json())
       .then(data => setUsers(data))
  }, [])

  console.log(users);

  const nameRef = useRef();
  const emailRef = useRef();

  // const handleAddUser = (e) => {
  //   e.preventDefault();
  //   const name = nameRef.current.value;
  //   const email = emailRef.current.value;
  //   const newUser = {name,email}
  //   //send data to the server
  //   axios.post('http://localhost:8080/users', {
  //      ...newUser
  //   })
  //    .then(data => {
  //      const addedUser = data;
  //      const newUser = [...users, addedUser]
  //      setUsers(newUser)
  //    })

  //    nameRef.current.value = ''
  //    emailRef.current.value = ''
  // }
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = {name,email}

    //send data to the server
    fetch('http://localhost:8080/users', {
       method: 'post',
       headers: {
         'content-type': 'application/json'
       },
       body: JSON.stringify(newUser)
    })
    .then(res => res.json())
     .then(data => {
       const addedUser = data;
       const newUser = [...users, addedUser]
       setUsers(newUser)
     })

     nameRef.current.value = ''
     emailRef.current.value = ''
  }
 

  
 
  return (
    <div className="App">
      <h3>Found {users.length} users</h3>
      {
        users.map((user,index )=> <h4 key={index}>{user.id} -- {user.name}</h4>)
      }

      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} placeholder='name'/>
        <input type="text" ref={emailRef} placeholder="email"/>
        <input type="submit" value="submit" />
      </form>

    </div>
  );
}

export default App;

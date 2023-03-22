import React, { useState} from "react"; 
import axios from "axios";
 

function Signup() {
    const [user, setuser] = useState({
        name : "",
        email : "",
        phone : "",
        date : ""
    });

    let name,value;
    function handlechange(event) {
       name = event.target.name;
       value = event.target.value;
       setuser({...user,[name]:value});
    }

   const handleclick = async(event) => {
       event.preventDefault();
        const {name , email, phone,date} = user;
        if(name && email && phone && date)
        {
            try{
                await axios.post("http://localhost:5000/register", {
                    name,email,phone,date
                })
                .then(res => {
                    console.log(res.data);
                })
            }catch(err) {
                console.log(err);
            }
        }
        else 
        {
            alert("Invalid Input");
        }
    }

    return (
        <>
        <div className="gautam">
            <nav className="navbar">
                <div className="navbar-1">
                    <h3 className="gk1">KnockOnce</h3>
                </div>
            </nav>
            <div className="home">
                <h1>Appointment Form</h1>
                <form method = "POST" style={{marginTop: "10px", paddingTop: "10px"}}>
                    <div className = "home-1">
                        <div style={{padding: "10px, 10px 5px 10px"}}>
                            <p><b>Name</b></p>
                            <input type="text" placeholder="Enter Name" value = {user.name} name = "name" onChange = {handlechange} />
                        </div>
                        <div style={{padding: "10px, 10px 5px 10px"}}>
                            <p><b>Email</b></p>
                            <input type="text" placeholder="Enter Email Address" value = {user.email} name = "email"  onChange = {handlechange} />
                        </div>
                        <div style={{padding: "10px, 10px 5px 10px"}}>
                            <p><b>Contact No.</b></p>
                            <input type="text" placeholder="Enter Contact No." value = {user.phone} name = "phone"  onChange = {handlechange} />
                        </div>
                        <div style={{padding: "10px, 10px 5px 10px"}}>
                            <p><b>Appointment Date</b></p>
                            <input type="date" placeholder="Enter Appointment date" value = {user.date} name = "date"  onChange = {handlechange} />
                        </div>
                        <button type="submit" onClick = {handleclick}><b>Register</b></button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default Signup;  
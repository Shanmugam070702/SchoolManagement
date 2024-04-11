import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import profileimg from "./assets/defaultprofile.jpg"
import axios from "axios"
import {Button} from "@mui/material"



const Teacherprofile=()=>{
    let userid=useParams()
    let navigate=useNavigate()
    let [details,setDetails]=useState("")

    useEffect(()=>{
        axios.get(`http://localhost:9424/singleteacher/${userid.id}`)
        .then((x)=>{
          setDetails(x.data)
        })
        .catch(()=>{console.log("error");})
    },[])

    let Delete=(id)=>{
        axios.delete(`http://localhost:9424/deleteteacher/${id}`)
        .then((x)=>{
            if (x.data.acknowledged==true) {
                navigate("/home")
            }
            else{
                console.log("error in sending data to delete");
            }
        })
    }
    return(
        <div className='h-[100vh] w-[100%] bg-zinc-400'>
        <h1 className='h-[10vh] w-[100%] bg-black text-white text-center font-[700] text-[35px] flex justify-center items-center'>Welcome to {details.name} profile page</h1>
        <div className='h-[90vh] w-[100%] flex items-center'>
            <div className='h-[100%] w-[50%] flex flex-col justify-center items-center'>
               <img src={profileimg} alt="" className='h-[60%] w-[50%] rounded-full shadow-md shadow-slate-800'/>
               <div className='w-[30%] mt-[30px] flex justify-between items-center'>
                <Button onClick={()=>{navigate(`/editteacher/${details._id}`)}} color='info' className='w-[100px] bg-black' variant='contained'>EDIT</Button>
                <Button onClick={()=>{Delete(details._id)}} color='error' className='w-[100px] bg-black' variant='contained'>DELETE</Button>
               </div>
            </div>
            <div className='h-[90%] w-[30%] flex flex-col justify-evenly items-center  rounded-[20px] bg-zinc-300 shadow-md shadow-slate-800'>
               <table className='h-[90%] w-[90%]'>
                <tr>
                  <td className='font-bold'>Name</td>
                  <td>: {details.name}</td>
                </tr>
                <tr>
                  <td className='font-bold'>Age</td>
                  <td>: {details.age}</td>
                </tr>
                <tr>
                   <td className='font-bold'>Gender</td>
                   <td>: {details.gender}</td>
                </tr>
                <tr>
                   <td className='font-bold'>Phone-No</td>
                   <td>: {details.phone}</td>
                </tr>
                <tr>
                  <td className='font-bold'>Role</td>
                  <td>: {details.role}</td>
                </tr>
                <tr>
                  <td className='font-bold'>Qualification</td>
                  <td>: {details.qualification}</td>
                </tr>
                <tr>
                  <td className='font-bold'>Salary</td>
                  <td>: {details.salary}</td>
                </tr> 
               </table>
               
            </div>
        </div>
      </div>
    )
}
export default Teacherprofile
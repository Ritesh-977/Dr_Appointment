import { createContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const DoctorContext = createContext()

const backendURl = import.meta.env.VITE_BACKEND_URL

const DoctorContextProvider = (props) => {

  const [dToken, setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
  const [appointments, setAppointments] = useState([])
  const [dashData, setDashData] = useState(false)
  const [profileData, setProfileData] = useState(false)
  
  const getAppointments = async () => {
    try {
      const {data} = await axios.get(backendURl + '/api/doctor/appointments', {headers:{dToken}})
     if(data.success){
       setAppointments(data.appointments)
     } else {
      toast.error(data.messsage)
     }
    } catch (error) {
      console.log(error)
      toast.error(error.messsage)
    }
  }

  const completeAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendURl + '/api/doctor/complete-appointment',{appointmentId}, {headers: {dToken}})
      
      if(data.success){
        toast.success(data.message)
        getAppointments()
      } else {
        toast.error(data.messsage)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.messsage)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendURl + '/api/doctor/cancel-appointment',{appointmentId}, {headers: {dToken}})
      if(data.success){
        toast.success(data.message)
        getAppointments()
      } else {
        toast.error(data.messsage)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.messsage)
    }
  }

  const getDashData = async () => {
    try {
      
      const {data} = await axios.get(backendURl + '/api/doctor/dashboard',{headers:{dToken}})
      if(data.success){
        setDashData(data.dashData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.messsage)
    }
  }

  const getProfileData = async () => {
    try {

      const {data} = await axios.get(backendURl + '/api/doctor/profile',{headers:{dToken}})
      if(data.success){
        setProfileData(data.profileData)
      } else {
        toast.error(data.message)
      }
  
    } catch (error) {
      console.log(error)
      toast.error(error.messsage)
    }
  }

    const value = {
        backendURl,
        dToken, setDToken,
        appointments,setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        dashData, setDashData, getDashData,
        profileData, setProfileData,
        getProfileData,
    }

  return (
    <DoctorContext.Provider value={value}>
        {props.children}
    </DoctorContext.Provider>
  )
}

export default DoctorContextProvider

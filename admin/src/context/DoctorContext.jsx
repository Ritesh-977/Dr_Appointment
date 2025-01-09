import { createContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const DoctorContext = createContext()

const backendURl = import.meta.env.VITE_BACKEND_URL

const DoctorContextProvider = (props) => {

  const [dToken, setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
  const [appointments, setAppointments] = useState([])

  const getAppointments = async () => {
    try {
      const {data} = await axios.get(backendURl + '/api/doctor/appointments', {headers:{dToken}})
     if(data.success){
       setAppointments(data.appointments.reverse())
       console.log(data.appointments.reverse())
     } else {
      toast.error(data.messsage)
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
    }

  return (
    <DoctorContext.Provider value={value}>
        {props.children}
    </DoctorContext.Provider>
  )
}

export default DoctorContextProvider

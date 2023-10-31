import { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useAdventure } from '../utils/ctx/adventure.ctx';

const Calendary = ({placeholder}) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const excludedDates = [new Date(2023,8,10),new Date(2023,8,15),new Date(2023,8,22),new Date(2023,8,21)]
  const {state, dispatch} = useAdventure()
  const {date_selected_filter} = state

  const dateFormat = (date) => {
    let d = new Date(date)
    let month = `${d.getMonth() +1}`
    let day = `${d.getDate()}`
    let year = `${d.getFullYear()}`

    if(month.length < 2)
      month = '0' + month
    if(day.length < 2)
      day = '0' + day
    return [year, month, day].join('-')
  }
  
  useEffect(() => {
    dispatch("SET_DATE_SELECTED", dateFormat(selectedDate))
  },[selectedDate])

  const handleChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <div className="m-2 max-[620px]:w-auto">
      <DatePicker 
        selected={selectedDate}
        onChange={(selectedDate)=>handleChange(selectedDate)} 
        className="h-12 block min-h-[auto] max-[620px]:w-auto w-full placeholder-gray rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none"
        placeholderText={placeholder}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        maxDate={new Date(2024,11,31)}
        excludeDates={excludedDates}
      /> 
    </div>
  )
}

export default Calendary
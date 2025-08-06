import React from 'react'
import MeetNavbar from '../../components/MeetNavbar'
import VisitorList from './VisitorList'

function VisitorHome() {
  return (
    <>
     <MeetNavbar title={"Visitor Management"} btnText={"Create Meeting"}/>
     <div className="bg-white  px-4 py-3 shadow-lg mt-4 rounded-lg">
            <div><VisitorList/></div>
        </div>
    </>
  )
}

export default VisitorHome

import { useState } from 'react'
import Nav from "../components/Nav"
import '../App.css'
import { useParams } from 'react-router'
import DenseTable from '../components/DenseTable'


function MainPage() {
  const { Username } = useParams()

  return (
    <div className="App">
      <Nav username={Username} />
      <div className="DenseTable">
        <DenseTable />
      </div>
    </div>
  )
}

export default MainPage
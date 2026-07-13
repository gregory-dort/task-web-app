import React from 'react'
import Header from './components/Header'
import TaskList from './components/TaskList'
import './App.css'
function App() {

  return (
    <div className="bg-gray-900 min-h-screen">
      <Header />
      <TaskList />
    </div>
  )
}

export default App

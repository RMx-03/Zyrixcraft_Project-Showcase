import { useState, useEffect } from 'react'
import Logo from '/assets/images/ZyrixcraftLogo.webp'
import '../style/Loader.css'

function Loader() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          // Add 2 second delay after completion
          setTimeout(() => setIsComplete(true), 2000)
          return 100
        }
        return prev + 2 // Adjust speed as needed
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`loader-container ${isComplete ? 'fade-out' : ''}`}>
      <div className='content'>
        <div className='logo-section'>
          <img src={Logo} alt="ZyrixCraft Logo" className='logo' />
          <h1 className='loading-text'>Loading</h1>
        </div>
        
        <div className='progress-container'>
          <div className='progress-bar'>
            <div 
              className='progress-fill' 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className='progress-text'>{Math.round(progress)}%</div>
        </div>
      </div>
    </div>
  )
}

export default Loader
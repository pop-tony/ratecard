import React, { useEffect } from 'react'
import assets from '../assets/assets'

const ThemeTogleBtn = ({theme, setTheme}) => {

  useEffect(()=>{
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').
    matches;
    setTheme(theme || (prefersDarkMode ? 'dark' : 'light'))
  },[])

  useEffect(()=>{
    if(theme === 'dark'){
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme);

  },[theme])
  return (
    <>
      <button>
        {theme === 'dark' ? (
          <img src={assets.sun} alt=""
          onClick={()=> setTheme('light')}
          className='cursor-pointer size-8.5 p-1.5 border border-gray-500 rounded-full' />
        ) : (
          <img src={assets.moon} alt=""
          onClick={()=> setTheme('dark')}
          className='cursor-pointer size-8.5 p-1.5 border border-gray-500 rounded-full' />
        )}
      </button>
    </>
  )
}

export default ThemeTogleBtn

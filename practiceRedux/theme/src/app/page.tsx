'use client'

import ThemeToggle from '../components/ThemeToggle'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export default function Home() {
  const mode = useSelector((state: RootState) => state.theme.mode)

  return (
    <main className={`${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen flex flex-col items-center justify-center`}>
      <h1 className="text-4xl font-bold">Theme Switcher App</h1>
      <ThemeToggle />
      <h1 className ="text-1xl mt-4">annah</h1>
    </main>
  )
}

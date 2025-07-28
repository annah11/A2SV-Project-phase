'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { toggleTheme } from '../store/themeSlice'

export default function ThemeToggle() {
  const dispatch = useDispatch()
  const mode = useSelector((state: RootState) => state.theme.mode)

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="mt-4 p-3 bg-blue-500 text-white rounded"
    >
      Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  )
}

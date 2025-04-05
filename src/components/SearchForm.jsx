import { useState } from 'react'

const SearchForm = ({ onSearch }) => {
  const [nim, setNim] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (nim.trim()) {
      onSearch(nim)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="relative">
        <input
          type="text"
          value={nim}
          onChange={(e) => setNim(e.target.value)}
          placeholder="Masukkan NIM (contoh: G6401211001)"
          className="w-full px-6 py-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition duration-300"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchForm
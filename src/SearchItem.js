import React from 'react'

const SearchItem = ({search,setSearch}) => {
  return (
    <form className='searchForm'  onSubmit={(e)=>e.preventDefault()}>
     <label htmlFor='Search'>Search</label>
     <input
     id='search'
     role='searchbox'
     placeholder='search Items'
     type='text'
     value={search}
     onChange={(e)=>setSearch(e.target.value)}/>
    </form>
  )
}

export default SearchItem
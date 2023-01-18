import { Button } from '@mui/material'
import React from 'react'
import { useUserContext } from '../../contexts/UserContext'
import { supabase } from '../../supabaseClient'

export const Homepage = () => {
const {logOut} = useUserContext();

supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)
})

  return (
    <>
    <div>Homepage</div>
    <Button onClick={logOut}>Log-out</Button>
    </>
  )
}

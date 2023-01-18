import { Button } from '@mui/material'
import React from 'react'
import { useUserContext } from '../../contexts/UserContext'

export const Homepage = () => {
const {logOut} = useUserContext();


  return (
    <>
    <div>Homepage</div>
    <Button onClick={logOut}>Log-out</Button>
    </>
  )
}

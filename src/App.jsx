import { useState } from 'react'
import './App.css'
import { Button } from "./components/ui/button"
import { HStack } from "@chakra-ui/react"


function App() {
  
    return (
      <HStack>
        <Button>Click me</Button>
        <Button>Click me too!</Button>
      </HStack>
    )
  }

export default App

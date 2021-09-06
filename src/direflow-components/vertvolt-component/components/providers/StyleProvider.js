import React from 'react'
import { ThemeProvider } from 'styled-components'

import { themes } from '../../utils/styles'

export default function StyleProvider(props) {
  return (
    <ThemeProvider
      theme={{
        ...themes['default'],
      }}
    >
      {props.children}
    </ThemeProvider>
  )
}

import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { GlobalStyle } from './utils/styles'
import StyleProvider from './components/providers/StyleProvider.js'
import SearchProvider from './components/providers/SearchProvider.js'
import Router from './components/Router.js'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StyleProvider>
        <SearchProvider>
          <GlobalStyle />
          <Router />
        </SearchProvider>
      </StyleProvider>
    </QueryClientProvider>
  )
}

export default App

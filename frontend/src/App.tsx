import React from 'react'
import { ApolloProvider } from '@apollo/client'
import Gallery from './components/Gallery'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { client } from './lib/apollo'

const App: React.FC = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <div className="grow">
          <Gallery />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  )
}

export default App

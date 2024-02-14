import './App.css'
import { ApiProvider } from './providers'
import Routes from './routes'

function App (): JSX.Element {
  return (
    <ApiProvider>
      <Routes />
    </ApiProvider>
  )
}

export default App

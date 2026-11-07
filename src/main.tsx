import { Component, StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const staticContent = root.innerHTML

// Preserve the build-time readable snapshot if the client app cannot run.
class ContentFallback extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    return this.state.failed
      ? <div dangerouslySetInnerHTML={{ __html: staticContent }} />
      : this.props.children
  }
}

createRoot(root).render(
  <StrictMode>
    <ContentFallback><App /></ContentFallback>
  </StrictMode>,
)

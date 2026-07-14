import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

// ─── Global Error Boundary — catches any render crash ────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('🔥 App crash:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            background: '#1a1a1a',
            color: '#f5f0e8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#c9a84c' }}>
            VERDARA
          </h1>
          <p style={{ marginBottom: '0.5rem', opacity: 0.7 }}>Something went wrong loading the app.</p>
          <pre
            style={{
              background: '#2a2a2a',
              padding: '1rem',
              borderRadius: '4px',
              fontSize: '12px',
              maxWidth: '640px',
              overflow: 'auto',
              color: '#ff6b6b',
              marginTop: '1rem',
            }}
          >
            {this.state.error.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 2rem',
              background: '#c9a84c',
              color: '#1a1a1a',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

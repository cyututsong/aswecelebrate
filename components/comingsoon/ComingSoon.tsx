import React from 'react';

interface ComingSoonProps {
  title?: string;
  subtitle?: string;
  message?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "We're Working on Something Special!",
  subtitle = "Our website is currently under maintenance as we make updates.",
  message = "Thank you for your patience!",
}) => {
  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <span style={styles.badge}>Under Construction 🚧</span>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.subtitle}>{subtitle}</p>
        <p style={styles.message}>{message}</p>
        
        <div style={styles.divider} />

        <p style={styles.footerText}>
          Aswecelebrate • Coming Soon
        </p>
      </div>
    </main>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100vw',
    padding: '20px',
    boxSizing: 'border-box',
    background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(12px)',
    borderRadius: '24px',
    padding: '40px 28px',
    maxWidth: '520px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.6)',
  },
  badge: {
    display: 'inline-block',
    fontSize: '0.85rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#0284c7',
    backgroundColor: '#e0f2fe',
    padding: '6px 16px',
    borderRadius: '50px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: 800,
    color: '#0f172a',
    margin: '0 0 12px 0',
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#334155',
    lineHeight: 1.5,
    margin: '0 0 16px 0',
  },
  message: {
    fontSize: '1rem',
    color: '#64748b',
    lineHeight: 1.6,
    margin: '0 0 24px 0',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e2e8f0',
    margin: '24px auto',
    width: '60%',
  },
  footerText: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#94a3b8',
    margin: 0,
  },
};

export default ComingSoon;
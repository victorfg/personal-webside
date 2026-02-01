import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the TinaCMS admin interface
    router.replace('/admin/index.html#/collections/page');
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Redirecting to TinaCMS Admin...</h1>
        <p>If you are not redirected automatically, <a href="/admin/index.html#/collections/page">click here</a>.</p>
      </div>
    </div>
  );
};

export default AdminRedirect;

import React, { useEffect } from 'react';

export const About = () => {
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f4f4f4',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      color: '#333',
    },
    headerTitle: {
      fontSize: '2.5rem',
      margin: 0,
    },
    headerSubtitle: {
      fontSize: '1.2rem',
      color: '#555',
    },
    content: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      marginBottom: '40px',
    },
    info: {
      flex: 1,
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    infoTitle: {
      fontSize: '2rem',
      marginBottom: '15px',
      color: '#333',
    },
    infoParagraph: {
      fontSize: '1rem',
      color: '#666',
      lineHeight: '1.6',
      marginBottom: '20px',
    },
    subTitle: {
      fontSize: '1.5rem',
      marginBottom: '10px',
    },
    list: {
      listStyle: 'none',
      padding: 0,
    },
    listItem: {
      fontSize: '1.1rem',
      color: '#555',
      marginBottom: '8px',
    },
    footer: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#333',
      color: 'white',
    },
    footerText: {
      margin: 0,
      fontSize: '1rem',
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang
  }, []);

  return (
    <div style={{ height: '100vh', marginTop: '50px' }}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.headerTitle}>Welcome to BOOKING.COM</h1>
          <p style={styles.headerSubtitle}>Your comfort is our priority</p>
        </header>
        <section style={styles.content}>
          <div style={styles.info}>
            <h2 style={styles.infoTitle}>About Us</h2>
            <p style={styles.infoParagraph}>
              Our hotel is located in the heart of the city, offering a luxurious and comfortable stay with exceptional service. We provide top-notch amenities, including spacious rooms, a restaurant, a spa, and more. Whether you are traveling for business or leisure, we have everything you need for a perfect stay.
            </p>
            <h3 style={styles.subTitle}>Why Choose Us?</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Airport shuttle</li>
              <li style={styles.listItem}>Non-smoking rooms</li>
              <li style={styles.listItem}>Free parking</li>
              <li style={styles.listItem}>Free WiFi</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

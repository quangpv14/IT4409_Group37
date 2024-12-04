import React, { useEffect } from 'react';

export const Contact = () => {
  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      textAlign: 'center',
      background: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '2rem',
      color: '#333',
      marginBottom: '10px',
    },
    description: {
      fontSize: '1rem',
      color: '#555',
      marginBottom: '20px',
    },
    info: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginBottom: '20px',
    },
    item: {
      fontSize: '1rem',
      color: '#666',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    icon: {
      fontSize: '1.2rem',
      color: '#ff5a5f',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '5px',
      transition: 'border-color 0.3s',
    },
    inputFocus: {
      borderColor: '#ff5a5f',
    },
    textarea: {
      resize: 'none',
    },
    button: {
      background: '#ff5a5f',
      color: '#fff',
      fontSize: '1rem',
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background 0.3s',
    },
    buttonHover: {
      background: '#e04e4e',
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang
  }, []);
  return (
    <div style={{ height: '100vh', marginTop: '50px' }}>
      <div style={styles.container}>
        <h1 style={styles.title}>Liên Hệ Với Chúng Tôi</h1>
        <p style={styles.description}>
          Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào, hãy điền vào biểu mẫu dưới đây hoặc liên hệ trực tiếp qua thông tin bên dưới.
        </p>
        <div style={styles.info}>
          <div style={styles.item}>
            <i className="fas fa-phone" style={styles.icon}></i>
            <span>Hotline: +84 123 456 789</span>
          </div>
          <div style={styles.item}>
            <i className="fas fa-envelope" style={styles.icon}></i>
            <span>Email: hotelbooking.contact@gmail.com</span>
          </div>
          <div style={styles.item}>
            <i className="fas fa-map-marker-alt" style={styles.icon}></i>
            <span>Địa chỉ: 123 Nguyễn Chí Thanh, Hà Nội, Việt Nam</span>
          </div>
        </div>
        <form style={styles.form}>
          <input
            type="text"
            placeholder="Họ và tên"
            style={styles.input}
            onFocus={(e) => (e.target.style.borderColor = '#ff5a5f')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            onFocus={(e) => (e.target.style.borderColor = '#ff5a5f')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
          <textarea
            placeholder="Nội dung"
            rows="5"
            style={{ ...styles.input, ...styles.textarea }}
            onFocus={(e) => (e.target.style.borderColor = '#ff5a5f')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          ></textarea>
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.background = '#e04e4e')}
            onMouseLeave={(e) => (e.target.style.background = '#ff5a5f')}
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};

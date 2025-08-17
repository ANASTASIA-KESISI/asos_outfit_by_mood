import { useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentMood, setCurrentMood] = useState('');

  const handleFetch = async (mood) => {
    try {
      setLoading(true);
      console.log(mood);
      const response = await fetch('/api/asos/' + mood);
      const data = await response.json();
      console.log('ASOS data:', data);
      return data;
    } catch (err) {
      console.error('Frontend error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  //fixme
  const renderMood = async (mood) => {
    setCurrentMood(mood);
    const productData = await handleFetch(mood);
    if (productData) {
      setProducts(productData.products || productData || []);
    }
  };

  const moodButtons = [
    { mood: 'happy', emoji: '🌸', label: 'Happy', color: 'linear-gradient(135deg, #f9a8d4, #fbbf24)', shadow: '#f9a8d4' },
    { mood: 'romantic', emoji: '💕', label: 'Romantic', color: 'linear-gradient(135deg, #fda4af, #f472b6)', shadow: '#fda4af' },
    { mood: 'edgy', emoji: '✨', label: 'Edgy', color: 'linear-gradient(135deg, #c084fc, #8b5cf6)', shadow: '#c084fc' },
    { mood: 'cozy', emoji: '🤍', label: 'Cozy', color: 'linear-gradient(135deg, #e2e8f0, #f1f5f9)', shadow: '#e2e8f0' }
  ];

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fdf2f8, #fce7f3, #f3e8ff)',
    fontFamily: 'Georgia, serif',
    position: 'relative',
    overflow: 'hidden'
  };

  const decorativeStyle = {
    position: 'absolute',
    fontSize: '3rem',
    opacity: 0.3,
    animation: 'float 3s ease-in-out infinite'
  };

  const buttonStyle = (button, isActive) => ({
    background: button.color,
    border: 'none',
    borderRadius: '50px',
    padding: '15px 30px',
    margin: '10px',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: loading ? 'not-allowed' : 'pointer',
    transform: 'scale(1)',
    transition: 'all 0.3s ease',
    boxShadow: `0 10px 25px ${button.shadow}40`,
    opacity: loading ? 0.7 : 1,
    position: 'relative',
    fontFamily: 'Georgia, serif'
  });

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '25px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  };

  const transformTitle = (str) => {
    const words = str.split(" ");
    words.shift(); // remove first word
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1); // capitalize first letter
    return words.join(" ");
  }

  return (
    <div style={containerStyle}>
      {/* Decorative elements */}
      <div style={{...decorativeStyle, top: '50px', left: '50px'}}>✨</div>
      <div style={{...decorativeStyle, top: '100px', right: '100px', animationDelay: '1s'}}>🌸</div>
      <div style={{...decorativeStyle, bottom: '100px', left: '100px', animationDelay: '2s'}}>💫</div>
      <div style={{...decorativeStyle, bottom: '50px', right: '50px', animationDelay: '0.5s'}}>🦋</div>
      
      <div style={{padding: '40px 20px', position: 'relative', zIndex: 10}}>
        <header style={{textAlign: 'center', marginBottom: '60px'}}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px',
            fontFamily: 'Georgia, serif'
          }}>
            ✨ Shop by Mood ✨
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '20px',
            fontStyle: 'italic',
            marginBottom: '20px'
          }}>
            Discover fashion that matches your vibe, babe 💕
          </p>
          <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
            <div style={{width: '8px', height: '8px', background: '#f9a8d4', borderRadius: '50%', animation: 'pulse 2s infinite'}}></div>
            <div style={{width: '8px', height: '8px', background: '#fda4af', borderRadius: '50%', animation: 'pulse 2s infinite', animationDelay: '0.3s'}}></div>
            <div style={{width: '8px', height: '8px', background: '#c084fc', borderRadius: '50%', animation: 'pulse 2s infinite', animationDelay: '0.6s'}}></div>
          </div>
        </header>

        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '60px'}}>
          {moodButtons.map((button) => (
            <button
              key={button.mood}
              onClick={() => renderMood(button.mood)}
              disabled={loading}
              style={buttonStyle(button, currentMood === button.mood)}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.boxShadow = `0 15px 35px ${button.shadow}60`;
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = `0 10px 25px ${button.shadow}40`;
              }}
            >
              <span style={{fontSize: '24px', marginRight: '10px'}}>{button.emoji}</span>
              {button.label}
              {currentMood === button.mood && !loading && (
                <div style={{
                  position: 'absolute',
                  bottom: '-15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '3px'
                }}>
                  <div style={{width: '6px', height: '6px', background: 'white', borderRadius: '50%', animation: 'bounce 1s infinite'}}></div>
                  <div style={{width: '6px', height: '6px', background: 'white', borderRadius: '50%', animation: 'bounce 1s infinite', animationDelay: '0.1s'}}></div>
                  <div style={{width: '6px', height: '6px', background: 'white', borderRadius: '50%', animation: 'bounce 1s infinite', animationDelay: '0.2s'}}></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {loading && (
          <div style={{textAlign: 'center', padding: '60px 0'}}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid #f9a8d4',
              borderTop: '4px solid transparent',
              borderRadius: '50%',
              margin: '0 auto 30px',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{
              color: '#374151',
              fontSize: '20px',
              fontStyle: 'italic',
              marginBottom: '20px'
            }}>
              Curating the perfect pieces for you, gorgeous... 💫
            </p>
            <div style={{display: 'flex', justifyContent: 'center', gap: '5px'}}>
              <div style={{width: '8px', height: '8px', background: '#f472b6', borderRadius: '50%', animation: 'bounce 1s infinite'}}></div>
              <div style={{width: '8px', height: '8px', background: '#fda4af', borderRadius: '50%', animation: 'bounce 1s infinite', animationDelay: '0.1s'}}></div>
              <div style={{width: '8px', height: '8px', background: '#c084fc', borderRadius: '50%', animation: 'bounce 1s infinite', animationDelay: '0.2s'}}></div>
            </div>
          </div>
        )}

        {currentMood && !loading && (
          <div style={{maxWidth: '1200px', margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: '40px'}}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '20px',
                fontFamily: 'Georgia, serif'
              }}>
                Perfect for your {currentMood} mood ✨
              </h2>
              <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                <span style={{fontSize: '20px'}}>🌸</span>
                <span style={{fontSize: '20px'}}>💕</span>
                <span style={{fontSize: '20px'}}>🦋</span>
              </div>
            </div>

            {products.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px'
              }}>
                {products.map((product, index) => (
                  <div
                    key={product.id || index}
                    style={cardStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                    }}
                  >
                    <div style={{position: 'relative', overflow: 'hidden'}}>
                      {product.imageUrl ? (
                        <img
                          src={"https://" + product.imageUrl}
                          alt={transformTitle(product.name) || 'Product'}
                          style={{
                            width: '100%',
                            height: '300px',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease'
                          }}
                          onLoad={() => {
                            console.log('Image loaded successfully:', product.imageUrl);
                          }}
                          onError={(e) => {
                            console.log('Image failed to load:', product.imageUrl);
                            console.log('Error details:', e.message);
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmOWE4ZDQiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmNDcyYjYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBGYWlsZWQ8L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI2MCUiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5GOPC90ZXh0Pjwvc3ZnPg==';
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '300px',
                          background: 'linear-gradient(135deg, #f9a8d4, #f472b6)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white'
                        }}>
                          <span style={{fontSize: '3rem', marginBottom: '10px'}}>🌸</span>
                          <span style={{fontSize: '14px'}}>No Image Available</span>
                        </div>
                      )}
                    </div>

                    <div style={{padding: '25px'}}>
                      <h3 style={{
                        fontWeight: 'bold',
                        fontSize: '18px',
                        marginBottom: '15px',
                        color: '#374151',
                        fontFamily: 'Georgia, serif',
                        lineHeight: '1.4'
                      }}>
                        {transformTitle(product.name) || 'Gorgeous Product'}
                      </h3>
                      <p style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '20px'
                      }}>
                        {(() => {
                          if (!product.price) return 'Price on request';
                          if (typeof product.price === 'string') return product.price;
                          if (typeof product.price === 'object') {
                            // Handle ASOS price object structure
                            const priceObj = product.price;
                            if (priceObj.current) {
                              return `${priceObj.currency || ''}${priceObj.current.text}`;
                            }
                            if (priceObj.rrp) {
                              return `${priceObj.currency || ''}${priceObj.rrp}`;
                            }
                            return 'Price on request';
                          }
                          return 'Price on request';
                        })()}
                      </p>
                      {product.url && (
                        <a
                          href={`https://asos.com${product.url}`.replace(/\.com([^/])/, ".com/$1")}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'block',
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, #f472b6, #8b5cf6)',
                            color: 'white',
                            padding: '12px 25px',
                            borderRadius: '25px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            fontFamily: 'Georgia, serif'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = '0 10px 25px rgba(244, 114, 182, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          Get This Look 💕
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{textAlign: 'center', padding: '80px 20px'}}>
                <div style={{fontSize: '5rem', marginBottom: '20px'}}>🛍️</div>
                <h3 style={{
                  color: '#374151',
                  fontSize: '2rem',
                  fontFamily: 'Georgia, serif',
                  marginBottom: '10px'
                }}>
                  Oops! No treasures found
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '18px',
                  fontStyle: 'italic',
                  marginBottom: '30px'
                }}>
                  Try another mood to discover your perfect pieces, babe! ✨
                </p>
                <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                  <span style={{fontSize: '2rem', animation: 'bounce 1s infinite'}}>🌸</span>
                  <span style={{fontSize: '2rem', animation: 'bounce 1s infinite', animationDelay: '0.1s'}}>💕</span>
                  <span style={{fontSize: '2rem', animation: 'bounce 1s infinite', animationDelay: '0.2s'}}>🦋</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
            40%, 43% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
}

export default App;
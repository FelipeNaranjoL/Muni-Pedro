window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        patria: {
          blue: '#0039A6',      // Pantone 286 C - Azul Patria
          darkblue: '#00246B',
          yellow: '#FFD500',    // Pantone 109 C - Amarillo Sol
          lightyellow: '#FFF8D6',
          red: '#DE0909',       // Acento heráldico puntual
          ink: '#111827',
          cream: '#F8FAFC'
        }
      },
      fontFamily: {
        display: ['"Baloo 2"', 'cursive', 'sans-serif'],
        sans: ['"Montserrat"', 'sans-serif']
      },
      boxShadow: {
        card: '0 10px 30px -5px rgba(0, 57, 166, 0.08)',
        'card-hover': '0 20px 40px -8px rgba(0, 57, 166, 0.16)',
        'yellow-glow': '0 8px 25px -4px rgba(255, 213, 0, 0.45)'
      }
    }
  }
};
'use client'
 
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Página de error</h2>
        <button onClick={() => reset()}>Intentar nuevamente</button>
      </body>
    </html>
  )
}
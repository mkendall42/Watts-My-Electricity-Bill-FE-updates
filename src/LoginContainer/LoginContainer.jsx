import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginContainer = () => {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      })

      const data = await res.json()

      if (res.ok) {
        // 👇 this is where it switches the view!
        navigate(`/${username}`)
      } else {
        setError(data.message || 'Login failed.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Something went wrong.')
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          className="userName"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default LoginContainer
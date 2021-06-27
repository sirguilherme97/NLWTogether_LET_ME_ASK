import { FormEvent, useState } from 'react'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Link, useHistory } from 'react-router-dom'
import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

export function NewRoom() {
  const { user } = useAuth()
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory()

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }
    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })
    history.push(`/admin/rooms/${firebaseRoom.key}`);
  }
  return (
    <>
      <div id="page-auth">
        <aside>
          <img src={illustrationImg} alt="Imagem Logo" />
          <strong>Crie salas Q&amp;A ao-vivo</strong>
          <p>Tire as dúvidas da sua audiência em tempo-real</p>
        </aside>
        {user ? (
          <main id="logado">
            <div className="main-content">
              <img src={logoImg} alt="Letmeask" />
              <img id="imgLogin" alt="avatar" src={user?.avatar} />
              <h3 id="userLogin">{user?.name}</h3>
              <h2>Criar uma nova sala</h2>
              <form onSubmit={handleCreateRoom}>
                <input
                  type="text"
                  placeholder="Nome da sala"
                  onChange={event => setNewRoom(event.target.value)}
                  value={newRoom}
                >
                </input>
                <Button
                  type="submit">
                  Criar sala
                </Button>
              </form>
              <p>
                Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
              </p>
            </div>
          </main>
        ) : (
          <main>
            <div className="main-content">
              <img src={logoImg} alt="Letmeask" />
              <h2>Criar uma nova sala</h2>
              <form onSubmit={handleCreateRoom}>
                <input
                  type="text"
                  placeholder="Nome da sala"
                  onChange={event => setNewRoom(event.target.value)}
                  value={newRoom}
                >
                </input>
                <Button
                  type="submit">
                  Criar sala
                </Button>
              </form>
              <p>
                Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
              </p>
            </div>
          </main>
        )}
      </div>
    </>
  )
}
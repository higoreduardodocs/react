import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <section className="form-container">
      <div className="form-wrapper">
        <span className="logo">Chat App</span>
        <span className="title">Cadastro</span>
        <form>
          <input required type="text" placeholder="Usuário" />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Senha" />
          <input style={{ display: 'none' }} type="file" id="profile-image" />
          <label htmlFor="profile-image">
            <img src="/image-icon.png" alt="Adicionar imagem de perfil" />
            <span>Imagem de perfil</span>
          </label>
          <button>Cadastrar</button>
        </form>
        <p>Possui uma conta? <Link to="/login">Fazer login</Link></p>
      </div>
    </section>
  )
}

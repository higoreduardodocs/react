export default function Input() {
  return (
    <div className="input">
      <input type="text" placeholder="Insira sua mensagem" />
      <div className="input-icons">
        <img src="/attach-icon.png" alt="Anexar documento" />
        <input type="file" id="image" style={{ display: 'none' }} />
        <label htmlFor="image">
          <img src="/image-icon.png" alt="Adicionar imagem" />
        </label>
        <button>Enviar</button>
      </div>
    </div>
  )
}
import Container from '../ui/container'

export default function Footer() {
  return (
    <Container>
      <footer className="flex items-center justify-center flex-wrap w-full px-6 py-3 mx-auto border-t border-zinc-200">
        <span>&copy; {new Date().getFullYear()}&nbsp;</span>
        <span>Movie. Todos os direitos reservados. Feito com&nbsp;</span>
        <span className="text-red-500">&#10084;</span>
        <span>&nbsp;por&nbsp;</span>
        <a className="font-semibold border-b border-white pb-1">Dudu</a>
      </footer>
    </Container>
  )
}

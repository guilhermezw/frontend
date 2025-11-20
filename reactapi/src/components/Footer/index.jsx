import './styles.css'

export default function Footer (){
  const anoAtual = new Date().getFullYear();
  return (
    <>
      <footer className="footer">
        <span>Copyright &copy; {anoAtual} - Todos os direitos reservados.</span>
      </footer>
    </>
  );
}
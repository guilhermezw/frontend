import * as yup from 'yup';
import{useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import{toast} from 'react-toastify';
import api from '../../services/api';
import './styles.css'

const esquemaDeCadastro = yupResolver.object({
  nome: yup
    .string()
    .required("O nome é obrigatória"),
  email: yup
    .string()
    .email("Email inválido")
    .required("O email é obrigatório"),
  senha: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("A senha é obrigatória")
})

export default function CadastroPage(){
  const {
    register: registrarCampo,
    handleSubmit: lidarComEnvioDoFormulario,
    formState: { errors: errosDoFormulario , isSubmitted: estaEnviando },
    setError: definirErrorNoCampo,
    reset: limparCamposDoFormulario,
  } = useForm({
    resolver: esquemaDeCadastro,
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
    },
  });
  
  async function enviarDados (dadosDoFormulario){
    const dadosParaEnvio = {
      nome: dadosDoFormulario.nome,
      email: dadosDoFormulario.email,
      senha: dadosDoFormulario.senha,
    };
    
    try{
      const resposta = await api.post('/usuarios', dadosParaEnvio);
      toast.success(resposta.data.mensagem || 'Usuário cadastrado com sucesso!');
      limparCamposDoFormulario();
    } catch (error){
      const codigoDeStatus = error.response.status;
      const mensagemDoServidor = error.response?.data?.mensagem || 'Erro ao cadastrar usuário';
      
      if(codigoDeStatus === 400) {
        definirErrorNoCampo('email' , {
          type: 'server',
          message: mensagemDoServidor
        });
      } else {
        toast.error(mensagemDoServidor);
        console.error('Erro ao cadastrar funcionário', error);
      }
    }
  }

  return (
    <>
      <div className = 'cadastro-container'>
        <h1>Cadastro de Funcionários</h1>
        <form noValidate onSubmit={lidarComEnvioDoFormulario(enviarDados)}>
          
          {/* Nome */}
          <div className = 'form-group'>
            <label htmlFor="campo-nome">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder='Digite seu nome'
              {...registrarCampo('nome')}
            />
          </div>
          {errosDoFormulario.nome &&(
            <span className='error'>{errosDoFormulario.nome.message}</span>
          )}
          
          {/* Email */}
          <div className = 'form-group'>
            <label htmlFor="campo-email">Email</label>
            <input
              type="email"
              id="email"
              placeholder='Ex: example@email.com'
              {...registrarCampo('email')}
            />
          </div>
          {errosDoFormulario.email &&(
            <span className='error'>{errosDoFormulario.email.message}</span>
          )}
          
          {/* Senha */}
          <div className = 'form-group'>
            <label htmlFor="campo-senha">Senha</label>
            <input
              type="password"
              id="senha"
              placeholder='Digite uma senha segura'
              {...registrarCampo('senha')}
            />
          </div>
          {errosDoFormulario.senha &&(
            <span className='error'>{errosDoFormulario.senha.message}</span>
          )}
          
          {/* Botão de envio */}
          <button type = 'submit' disabled={estaEnviando}>
            {estaEnviando ? 'Cadastrando...' : 'Cadastrar Funcionário'}
          </button>
          
        </form> 
      </div>
    </>
  );
}
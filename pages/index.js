import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box as = "aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr/>
      <p>
        <a className = 'boxLink' href = {`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

function ProfileRelationsBox  (propriedades) {
  return(
  <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {propriedades.title} ({propriedades.items.length})
    </h2>

    <ul>
      {/* {propriedades.items.map((itemAtual) => {
        return (
          <li key = {itemAtual.id}>
            <a href={`/users/${itemAtual.login}`}>
              <img src={itemAtual.avatar_url}/> 
              <span>{itemAtual.login}</span>
            </a>
          </li>
        )
      })} */}
    </ul>
  </ProfileRelationsBoxWrapper>  
  )
  

}

export default function Home() {
  
  const usuarioAleatorio = 'RafaelN0bre';
  // Essa 'variável' retorna duas coisas, o valor dentro dos parênteses e uma função interna "native code"
  const [comunidades, setComunidades] = React.useState([{
    id : '3423423423849349348234902343232',
    title : 'Eu odeio acordar cedo',
    image :  'https://alurakut.vercel.app/capa-comunidade-01.jpg'
}]);
  // Essa linha de cima faz o mesmo que a linha de baixo, cria duas variáveis, uma com cada elemento
  // const comunidades = comunidades[0]
  // const setComunidades = comunidades[1]

  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function() {
    fetch('https://api.github.com/users/peas/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json()
    })
    .then(function (respostaCompleta) {
      setSeguidores(respostaCompleta)
    })
  }, [])
  
  // Esse segundo parâmetro do use.Effect dita quando ele deve ser realizado, deixando um array vazio ele é executado apenas uma vez

  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className = "subTitle">O que você deseja fazer?</h2>
            <form onSubmit = {function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosdoForm = new FormData(e.target)
              
              console.log ("Campo", dadosdoForm.get('title'))
              console.log ("Campo", dadosdoForm.get('image'))
              
              const comunidade = {
                id : new Date().toISOString(),
                title : dadosdoForm.get('title'),
                image : dadosdoForm.get('image'),
              }
              // Esses três pontinhos são chamados de Spread, você coloca um array e ele vai espalhar os elementos desse array junto a qualquer outro elemento
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas) 
            }}>  
                <div>
                  <input 
                    placeholder = "Qual vai ser o nome da sua comunidade?" 
                    name = 'title'
                    aria-label = "Qual vai ser o nome da sua comunidade?"
                    type = "text"/>
                </div>
                <div>
                  <input 
                    placeholder = "Coloque uma Url para usarmos de capa" 
                    name = 'image'
                    aria-label = "Coloque uma Url para usarmos de capa"/>
                </div>

                <button>
                  Criar comunidade
                </button>
            </form>

          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title = "Seguidores" items = {seguidores} />
          
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>

            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key = {itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image}/> 
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
          </h2>
          <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key = {itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

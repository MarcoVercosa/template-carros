import FormData from 'form-data' //class que permite enviar imagens para o backend
import BuscaBD from "../../../fetchBackEnd/api" //classe axios

async function CriaAnuncio(event, formulario, formularioOpcionais) {//fazupload imagens e retornar o nome e caminho de cada imagem no node
    event.preventDefault()
    const classBuscaBD = new BuscaBD()// classe da Api onde está conf  o Axios
    const dadosImagens = new FormData()//FormData classe que permite o multer identificar as imagens
    for (var i = 0; i < formulario.imagensPath.length; i++) {
        dadosImagens.append("files", formulario.imagensPath[i])
    }
    //para enviar imagens tem q ser pelo FormData
    //primeiro coloca eles numa array com o loop for. Necessário quando é mais de uma imagem

    const retornaImagenslLocationNodeMulter = await classBuscaBD.CadastraImagemMulter(dadosImagens)
    //faz o upload das imagens e o node vai retornar as imagens recebidas
    console.log(retornaImagenslLocationNodeMulter)
    let imagensPath = []
    //faz um map na array nos nomes das imagens retornadas do Node
    retornaImagenslLocationNodeMulter.data.map((dados) => {
        imagensPath.push(dados.filename)//armezeneo nome das imagens em array
    })
    const GuardaDados = await ArmazenaDadosBD(imagensPath, formulario, formularioOpcionais) //chama a func armazena dados enviado o nome das imagens recebidas em array
    console.log(GuardaDados)
    window.location.href = ("#inicio")
    return GuardaDados
    // props.mensagemDeRetorno(GuardaDados.data)
    //retorna mensagem de sucesso ou não

}

//com os nomes das imagens no node, reuni todos os dados do carro e junta com o nome das imagens
async function ArmazenaDadosBD(recebeLocationImagens, formulario, formularioOpcionais) {
    const classBuscaBD = new BuscaBD()
    var imagensLocation = JSON.stringify(recebeLocationImagens);//transforma a array de localização das imagens em uma array String, para poder ser gravado em um único campo no BD
    var reuniDados = formulario
    reuniDados = { ...reuniDados, valor: reuniDados.valor.slice(3, -3) } //3 RETIRA R$  do incio e o -3 retira ,00 do final da string
    reuniDados = { ...reuniDados, imagensPath: imagensLocation } //add os nomes da imagem no obj reunidados, que é o formulario
    var reunidadosFinal = Object.assign(reuniDados, formularioOpcionais) // Object.assign torna dois objs em um só
    console.log(reuniDados)
    const EnviaDadosBD = await classBuscaBD.CadastraDadosBD(reunidadosFinal)
    return EnviaDadosBD
}

export default CriaAnuncio
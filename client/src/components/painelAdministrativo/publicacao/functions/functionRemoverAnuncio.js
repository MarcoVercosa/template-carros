import BuscaBD from "../../../fetchBackEnd/api"

async function RemoverAnuncio(idPesquisa, imagensStorage) {

    const classBuscaBD = new BuscaBD
    const deletaImagem = await classBuscaBD.DeletaImagem(imagensStorage)
    const deletaDadosBD = await classBuscaBD.DeletaAnuncioBD(idPesquisa)
    return deletaDadosBD
}


export default RemoverAnuncio
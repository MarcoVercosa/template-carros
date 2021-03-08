import BuscaBD from "./components/fetchBackEnd/api"


export default async function IsAutenticated() {
    alert("funcao")
    const key = localStorage.getItem("auth")
    console.log(key)
    if (!key) {
        console.log("token não encontrado")
        return false
    }
    const classBuscaBD = new BuscaBD
    const { data } = await classBuscaBD.ValidaTokenPainel()
    console.log(data)

    return data
}


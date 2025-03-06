const frm = document.querySelector("form")
const tbFilmes = document.querySelector("table")


frm.addEventListener("submit", (e) =>{
    e.preventDefault()
    
    const titulo = frm.inTitulo.value 
    const genero = frm.inGenero.value 

    inserirLinha(titulo, genero)
    gravarFilme(titulo, genero)

    frm.reset()
    frm.inTitulo.focus()

})
const inserirLinha =(titulo, genero)=>{
    const linha = tbFilmes.insertRow(-1) //adiciona linha
    
    const col1 = linha.insertCell(0) //criar coluna
    const col2 = linha.insertCell(1)
    const col3 = linha.insertCell(2)

    col1.innerText = titulo
    col2.innerText = genero
    col3.innerHTML = "<i class='exclui' tittle='Excluir'>&#10008</i>"
}
const gravarFilme = (titulo, genero) =>{
    if(localStorage.getItem("filmesTitulo")){
        const filmesTitulo = localStorage.getItem("filmesTitulo") + ";"+ titulo
        const filmesGenero = localStorage.getItem("filmesGenero")+ ";" + genero
        localStorage.setItem("filmesTitulo", filmesTitulo)
        localStorage.setItem("filmesGenero", filmesGenero)
    } else{
        localStorage.setItem("filmesTitulo", titulo)
        localStorage.setItem("filmesGenero", genero)
    }
}
window.addEventListener("load", ()=>{

    if(localStorage.getItem("filmesTitulo")){
        const titulos = localStorage.getItem("filmesTitulo").split(";")
        const generos = localStorage.getItem("filmesGenero").split(";")

        for(let i = 0; i < titulos.length; i++){
            inserirLinha(titulos[i], generos[i])
        }
    }
})
tbFilmes.addEventListener("click", (e) =>{

    if(e.target.classList.contains("exclui")){
        const titulo = e.target.parentElement.parentElement.children[0].innerText
        
        if(confirm(`Confirma Exclusão do Filme "${titulo}"?`))

        e.target.parentElement.parentElementremove()

        localStorage.removeItem("filmesTitulo")
        localStorage.removeItem("filmesGenero")

        for(let i = 1; i < tbFilmes.rows.length; i++){
            const auxTitulo = tbFilmes.rows[i].cells[0].innerText
            const auxGenero = tbFilmes.rows[i].cells[1].innerText
            gravarFilme(auxTitulo, auxGenero)
        }
    }
})
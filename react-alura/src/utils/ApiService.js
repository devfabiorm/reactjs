const UrlBase = 'http://localhost:8000/api/autor';

const ConsomeApi = (parametro = '', method='GET', body) => {

    return fetch(`${UrlBase}/${parametro}`, {method, headers: {'content-type' : 'application/json'}, body})
                .then(res => ApiService.TrataErros(res))
                .then(res => res.json()) 
}

const ApiService = {

    ListaAutores : () => ConsomeApi(),

    CriaAutor : autor => ConsomeApi('', 'POST', autor),

    ListaNomes : () => ConsomeApi('nome'),

    ListaLivros : () => ConsomeApi('livro'),

    RemoveAutor : id => ConsomeApi(id, 'DELETE'),

    TrataErros : res => {

        if(!res.ok){

            throw new Error(res.responseText);
        }
        return res;
    }
}

export default ApiService;
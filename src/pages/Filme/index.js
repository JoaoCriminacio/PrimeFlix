import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api'
import './filme.css';

function Filme() {
    const { id } = useParams();
    const navigation = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilme () {
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "9f63e7bf4e90be1464e746c2b530d227",
                    language: "pt-BR"
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            }).catch(() => {
                navigation("/", { replace: true });
                return;
            });
        }

        loadFilme();

        return () => {
            console.log("Componente desmontado!");
        }

    }, [id, navigation]);

    function salvarFilme() {
        const myList = localStorage.getItem('@primeflix');

        let saveMovies = JSON.parse(myList) || [];

        const hasMovie = saveMovies.some((saveMovies) => saveMovies.id === filme.id);

        if (hasMovie){
            toast.warn('Este filme já está salvo na sua lista!');
            return;
        } else {
            saveMovies.push(filme);
            localStorage.setItem('@primeflix', JSON.stringify(saveMovies));
            toast.success('Filme salvo com sucesso!');
        }
    }

    if (loading) {
        return(
            <div className="filmeInfo">
                <h1>Carregando detalhes do filme...</h1>
            </div>
        )
    }
    
    return(
        <div className="filmeInfo">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='areaButtons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} trailer`} target='blank' rel='external'>Trailer</a>
                </button>
            </div>
        </div>
    );
}

export default Filme;
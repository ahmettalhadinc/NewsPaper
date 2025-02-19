import axios from 'axios';
import  { useEffect, useState } from 'react';

type Result = {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
};

function Health() {
  const [result, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1); 
  const [pageSize] = useState<number>(20);

  useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=a389ee0dc62541acbb76ad0c18db12bd&page=${currentPage}&pageSize=${pageSize}`;

    const fetchArticles = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'ok' && data.articles) {
          setResults(data.articles);
 
          setTotalPages(Math.ceil(data.totalResults / pageSize)); 
        } else {
          setError('Hiçbir makale bulunamadı.');
        }
      } catch (error) {
        setError('Veri çekme işlemi başarısız oldu.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage]); 

  
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <>

      <div style={{ marginBottom: 50 }}>

        <p style={{ fontSize: 11, color: 'grey' }}>Kategori</p>
        <p style={{ fontSize: 18, color: 'black', fontWeight: 'bolder' }}>Sağlık</p>
      </div>

      <div>
        {loading && <p>Yükleniyor...</p>}
        {error && <p>{error}</p>}

        <ul>
          {result.map((article, index) => (
            <li style={{ listStyleType: 'none' }} key={index}>
              <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 50, justifyContent: 'space-between' }}>


                <div style={{ display:'flex', flexDirection:'column', gap:20}}>
                  <h3 style={{ fontSize: 15, fontFamily: 'cursive' }}>{article.title}</h3>
                  <p style={{color:'grey', fontSize:12, fontFamily:'cursive'}}>{article.description}</p>
                  <p><strong>Yazar:</strong> {article.author}</p>
                  <p><strong>Yayın Tarihi:</strong> {new Date(article.publishedAt).toLocaleDateString()}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">Devamını oku</a>
                </div>
                {article.urlToImage && <img src={article.urlToImage} style={{borderRadius:500}} alt={article.title} width={250} height={250} />}


              </div>

            </li>
          ))}
        </ul>
      </div>
      <div>
          <button style={{backgroundColor:'orange', padding:5, color:'white', borderRadius:10, cursor:'pointer'}} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Önceki
          </button>
          <span> Sayfa {currentPage} </span>
          <button style={{backgroundColor:'black', padding:5, color:'white', borderRadius:10 ,cursor:'pointer'}} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Sonraki
          </button>
        </div>
    </>
  );
}

export default Health;

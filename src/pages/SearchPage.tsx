import  { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

type Result = {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
};

const SearchPage = () => {
  const location = useLocation();
  const [articles, setArticles] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1); 
  const [pageSize] = useState<number>(20);

  // Arama terimini URL'den al
  const query = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    const fetchArticles = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${query}&apiKey=a389ee0dc62541acbb76ad0c18db12bd&page=${currentPage}&pageSize=${pageSize}`
        );
        const data = response.data;
        if (response.data.status === "ok" && response.data.articles.length > 0) {
          setArticles(response.data.articles);
          setTotalPages(Math.ceil(data.totalResults / pageSize)); 
        } else {
          setError("Aradığınız kelimeyle ilgili haber bulunamadı.");
        }
      } catch (error) {
        setError("Veri çekme işlemi başarısız oldu.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [query, currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h1>"{query}" için Sonuçlar</h1>

      {loading && <p>Yükleniyor...</p>}
      {error && <p>{error}</p>}

      <div className="news-list">
        {articles.map((article, index) => (
          <div key={index} className="news-item">
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
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button style={{backgroundColor:'orange', padding:5, color:'white', borderRadius:10, cursor:'pointer'}} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Önceki
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button style={{backgroundColor:'black', padding:5, color:'white', borderRadius:10, cursor:'pointer'}} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Sonraki
        </button>
      </div>
    </div>
  );
};

export default SearchPage;

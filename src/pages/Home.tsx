import axios from 'axios';
import  { useEffect, useState } from 'react';
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Result = {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

const Home = () => {
  const [articles, setArticles] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize] = useState<number>(20); // Sayfa başına haber sayısı

  useEffect(() => {
    const fetchArticles = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=a389ee0dc62541acbb76ad0c18db12bd&page=${currentPage}&pageSize=${pageSize}`;

      try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'ok' && data.articles) {
          setArticles(data.articles);
      
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

  // İlk 3 haberi slider için alıyoruz
  const sliderArticles = articles.slice(0, 3);
  // Geri kalan haberleri liste için alıyoruz
  const listArticles = articles.slice(3);

  // React Slick ayarları
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      {loading && <p>Yükleniyor...</p>}
      {error && <p>{error}</p>}

      {/* Slider */}
      <Slider {...sliderSettings}>
        {sliderArticles.map((article, index) => (
          <div key={index} style={{ textAlign: 'center',  }}>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap:'wrap', alignItems:'center', justifyContent:'center'  }}>

              <img src={article.urlToImage} style={{ width: '100%', height: '400px', objectFit: 'contain' }} />
              <div style={{ marginLeft: 20,  }}>
                <h6 style={{fontSize:20, fontFamily:'monospace', marginBottom:20}}>{article.title}</h6>
                <p style={{color:'grey', fontSize:13, fontFamily:"cursive", marginBottom:20}}>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Haberi Oku</a>
              </div>

            </div>
          </div>
        ))}
      </Slider>

   
      <ul>
        {listArticles.map((article, index) => (
          <li style={{ listStyleType: 'none', marginTop:50 }} key={index}>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 50, justifyContent: 'space-between' }}>


              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h3 style={{ fontSize: 15, fontFamily: 'cursive' }}>{article.title}</h3>
                <p style={{ color: 'grey', fontSize: 12, fontFamily: 'cursive' }}>{article.description}</p>
                <p><strong>Yazar:</strong> {article.author}</p>
                <p><strong>Yayın Tarihi:</strong> {new Date(article.publishedAt).toLocaleDateString()}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Devamını oku</a>
              </div>
              {article.urlToImage && <img src={article.urlToImage} style={{ borderRadius: 500 }} alt={article.title} width={250} height={250} />}


            </div>

          </li>
        ))}
      </ul>

    
      <div>
      
        <button  style={{backgroundColor:'orange', padding:5, color:'white', borderRadius:10, cursor:'pointer'}}onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Önceki
        </button>
        <span> Sayfa {currentPage} </span>
        <button style={{backgroundColor:'orange', padding:5, color:'white', borderRadius:10, cursor:'pointer'}} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Sonraki
        </button>
      </div>
    </div>
  );
};

export default Home;

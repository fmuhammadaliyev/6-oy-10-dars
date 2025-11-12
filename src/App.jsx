import { useState, useEffect } from "react";
import styled from "styled-components";

const texts = {
  en: {
    heroTitle: "More than just shorter links",
    heroSubtitle:
      "Build your brand’s recognition and get detailed insights on how your links are performing.",
    statsTitle: "Advanced Statistics",
    statsSubtitle:
      "Track how your links are performing across the web with our advanced statistics dashboard.",
    boostTitle: "Boost your links today",
  },
  uz: {
    heroTitle: "Faqat havolalarni qisqartirish emas",
    heroSubtitle:
      "Brendingizni tanitish va havolalaringiz qanday ishlashini batafsil kuzatish.",
    statsTitle: "Rivojlangan Statistika",
    statsSubtitle: "Havolalaringizning ishlashini web bo‘ylab kuzatib boring.",
    boostTitle: "Havolalaringizni bugun rivojlantiring",
  },
  ru: {
    heroTitle: "Больше чем просто короткие ссылки",
    heroSubtitle:
      "Повышайте узнаваемость вашего бренда и получайте подробную статистику по ссылкам.",
    statsTitle: "Расширенная Статистика",
    statsSubtitle:
      "Отслеживайте, как ваши ссылки работают в сети с помощью нашей панели статистики.",
    boostTitle: "Улучшите свои ссылки сегодня",
  },
  ko: {
    heroTitle: "단순히 링크를 줄이는 것 이상의 가치",
    heroSubtitle: "브랜드 인지도를 높이고 링크 성과를 상세하게 확인하세요.",
    statsTitle: "고급 통계",
    statsSubtitle:
      "링크가 웹에서 어떻게 작동하는지 고급 통계 대시보드로 확인하세요.",
    boostTitle: "오늘 링크를 강화하세요",
  },
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
  a {
    margin-left: 2rem;
    text-decoration: none;
    color: #333;
    font-weight: 500;
  }
  select {
    margin-left: 2rem;
    padding: 0.3rem;
  }
`;

const Hero = styled.section`
  text-align: center;
  padding: 6rem 2rem;
  color: black;
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    input {
      padding: 1rem;
      width: 300px;
      max-width: 80%;
      border: none;
      border-radius: 5px;
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
    button {
      padding: 1rem 2rem;
      border: none;
      border-radius: 5px;
      background: #2acfcf;
      color: #fff;
      cursor: pointer;
    }
  }
`;

const Statistics = styled.section`
  text-align: center;
  padding: 6rem 2rem;
  background: #f0f1f6;
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 3rem;
    color: #9e9aa7;
  }
`;
const Cards = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 10%;
    right: 10%;
    height: 8px;
    background: #2acfcf;
    transform: translateY(-50%);
    z-index: 0;
  }
`;
const Card = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  width: 250px;
  z-index: 1;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  img {
    width: 50px;
    margin-bottom: 1rem;
  }
  h3 {
    margin-bottom: 1rem;
  }
  p {
    color: #9e9aa7;
    font-size: 0.9rem;
  }
`;

const Boost = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  background: #3b3054;
  color: #fff;
  h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
  }
  button {
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    background: #2acfcf;
    color: #fff;
    cursor: pointer;
    margin-top: 1rem;
  }
`;

function App() {
  const [lang, setLang] = useState("en");
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleShorten = () => {
    setLang("en");
  };

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://json-api.uz/api/project/shortly/{lang}`
        );
        const data = await res.json();
        setStats(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error(err);
        setStats([]);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [lang]);

  return (
    <>
      <Header>
        <div className="logo">Shortly</div>
        <Nav>
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Resources</a>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="en">EN</option>
            <option value="uz">UZ</option>
            <option value="ru">RU</option>
            <option value="ko">KO</option>
          </select>
        </Nav>
      </Header>

      <Hero>
        <h1>{texts[lang].heroTitle}</h1>
        <p>{texts[lang].heroSubtitle}</p>
        <div>
          <button onClick={handleShorten}>Shorten It!</button>
        </div>
      </Hero>

      <Statistics>
        <h2>{texts[lang].statsTitle}</h2>
        <p>{texts[lang].statsSubtitle}</p>
        <Cards>
          {loading ? (
            <p></p>
          ) : stats.length > 0 ? (
            stats.map((item) => (
              <Card key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Card>
            ))
          ) : (
            <p>No statistics available.</p>
          )}
        </Cards>
      </Statistics>

      <Boost>
        <h2>{texts[lang].boostTitle}</h2>
        <button>Get Started</button>
      </Boost>
    </>
  );
}

export default App;

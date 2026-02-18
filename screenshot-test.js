// Screenshot usando puppeteer-service
const axios = require('axios');
const puppeteerUrl = 'http://puppeteer-service:3000/scrape';

console.log('Capturando screenshot...');

try {
  // Faz requisição para o serviço Puppeteer pedindo screenshot
  const response = await axios.post(puppeteerUrl, {
    url: 'https://books.toscrape.com/',
    screenshot: true, // Pedir screenshot
    selector: 'article.product_pod' // Opcional: elementos para scrape
  });

  const result = response.data;
  console.log('Resposta do Puppeteer service:', result);

  if (result.success) {
    // Se tiver screenshot, retorna base64
    if (result.screenshot) {
      return [{
        json: {
          screenshot: result.screenshot, // Base64 da imagem
          format: 'png',
          url: 'https://books.toscrape.com/',
          captured_at: new Date().toISOString(),
          source: 'puppeteer_screenshot'
        }
      }];
    }
    
    // Se não tiver screenshot, retorna os dados scrapeados
    const formattedBooks = result.data.map((book, index) => ({
      json: {
        id: index + 1,
        title: book.title,
        price: book.price,
        rating: book.rating,
        url: 'https://books.toscrape.com/',
        captured_at: new Date().toISOString(),
        source: 'puppeteer_scrape'
      }
    }));

    return formattedBooks;
    
  } else {
    console.error('Puppeteer service error:', result.error);
    
    return [{
      json: {
        error: true,
        message: result.error || 'Unknown error',
        source: 'puppeteer_service_error',
        timestamp: new Date().toISOString()
      }
    }];
  }
  
} catch (error) {
  console.error('Request error:', error.message);
  
  return [{
    json: {
      error: true,
      message: error.message,
      source: 'n8n_request_error',
      timestamp: new Date().toISOString()
    }
  }];
}

// Teste Puppeteer via HTTP Request no n8n
const axios = require("axios");
const puppeteerUrl = "http://puppeteer-service:3000/scrape";

console.log("Testando Puppeteer service...");

try {
  // Faz requisição para o serviço Puppeteer (usa scraping padrão)
  const response = await axios.post(puppeteerUrl, {
    url: "https://books.toscrape.com/",
  });

  const result = response.data;
  console.log("Resposta do Puppeteer service:", result);

  if (result.success) {
    console.log(`Scraped ${result.data.length} books successfully!`);

    // Formata os dados para o n8n
    const formattedBooks = result.data.map((book, index) => ({
      json: {
        id: index + 1,
        title: book.title,
        price: book.price,
        rating: book.rating,
        source: "puppeteer_service",
        scraped_at: new Date().toISOString(),
      },
    }));

    return formattedBooks;
  } else {
    console.error("Puppeteer service error:", result.error);

    return [
      {
        json: {
          error: true,
          message: result.error || "Unknown error",
          source: "puppeteer_service_error",
          timestamp: new Date().toISOString(),
        },
      },
    ];
  }
} catch (error) {
  console.error("Request error:", error.message);

  return [
    {
      json: {
        error: true,
        message: error.message,
        source: "n8n_request_error",
        timestamp: new Date().toISOString(),
      },
    },
  ];
}

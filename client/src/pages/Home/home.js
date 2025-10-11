


async function loadPage() {
      try {
        // Adjust the path relative to your HTML file or Vite/public setup
        const response = await fetch('http://127.0.0.1:8000/products/start/', {method:"GET"}); 
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json()
        console.log(data["message"])
        // const html = await response.text();
        // document.getElementById('app').innerHTML = html;
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }

loadPage()
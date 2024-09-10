const apiUrlSearch = '7dbb1bcdfdfa4c962954e67fcbd8fe3f';

const searchHero = async (heroName) => {
  try{
    searchUrl = `https://www.superheroapi.com/api.php/${apiUrlSearch}/search/${heroName}`;
    const response = await fetch(searchUrl)
    if(!response.ok) {
      throw new Error("Network not responding")
    }
    const data = await response.json();
    return data.results ? data.results[0] : null;

  }
  catch (error) {
    console.error("There was a problem with the server", error);
    return null;
  }

};

const searchButton = document.getElementById('search-hero');
searchButton.addEventListener('click', async()=>{
  const heroName = document.getElementById('search-input').value.trim();
  if(heroName) {
    const data = await searchHero(heroName)
    if(data) {
      const heroName = data.name;
      const heroImage = data.image.url
      const powerStats = data.powerstats;
      const placeOfBirth = data.biography["place-of-birth"];

      document.getElementById('hero-name-search').innerText = heroName;
      document.getElementById('hero-image-search').src = heroImage
      document.getElementById('hero-name-search').alt = heroName


      const powerStatsId = document.getElementById('hero-powerstats-search')
      powerStatsId.innerHTML = "";
      for(const [key,value] of Object.entries(powerStats)) {
        const statElement = document.createElement('h3')
        statElement.innerText = `${key}: ${value}`
        powerStatsId.appendChild(statElement);
      }
    
      document.getElementById('birth-place-search').innerText =`Place of birth: ${placeOfBirth ? placeOfBirth: 'unknown'}`
    
    }
    else{
      document.getElementById('hero-name-search').innerText = "Hero not found.";
      document.getElementById('hero-image-search').src = "";
      document.getElementById('hero-image-search').alt = "";
      document.getElementById('hero-powerstats-search').innerHTML = "";
      document.getElementById('birthplace-search').innerText = "";
    }
  }
})
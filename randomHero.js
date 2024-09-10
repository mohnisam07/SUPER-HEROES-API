const apiUrl = '7dbb1bcdfdfa4c962954e67fcbd8fe3f';

const randomHero = async () => {
  try {
    
    const charectorId = Math.floor(Math.random() * 731 + 1);
    const heroId = `https://www.superheroapi.com/api.php/${apiUrl}/${charectorId}`;
    
    const response = await fetch(heroId);
    if (!response.ok) {
      throw new Error("Network not responding");
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error("There was a problem with the server", error);
  }
}

const randomClick = document.getElementById('random-hero');
randomClick.addEventListener('click', async () => {
  const data = await randomHero();
  if (data) {
    const heroName = data.name;
    const heroImage = data.image.url;
    const powerStats = data.powerstats
    const birthPlace = data.biography['place-of-birth']
    
   
    document.getElementById('hero-name-random').innerText = heroName;
    document.getElementById('hero-image-random').src = heroImage;
    document.getElementById('hero-image-random').alt = heroName;
    document.getElementById('birth-place-random').innerText = `Place of Birth: ${birthPlace}`

    const powerStatsId = document.getElementById('hero-powerstats-random')
    powerStatsId.innerHTML = "";
    for(const [key,value] of Object.entries(powerStats)) {
      const statElement = document.createElement('h3')
      statElement.innerText = `${key}: ${value}`
      powerStatsId.appendChild(statElement);
      
    }
  } else {
    document.getElementById('hero-name-random').innerText = "Failed to load superhero data.";
    document.getElementById('hero-image-random').src = "";
    document.getElementById('hero-image-random').alt = "";
    document.getElementById('hero-powerstats').innerHTML = "";
  }
  
});


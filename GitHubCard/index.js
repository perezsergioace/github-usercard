/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

axios.get("https://api.github.com/users/perezsergioace")
.then((response) => {
  console.log(response);
  cards.appendChild(gitHubUserCard(response.data));
})




axios.get("https://api.github.com/users/perezsergioace/followers")
.then((response) => {
  response.data.forEach((element) => {
    axios.get(`https://api.github.com/users/${element.login}`)
    .then(response => {
      cards.appendChild(gitHubUserCard(response.data))
    })
    .catch(error => {
      console.log(error);
    })
  });
})
.catch((error) => {
  console.log("Data was not returned", error)
})

function gitHubUserCard(info){
  const 
    gitHubCard = document.createElement("div"),
    gitHubUserImage = document.createElement("img"),
      gitHubCardInfo = document.createElement("div"),
      name = document.createElement("h3"),
      userName = document.createElement("p"),
      userLocation = document.createElement("p"),
      userProfile = document.createElement("p"),
        userLink = document.createElement("a"),
      followers = document.createElement("p"),
      following = document.createElement("p"),
      bio = document.createElement("p");
  
  gitHubCard.classList.add("card");
  gitHubCardInfo.classList.add("card-info");
  name.classList.add("name");
  userName.classList.add("username");

  gitHubUserImage.src = info.avatar_url;
  name.textContent = info.name;
  userName.textContent = info.login;
  userLocation.textContent = `Location: ${info.location}`;
  userProfile.textContent = "Profile: ";
    userLink.href = info.html_url;
    userLink.textContent = info.html_url;
  followers.textContent = `Followers: ${info.followers}`;
  following.textContent = `Following: ${info.following}`;
  bio.textContent = `Bio: ${info.bio}`;

  gitHubCard.appendChild(gitHubUserImage);
  gitHubCard.appendChild(gitHubCardInfo);
    gitHubCardInfo.appendChild(name);
    gitHubCardInfo.appendChild(userName);
    gitHubCardInfo.appendChild(userLocation);
    gitHubCardInfo.appendChild(userProfile);
      userProfile.appendChild(userLink);
    gitHubCardInfo.appendChild(followers);
    gitHubCardInfo.appendChild(following);
    gitHubCardInfo.appendChild(bio);

  return gitHubCard;
}

const cards = document.querySelector(".cards");


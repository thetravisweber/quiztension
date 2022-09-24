const quizletIds = [705201314];
let correctAnswer;

main();

async function main()
{
  let quizletId = randomElementFrom(quizletIds);
  let cards = await fetchQuizletTerms(quizletId);
  let testCard = randomElementFrom(cards);
  let term = getTermFromCard(testCard);
  correctAnswer = getDefinitionFromCard(testCard);
  populatePrompt(term);
}

function populatePrompt(str)
{
  let prompt = document.getElementById("prompt");
  prompt.innerHTML = str;
}

function checkAnswer()
{
  alert(
    "k"
  );
}

function getTermFromCard(card)
{
  return card.cardSides[0].media[0].plainText;
}

function getDefinitionFromCard(card)
{
  return card.cardSides[1].media[0].plainText;
}

function randomElementFrom(arr)
{
  let randomIndex = Math.floor(arr.length * Math.random());
  return arr[randomIndex];
}

async function fetchQuizletTerms(id){
  let res = await fetch(
    `https://quizlet.com/webapi/3.4/studiable-item-documents?filters%5BstudiableContainerId%5D=${id}&filters%5BstudiableContainerType%5D=1&perPage=5&page=1`
  ).then(res => res.json())
  let currentLength = 5;
  let token = res.responses[0].paging.token
  let terms = res.responses[0].models.studiableItem;
  let page = 2;
  console.log({token, terms})
  while (currentLength >= 5){
      let res = await fetch(`https://quizlet.com/webapi/3.4/studiable-item-documents?filters%5BstudiableContainerId%5D=${id}&filters%5BstudiableContainerType%5D=1&perPage=5&page=${page++}&pagingToken=${token}`).then(res => res.json());
      terms.push(...res.responses[0].models.studiableItem);
      currentLength = res.responses[0].models.studiableItem.length;
      token = res.responses[0].paging.token;
  }
  return terms;
}
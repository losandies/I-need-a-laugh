let jokeButton = document.querySelector('#joke-button');
let iMessage = document.querySelector('.imessage');
let fromThem = document.createElement('p');
let fromThem2 = document.createElement('p');
let fromMe = document.createElement('p');
let fromMe2 = document.createElement('p');
let typing = document.createElement('p');
let emojis = document.querySelectorAll('.emoji');

fromThem.classList.add('from-them');
fromThem2.classList.add('from-them');
fromMe.className = 'from-me no-tail emoji';
fromMe2.classList.add('from-me');
typing.className = 'from-them typing';

let generateJoke = async () => {
	const jokeRes = await fetch('https://dad-jokes.p.rapidapi.com/random/joke', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'x-rapidapi-host': 'dad-jokes.p.rapidapi.com/',
			'x-rapidapi-key': '49ed49f35emshd0c7931fd78d141p1e2c99jsnd1494b2bb065',
		},
	});

	const joke = await jokeRes.json();
	const setup = joke.body[0].setup;
	const punchline = joke.body[0].punchline;

	const dialogue = () => {
		iMessage.appendChild(fromThem);
		// fromThem.innerText = setup;
		fromThem.innerText = setup;

		setTimeout(() => {
			iMessage.appendChild(typing);
			typing.innerText = 'Typing...';
		}, 1000);

		setTimeout(() => {
			iMessage.removeChild(typing);
			iMessage.appendChild(fromThem2);
			fromThem2.innerText = punchline;
		}, 4000);

		emojis.forEach((emoji) => {
			emoji.addEventListener('click', (e) => {
				e.preventDefault();
				iMessage.appendChild(fromMe);
				fromMe.innerText = e.target.innerText;
			});
		});
	};

	dialogue();
};

let count = 0;

if (count <= 2) {
	jokeButton.addEventListener('click', generateJoke);
	count++;
	console.log(count);
} else {
	alert(
		'Sorry, Im poor and cant afford the unlimited jokes API access. check back in 24 hours!'
	);
}

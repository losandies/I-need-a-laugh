let jokeButton = document.querySelector('#joke-button');
let iMessage = document.querySelector('.imessage');
let fromThem = document.createElement('p');
let fromThem2 = document.createElement('p');
let fromMe = document.createElement('p');
let fromMe2 = document.createElement('p');
let typing = document.createElement('p');
let emojis = document.querySelectorAll('.emoji');

import API_KEY from './apikey.js';

fromThem.className = 'from-them';
fromThem2.className = 'from-them';
fromMe.className = 'from-me no-tail emoji';
fromMe2.className = 'from-me';
typing.className = 'from-them typing';

// Keeps iMessage container scrolled down as messages flow
iMessage.scrollTop = iMessage.scrollHeight - iMessage.clientHeight;

let count = 0;

let initiateChat = async () => {
	if (count <= 2) {
		const jokeRes = await fetch(
			'https://dad-jokes.p.rapidapi.com/random/joke',
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'x-rapidapi-host': 'dad-jokes.p.rapidapi.com/',
					'x-rapidapi-key': `${API_KEY}`,
				},
			}
		);

		const joke = await jokeRes.json();
		const setup = joke.body[0].setup;
		const punchline = joke.body[0].punchline;

		const pushDialogue = () => {
			iMessage.appendChild(fromThem);
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
					iMessage.appendChild(fromMe);
					fromMe.innerText = e.target.innerText;
				});
			});
		};

		pushDialogue();
	} else {
		alert(
			"Sorry, I'm poor and cant afford the unlimited jokes API access. Please check back in 24 hours!"
		);
	}
};

jokeButton.addEventListener('click', () => {
	count++;
	initiateChat();
});

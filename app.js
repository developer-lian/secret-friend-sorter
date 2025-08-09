// Global state of friends
let friends = [];

// Utility: normalize a name by collapsing internal spaces and trimming ends
function normalizeName(name) {
	return String(name).replace(/\s+/g, ' ').trim();
}

// Add a friend from the input with validation and update the rendered list
function addFriend() {
	const input = document.getElementById('friend');
	const raw = input ? input.value : '';
	const cleaned = normalizeName(raw);

	// Validate non-empty input
	if (!cleaned) {
		alert('Please enter a name.');
		return;
	}

	// Prevent duplicates (case-insensitive, after normalization)
	const exists = friends.some(f => f.toLowerCase() === cleaned.toLowerCase());
	if (exists) {
		alert('This name is already in the list.');
		return;
	}

	friends.push(cleaned);
	if (input) input.value = '';
	renderList();
}

// Render the <ul> with current friends
function renderList() {
	const listEl = document.getElementById('friendsList');
	if (!listEl) return;

	// Clear list to avoid duplicates before re-rendering
	listEl.innerHTML = '';

	for (let i = 0; i < friends.length; i++) {
		const li = document.createElement('li');
		li.textContent = friends[i];
		listEl.appendChild(li);
	}
}

// Randomly pick a friend and show the result
function drawFriend() {
	if (!friends.length) {
		alert('There are no friends to draw.');
		return;
	}

	const index = Math.floor(Math.random() * friends.length);
	const picked = friends[index];

	const resultEl = document.getElementById('result');
	if (resultEl) {
		resultEl.innerHTML = `<li>${picked}</li>`;
	}
}

// UX: allow pressing Enter to add a friend
document.addEventListener('DOMContentLoaded', () => {
	const input = document.getElementById('friend');
	if (input) {
		input.addEventListener('keyup', (e) => {
			if (e.key === 'Enter') addFriend();
		});
	}
});

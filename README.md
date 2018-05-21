# Seven Wonders

You are a the leader of an ancient city, and you need to ensure your supremacy against your rival.

This is a game for 2 players. You will lead a city and create armies to attack each other.

## Content
[Installation](#Installation)
[Launch the game](#Launch)
[Game play](#Game-play)

## Installation

To install the game, you need node install on your system.
Then, you need to clone the repository and install the dependencies.

	git clone https://github.com/7wondersEsme/SevenWondersJS
	cd SevenWondersJS
	yarn install


## Launch the game

Just run the game.js script to play the game with your mate!

	yarn game
or

	node game.js

## Game play
### Actions

You will play in turns. You have 15 seconds to choose an action, or it will be the turn of the other player.
You have a list of 	six actions:

	0: Create army
	1: Send trader with gold
	2: Send trader with corn
	3: Offer gold
	4: Offer corn
	5: Attack

### Create army
It will attempt to create 10 soldiers. If you don't have enough resources, it will create as many soldiers as possible, i.e 4 if you have enough to create 4 soldiers.
One soldier costs 10 corn and 10 gold.
> The soldiers age, so they eventually die. Also, they can be hurt. A hurt soldier can fight, but he won't hurt or kill an other soldier. It can only remove point of life of the enemy's city.

### Send trader with gold
The traders take 100 corn or gold, and give you back 200 of the other type, i.e a trader with gold will give you 200 corn.
A trader costs itself 100 corn and 100 gold, so sending a trader with gold will cost you 200 gold and 100 corn.

### Send trader with corn
Just like a trader with gold, but the other way around. It will cost you 100 gold and 200 corn, and you will get back 200 corn.
> A trader can be killed! If your opponent has more soldiers than you, it's likely that your trader will never come back and the resources will be lost...

### Offer gold
You can offer gold to your divinity. The more you give, the more you will receive. The divinity gives you gold on a regular basis if you made offer.

### Offer corn
It's the same for corn, you will receive corn from your divinity if you offer some.

### Attack
This is the only way to win! Each city has 100 000 points of life. When you attack, all your soldiers will march on the enemy's city. If your army is more powerful, you will burn some buildings of your enemy's city, i.e remove some PV. The computation of the power is: **number of soldiers * 100 + numbers of valid** (i.e not hurt) **soldiers * 100**
The soldiers can be hurt or killed when you attack, but when you defend, your soldiers will only be hurt.
Your divinity can also destroy your city, because of her anger. You will suffer an attack with a certain power, but your soldiers won't be hurt.

## It's your turn to play!


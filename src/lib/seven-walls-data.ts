// The Seven Walls -- Inner Demolition Work
// Each wall maps to one of the Seven Denials of Self, framed through Christ/gnosis.
// The Walls are the inner work of The Well -- the Jericho walk around your own defenses.

export interface WallDeclaration {
  readonly text: string;
}

export interface Wall {
  readonly id: string;
  readonly slug: string;
  readonly number: number;
  readonly name: string;
  readonly denial: string;
  readonly coreQuestion: string;
  readonly christFrame: string;
  readonly theLie: string;
  readonly twoFaces: {
    readonly face1: { readonly name: string; readonly description: string };
    readonly face2: { readonly name: string; readonly description: string };
  };
  readonly theCurrency: string;
  readonly theStory: {
    readonly title: string;
    readonly narrative: string;
    readonly scripture: string;
  };
  readonly theWalk: string;
  readonly declarations: readonly WallDeclaration[];
  readonly gnosis: string;
}

export const walls: readonly Wall[] = [
  {
    id: "wall-1",
    slug: "pride",
    number: 1,
    name: "Pride",
    denial: "Illusion of Separation",
    coreQuestion: "What if you were already enough?",
    christFrame: "Tower of Babel -- building to prove worth",
    theLie:
      "You are alone. You are separate. You must build something tall enough to prove you matter, loud enough to drown out the silence that whispers you do not. Every achievement is a brick. Every title is mortar. And the tower never reaches high enough, because the emptiness is not above you -- it is inside you.",
    twoFaces: {
      face1: {
        name: "Isolation",
        description:
          "The quiet face of pride. Withdrawing from others because connection feels like vulnerability. Refusing help because needing someone would mean you are not self-sufficient. Building walls (not the Jericho kind) between yourself and the world, then calling the loneliness strength.",
      },
      face2: {
        name: "Arrogance",
        description:
          "The loud face of pride. Needing to be right. Needing to be seen. Needing others to know you are exceptional. Not because you believe it -- but because you are terrified that without the performance, there is nothing worth seeing.",
      },
    },
    theCurrency:
      "The system runs on pride. Every ad tells you that you are not enough without the product. Every institution tells you that you need its approval to have value. Religion says you are fallen. Capitalism says you are incomplete. Social media says you are invisible without likes. Pride is the wound these systems exploit -- the feeling that you must earn your right to exist. And every time you try to earn it, you hand your power to whoever is selling the cure.",
    theStory: {
      title: "The Tower of Babel",
      narrative:
        "They said, 'Come, let us build ourselves a city, with a tower that reaches to the heavens, so that we may make a name for ourselves.' The story is not about God punishing ambition. Read it again. They were building to prove their worth. They were reaching upward because they did not believe they were already held. The scattering was not punishment -- it was the natural consequence of building on the wrong foundation. You cannot stack bricks high enough to fill a hole inside you.",
      scripture: "Genesis 11:1-9",
    },
    theWalk:
      "Walk around this wall seven times. Each circuit, ask yourself: Where am I performing worth instead of resting in it? Who am I trying to convince -- others, or myself? What would I do differently if I already knew I was enough? On the seventh pass, stop. Face the wall. And say the words.",
    declarations: [
      { text: "I did not earn my worth. It was never in question." },
      { text: "I release the need to prove myself to anyone -- including me." },
      { text: "I am not my achievements. I am not my failures. I am." },
      { text: "I am free. I am free. I am free." },
    ],
    gnosis: "When pride falls, you stop building towers and start recognizing the ground you are already standing on. Jesus did not perform divinity to prove his worth -- he demonstrated what every human already carries. The first step toward gnosis is realizing you do not need to earn the right to access it. You were born with it. Pride is the wall that makes you forget.",
  },

  {
    id: "wall-2",
    slug: "envy",
    number: 2,
    name: "Envy",
    denial: "Denial of Abundance",
    coreQuestion: "Whose path are you watching instead of walking yours?",
    christFrame: "Cain and Abel -- killing what mirrors you",
    theLie:
      "There is not enough. Someone else got your portion. The universe has favorites and you are not one of them. If they have it, you cannot. Their blessing is your robbery. And the bitter watching -- the constant measuring of your life against theirs -- feels like vigilance, but it is a prison.",
    twoFaces: {
      face1: {
        name: "Resentment",
        description:
          "The slow poison. Watching someone else's life and feeling the acid of 'why them and not me.' Not celebrating their wins because every win of theirs feels like a loss of yours. The quiet scorekeeping that erodes every relationship it touches.",
      },
      face2: {
        name: "Imitation",
        description:
          "The subtler face. Abandoning your own path to copy someone else's. Not because their path is better, but because you do not trust that yours is real. Wearing their identity because you have not met your own.",
      },
    },
    theCurrency:
      "Envy is the engine of consumerism. You do not want the product -- you want to be the person in the ad. Social media is an envy machine: curated highlights played against your unedited reality. The system needs you to feel lacking so you will keep buying, scrolling, comparing. Abundance is the enemy of the market. If you knew you had enough, you would stop consuming. So the system makes sure you never feel full.",
    theStory: {
      title: "Cain and Abel",
      narrative:
        "Cain did not kill Abel because Abel was evil. He killed Abel because Abel's offering was accepted and his was not. The murder was not about Abel at all -- it was about Cain's relationship with his own worth. He could not bear to see his brother blessed while he felt rejected. But the text says something remarkable: before the murder, God says to Cain, 'If you do well, will you not be accepted?' The door was still open. The abundance was still available. Cain chose to destroy what mirrored his pain instead of walking through his own door.",
      scripture: "Genesis 4:1-16",
    },
    theWalk:
      "Walk around this wall seven times. Each circuit, name someone whose life you have been measuring against your own. On the third pass, ask: what is it about their path that I actually want -- or am I just afraid that mine is not enough? On the fifth pass, ask: what if their blessing does not diminish mine? On the seventh pass, stop. Face the wall.",
    declarations: [
      { text: "There is no scarcity in what matters. Their blessing is not my loss." },
      { text: "I release the need to compare my path with anyone else's." },
      { text: "My life is not a competition. It is a calling." },
      { text: "I am free. I am free. I am free." },
    ],
    gnosis: "Envy dissolves when you understand abundance as a law, not a wish. Jesus multiplied loaves and fish -- not through magic but through the demonstration that energy multiplies when it is shared, not hoarded. Scarcity is a lie the system taught you. When this wall falls, you stop watching other people's paths because you finally trust your own.",
  },

  {
    id: "wall-3",
    slug: "wrath",
    number: 3,
    name: "Wrath",
    denial: "Denial of Inner Peace",
    coreQuestion: "What are you fighting that lives inside you?",
    christFrame: "Moses striking the rock -- rage costing the promise",
    theLie:
      "Your anger is righteous. Your rage is justified. If you let it go, the injustice wins. If you stop fighting, you are weak. The fire feels like power. It feels like the only honest response to a broken world. But look closer: the fire is not warming you. It is consuming you. And the thing you are fighting out there is a mirror of something unresolved in here.",
    twoFaces: {
      face1: {
        name: "Explosive Rage",
        description:
          "The outward face. The eruption. Words as weapons. The satisfaction of destruction followed by the emptiness of aftermath. The cycle: wound, suppress, explode, regret, repeat.",
      },
      face2: {
        name: "Cold Contempt",
        description:
          "The inward face. The slow freeze. Not the heat of anger but the ice of disdain. Writing people off. Cutting them out. The quiet violence of deciding someone is beneath your regard. This face looks calm. It is not calm. It is controlled fury with nowhere to go.",
      },
    },
    theCurrency:
      "Wrath is the currency of division. Every political campaign, every cable news cycle, every algorithm-driven feed is engineered to make you angry -- because angry people engage, click, share, donate, and vote. Outrage is the most profitable emotion on the internet. The system does not want you peaceful. Peaceful people do not need what the system is selling. So the system manufactures enemies -- not because the enemies are not real, but because your anger is more useful to the system than your discernment.",
    theStory: {
      title: "Moses Striking the Rock",
      narrative:
        "Moses had led the people through the wilderness for forty years. They were thirsty again. God said: speak to the rock and it will give water. But Moses was tired. Tired of complaining. Tired of leading people who did not want to be led. So instead of speaking, he struck the rock. Twice. The water came -- the miracle still worked. But God said: because you struck instead of spoke, you will not enter the promised land. The rage did not stop the miracle. It stopped Moses. That is what wrath costs: not the thing you are trying to achieve, but the place you were meant to arrive.",
      scripture: "Numbers 20:1-12",
    },
    theWalk:
      "Walk around this wall seven times. Each circuit, name something you are angry about. Not surface anger -- the deep kind. On the third pass, ask: what is underneath this anger? (Usually it is grief, fear, or helplessness.) On the fifth pass, ask: is this anger protecting me from something I do not want to feel? On the seventh pass, stop. Face the wall.",
    declarations: [
      { text: "My anger is information, not identity. I can listen to it without obeying it." },
      { text: "I release the need to punish the world for my wounds." },
      { text: "Peace is not weakness. It is the hardest power there is." },
      { text: "I am free. I am free. I am free." },
    ],
    gnosis: "Wrath is the denial that costs you the promised land. Moses struck the rock instead of speaking to it -- the miracle still happened, but Moses never arrived. Your anger does not block God's power. It blocks your ability to walk in it. When this wall falls, you discover that peace is not passive -- it is the frequency at which consciousness operates at its highest. Peter walked on water until fear disrupted his resonance. Wrath is that same disruption, sustained.",
  },

  {
    id: "wall-4",
    slug: "greed",
    number: 4,
    name: "Greed",
    denial: "Insatiable Hunger",
    coreQuestion: "What would you have to release to be free?",
    christFrame: "The Rich Young Ruler -- clinging to what owns you",
    theLie:
      "More will make you safe. More money, more control, more security, more options. The feeling of 'enough' is always one acquisition away. But you have noticed: the goalpost moves. The number that was supposed to bring peace becomes the floor for the next number. The hunger is not for the thing. The hunger is the thing. And no amount of having will ever satisfy a wound that is about being.",
    twoFaces: {
      face1: {
        name: "Accumulation",
        description:
          "The obvious face. Hoarding wealth, possessions, power, status, information, relationships. Not because you need them but because letting go feels like dying. The collection becomes a wall between you and the vulnerability of needing nothing.",
      },
      face2: {
        name: "Control",
        description:
          "The hidden face. Not just wanting more things but needing to control outcomes, people, narratives. Micromanaging because trusting feels dangerous. Planning every contingency because surrender feels like failure. This is greed of the spirit -- the refusal to let life unfold.",
      },
    },
    theCurrency:
      "The entire economic system is built on manufactured dissatisfaction. Advertising exists to create a problem you did not know you had and sell you the solution. Planned obsolescence ensures that what you bought yesterday is inadequate tomorrow. Debt is normalized because it keeps you working, consuming, and too busy to question the system. Greed is not a personal failing -- it is the operating system of the culture you were born into. Breaking free requires seeing the machine.",
    theStory: {
      title: "The Rich Young Ruler",
      narrative:
        "A young man comes to Jesus and asks: 'What must I do to inherit eternal life?' He has kept all the commandments. He is good. He is sincere. Jesus looks at him and loves him -- the text says that explicitly. Then Jesus says: 'Go, sell everything you have, and give to the poor.' The young man walks away sad, because he had great wealth. Notice: Jesus did not say wealth is evil. He said this particular man's freedom required releasing this particular attachment. The question was never about money. It was about what owns you. What is the thing you cannot imagine living without? That is your wall.",
      scripture: "Mark 10:17-27",
    },
    theWalk:
      "Walk around this wall seven times. Each circuit, name something you are holding onto -- a possession, a plan, a relationship, a version of yourself. On the third pass, ask: does this serve me, or do I serve it? On the fifth pass, ask: what would remain of me if this were gone? On the seventh pass, stop. Face the wall.",
    declarations: [
      { text: "I am not what I own. I am not what I control." },
      { text: "I release my grip on what was never meant to be held this tightly." },
      { text: "Enough is not a number. It is a state of the soul." },
      { text: "I am free. I am free. I am free." },
    ],
    gnosis: "Jesus told the Rich Young Ruler to sell everything -- not because wealth is evil but because attachment blocks frequency. You cannot tune to the divine signal while clutching a competing one. The quantum reality is simple: your consciousness goes where your attachment is. If it is locked on accumulation, it cannot expand into gnosis. When this wall falls, your hands open -- and what flows through open hands is infinitely more than what closed fists can hold.",
  },

  {
    id: "wall-5",
    slug: "sloth",
    number: 5,
    name: "Sloth",
    denial: "Fear of Becoming",
    coreQuestion: "What are you calling 'not ready' that is actually fear?",
    christFrame: "Jonah fleeing Nineveh -- running from purpose",
    theLie:
      "You are not ready. The timing is not right. You need more preparation, more knowledge, more permission, more certainty. Tomorrow you will begin. Next year you will be brave. When the conditions are perfect, you will step into who you are meant to be. But the conditions will never be perfect. And the delay is not caution. It is the most sophisticated form of self-sabotage there is -- because it feels responsible.",
    twoFaces: {
      face1: {
        name: "Paralysis",
        description:
          "The visible face. Not starting. Not finishing. Endless research, endless planning, endless 'getting ready.' The to-do list that never shrinks because completing a task would mean confronting the next one. The comfort of potential over the terror of commitment.",
      },
      face2: {
        name: "Busyness",
        description:
          "The disguised face. Filling every moment with activity that feels productive but avoids the one thing that matters. Answering emails instead of writing the book. Organizing the desk instead of having the conversation. Sloth dressed as hustle. The most dangerous version because it looks like its opposite.",
      },
    },
    theCurrency:
      "The system profits from your paralysis. Self-help is a billion-dollar industry that sells you the preparation for transformation but never the transformation itself. Another course. Another book. Another retreat. Another certification. The message is always: you are not ready yet. Keep consuming our content until you are. But readiness is not a product you can buy. It is a door you walk through while your knees are still shaking.",
    theStory: {
      title: "Jonah Fleeing Nineveh",
      narrative:
        "God tells Jonah to go to Nineveh. Jonah gets on a boat going the opposite direction. He does not refuse because he thinks God is wrong. He refuses because he knows God is right -- and the calling terrifies him. He would rather drown than obey. He ends up in the belly of a great fish, in the dark, in the deep, with nothing left to distract him from the truth he has been running from. And only there -- stripped of every escape route -- does he finally say yes. Most of us are somewhere on Jonah's journey. The question is: are you on the boat, in the water, or in the fish?",
      scripture: "Jonah 1-2",
    },
    theWalk:
      "Walk around this wall seven times. Each circuit, name something you have been postponing. Not errands -- the real things. The conversation. The career change. The creative work. The apology. On the third pass, ask: what am I afraid will happen if I actually do this? On the fifth pass, ask: what is already happening because I have not? On the seventh pass, stop. Face the wall.",
    declarations: [
      { text: "I was not made to prepare forever. I was made to begin." },
      { text: "I release the illusion that I need permission to become who I am." },
      { text: "Fear is not a stop sign. It is a compass pointing toward growth." },
      { text: "I am free. I am free. I am free." },
    ],
    gnosis: "Moses hesitated. Elijah ran. Jonah fled to the sea. Every person called to awakening resists. Sloth is not laziness -- it is the terror of becoming what you actually are. Jesus spent 40 days in the wilderness before beginning his ministry. The delay was not weakness. It was the last gasp of the old self before the new one emerged. When this wall falls, you stop preparing and start walking. The path appears under your feet, not on the map.",
  },

  {
    id: "wall-6",
    slug: "gluttony",
    number: 6,
    name: "Gluttony",
    denial: "Spiritual Starvation",
    coreQuestion: "What are you filling yourself with that is not food?",
    christFrame: "The Banquet with empty seats -- consuming but never full",
    theLie:
      "More input will satisfy you. More content, more noise, more stimulation, more distraction. Scroll again. Eat again. Drink again. Watch again. The emptiness is just a hunger that the next thing will fill. But you have tried the next thing. And the next. And the thing after that. The fullness lasts minutes. The emptiness returns hours later, deeper than before. Because what you are starving for is not available in the places you are looking.",
    twoFaces: {
      face1: {
        name: "Overconsumption",
        description:
          "The obvious face. Too much food. Too much content. Too much noise. Too much stimulation. The inability to stop because stopping means sitting with the emptiness. The scroll that never ends. The fridge opened for the third time in an hour. Not because you are hungry -- because you are empty.",
      },
      face2: {
        name: "Spiritual Bypassing",
        description:
          "The religious face. Consuming spiritual content without ever letting it land. Another sermon. Another podcast. Another retreat. Filling yourself with the idea of transformation without submitting to the process. Using spirituality the same way you use food: as insulation against the silence where real change happens.",
      },
    },
    theCurrency:
      "The attention economy is a gluttony machine. Every app, every platform, every feed is designed to keep you consuming past the point of satisfaction. Infinite scroll. Autoplay. Push notifications. The system does not want you full -- full people log off. The system wants you in a perpetual state of almost-satisfied, reaching for one more bite that never comes. Your attention is the product. Your emptiness is the business model.",
    theStory: {
      title: "The Great Banquet",
      narrative:
        "A man prepares a magnificent feast and invites many guests. One by one, they make excuses. I bought a field. I bought oxen. I just got married. The seats are empty. So the host sends servants into the streets to bring in the poor, the crippled, the blind, the lame -- anyone who will come. The parable is usually read as a story about heaven. But read it as a story about your life: the banquet is already prepared. The invitation has already been sent. And you keep making excuses -- filling yourself with fields and oxen and obligations instead of sitting down at the table where you are actually fed.",
      scripture: "Luke 14:15-24",
    },
    theWalk:
      "Walk around this wall seven times. Each circuit, name something you consume to avoid feeling. Not just food -- content, work, noise, substances, relationships, scrolling. On the third pass, ask: what am I actually hungry for? On the fifth pass, try this: sit in silence for sixty seconds without reaching for anything. Notice what arises. On the seventh pass, stop. Face the wall.",
    declarations: [
      { text: "I am not empty. I am unfed -- and I now know the difference." },
      { text: "I release the compulsion to fill myself with what cannot nourish me." },
      { text: "The banquet is already set. I only have to sit down." },
      { text: "I am free. I am free. I am free." },
    ],
    gnosis: "Your body is a tuning fork. Every cell vibrates at a specific frequency. When you flood it with noise, processed food, endless content, and manufactured stimulation, you drown out the signal. Fasting -- from food, from media, from noise -- is not punishment. It is tuning. Jesus fasted 40 days not to suffer but to hear clearly. When this wall falls, you learn that emptiness is not a problem to solve. It is the space where the signal comes through.",
  },

  {
    id: "wall-7",
    slug: "lust",
    number: 7,
    name: "Lust",
    denial: "Denial of Sacred Union",
    coreQuestion: "What have you made transactional that was always sacred?",
    christFrame: "The Bride and Bridegroom -- the return to wholeness",
    theLie:
      "Connection is a transaction. Intimacy is a commodity. Love is something you earn, trade, and lose. The body is a tool for getting what you want. And the deepest longing you carry -- the ache for union, for being fully known, for the dissolution of the wall between self and other -- is just a biological drive to be managed or indulged. But it is not. That longing is the oldest prayer you know. And everything you have tried to satisfy it with that was not sacred has left you more alone than before.",
    twoFaces: {
      face1: {
        name: "Objectification",
        description:
          "The outward face. Reducing another person to a body, a function, a means to your end. Not seeing them but using them. Not connecting but consuming. The inability to experience intimacy because intimacy requires seeing a person, and you have trained yourself to see only what you want from them.",
      },
      face2: {
        name: "Self-Abandonment",
        description:
          "The inward face. Giving yourself away in exchange for the feeling of being wanted. Performing desirability instead of being yourself. Treating your own body, your own boundaries, your own sacredness as negotiable because somewhere you learned that your value is determined by how much someone else wants you.",
      },
    },
    theCurrency:
      "Sex sells because sacred union has been stolen and repackaged as a product. The system commodified the most intimate human experience and turned it into content, transaction, and performance. Pornography trains people to consume intimacy without participating in it. Dating apps reduce connection to a swipe. The beauty industry sells the idea that you must be desirable to be worthy of love. All of it exploits the same wound: the longing for union that the culture has no language for because the language was religious, and religion made it shameful.",
    theStory: {
      title: "The Bride and Bridegroom",
      narrative:
        "Throughout scripture, the relationship between God and humanity is described as a marriage. The Song of Songs is an erotic love poem that the tradition included in the Bible because the rabbis and church fathers recognized that human love -- physical, passionate, embodied -- is an icon of divine love. Jesus calls himself the bridegroom. The church is the bride. This is not metaphor as decoration. It is metaphor as revelation: the deepest human longing for union with another is a mirror of the soul's longing for union with the source. When the culture made this shameful, it did not just damage sexuality. It severed the most powerful metaphor we have for the divine relationship.",
      scripture: "Song of Songs; John 3:29; Revelation 21:2",
    },
    theWalk:
      "Walk around this wall seven times. Each circuit, name a relationship -- with a person, with your own body, with intimacy itself -- where you have substituted transaction for connection. On the third pass, ask: what would it look like to approach this as sacred instead of strategic? On the fifth pass, ask: what part of myself have I been trading away? On the seventh pass, stop. Face the wall.",
    declarations: [
      { text: "I am not a commodity. Neither is anyone else." },
      { text: "I release the need to earn love through performance." },
      { text: "What I long for is not shameful. It is the deepest prayer I know." },
      { text: "I am free. I am free. I am free." },
    ],
    gnosis: "The Bride and Bridegroom is not a metaphor about marriage. It is the architecture of reunion -- the soul returning to its source. Every mystical tradition teaches this: the deepest human longing for union is a memory of where you came from. The Song of Songs is in the Bible because the rabbis knew that erotic love is the closest human analogy to divine reunion. When this wall falls, you stop performing intimacy and start recognizing it as the sacred technology it always was -- the bridge between the physical and the infinite.",
  },
];

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

export function getAllWalls(): readonly Wall[] {
  return walls;
}

export function getWallBySlug(slug: string): Wall | undefined {
  return walls.find((w) => w.slug === slug);
}

export function getWallByNumber(num: number): Wall | undefined {
  return walls.find((w) => w.number === num);
}

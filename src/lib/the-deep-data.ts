// The Deep -- The System of Control
// Four Currents (Horsemen reframed as water metaphor) -- invisible forces
// that pull you under if you do not see them.

export interface CurrentPillar {
  readonly name: string;
  readonly description: string;
}

export interface CurrentHistoryEntry {
  readonly era: string;
  readonly description: string;
}

export interface Current {
  readonly id: string;
  readonly slug: string;
  readonly number: number;
  readonly name: string;
  readonly horseman: string;
  readonly whatItControls: string;
  readonly christCounter: { readonly text: string; readonly reference: string };
  readonly architecture: string;
  readonly history: readonly CurrentHistoryEntry[];
  readonly pillars: readonly CurrentPillar[];
  readonly breakingFree: string;
  readonly scripture: readonly { readonly text: string; readonly reference: string }[];
}

export const currents: readonly Current[] = [
  {
    id: "current-1",
    slug: "the-white-current",
    number: 1,
    name: "The White Current",
    horseman: "White Horse",
    whatItControls: "Mind -- ideology, education, media, narrative",
    christCounter: {
      text: "You shall know the truth, and the truth shall set you free.",
      reference: "John 8:32",
    },
    architecture:
      "The White Current controls what you are allowed to think. It operates through education systems that teach compliance over curiosity, media organizations that manufacture consensus, religious institutions that punish independent inquiry, and social platforms that amplify approved narratives while suppressing dissent. The mechanism is not censorship in the crude sense -- it is the shaping of the frame through which all information is interpreted. You do not need to ban a book if you can ensure that no one has the framework to understand it.",
    history: [
      {
        era: "The Library of Alexandria",
        description:
          "The ancient world's greatest repository of knowledge was destroyed -- not once but repeatedly, by multiple empires, each wanting to control what humanity was allowed to remember. The loss was not accidental. Knowledge is power, and power does not share willingly.",
      },
      {
        era: "The Council of Nicaea (325 AD)",
        description:
          "Constantine convened 300 bishops not to find truth but to establish a single, empire-compatible version of Christianity. Dissenting theologies were declared heresy. Dissenting texts were ordered destroyed. The White Current rides wherever political power merges with religious authority.",
      },
      {
        era: "The Medieval Latin Lock",
        description:
          "For a thousand years, the Bible existed only in Latin -- a language common people could not read. The clergy held a monopoly on interpretation. William Tyndale was strangled and burned for translating scripture into English. The crime was not bad translation. The crime was giving people direct access to the source.",
      },
      {
        era: "Modern Media Architecture",
        description:
          "Six corporations control 90% of what Americans read, watch, and hear. Social media algorithms do not show you the truth -- they show you what keeps you engaged. The information landscape is not broken. It is working exactly as designed: to shape perception at scale while maintaining the illusion of free choice.",
      },
    ],
    pillars: [
      {
        name: "Keeper of Salvation",
        description:
          "The institution that claims exclusive access to God, truth, or enlightenment. You cannot reach the divine without us. You cannot interpret the text without our credentials. Submit to our authority or risk eternal consequence.",
      },
      {
        name: "Maker of Instruction",
        description:
          "The education system that teaches you what to think, not how to think. Standardized curricula that produce standardized minds. Critical thinking is taught as a skill but punished as a practice whenever it challenges institutional authority.",
      },
      {
        name: "Weaver of Narrative",
        description:
          "Media -- news, entertainment, social platforms -- that constructs the story you live inside. Not by telling you what to believe but by deciding what is worth discussing and what is not. The most powerful form of control is not the lie you are told but the truth you are never shown.",
      },
      {
        name: "Master of Experience",
        description:
          "The pharmaceutical, entertainment, and technology complex that mediates your relationship with your own consciousness. You are not allowed to have experiences the system has not approved. Altered states are criminalized or commodified. The inner world is either pathologized or monetized.",
      },
    ],
    breakingFree:
      "Read primary sources, not summaries. Learn the original languages -- even a little Greek changes how you read scripture. Question the frame, not just the content: who benefits from this narrative? What is not being said? Seek out the voices that were suppressed -- the Nag Hammadi texts, the Desert Mothers, the mystics who were tried for heresy. The antidote to controlled narrative is direct encounter with the source material.",
    scripture: [
      {
        text: "You shall know the truth, and the truth shall set you free.",
        reference: "John 8:32",
      },
      {
        text: "Be transformed by the renewing of your mind.",
        reference: "Romans 12:2",
      },
      {
        text: "The Spirit searches all things, even the deep things of God.",
        reference: "1 Corinthians 2:10",
      },
    ],
  },

  {
    id: "current-2",
    slug: "the-red-current",
    number: 2,
    name: "The Red Current",
    horseman: "Red Horse",
    whatItControls: "Body -- perpetual war, division, manufactured enemies",
    christCounter: {
      text: "Blessed are the peacemakers, for they will be called children of God.",
      reference: "Matthew 5:9",
    },
    architecture:
      "The Red Current controls your body and your tribe through perpetual conflict. It operates by manufacturing enemies -- not because enemies do not exist, but because the system needs you afraid, divided, and willing to sacrifice your children on the altar of national security. The mechanism is ancient: create an us and a them, then make the them monstrous enough to justify any violence against them. Every empire has used this. Every empire will.",
    history: [
      {
        era: "The Crusades (1095-1291)",
        description:
          "Pope Urban II promised crusaders that killing Muslims was a path to salvation. A homeless teacher who said 'love your enemies' was used to justify two centuries of religious warfare. The first three centuries of Christianity were pacifist. The Red Current drowned that tradition.",
      },
      {
        era: "The Inquisition",
        description:
          "The institutional church tortured and executed people for thinking differently. Not for crimes. For thoughts. For reading the wrong books. For asking the wrong questions. The Red Current does not just kill bodies. It kills curiosity.",
      },
      {
        era: "Colonial Christianity",
        description:
          "European powers weaponized the gospel to justify slavery, genocide, and land theft across Africa, the Americas, and Asia. The Prince of Peace was made the mascot of empire. Indigenous spirituality was destroyed because it could not be controlled.",
      },
      {
        era: "The Permanent War Economy",
        description:
          "Since 1945, the United States has been at war for all but a handful of years. The defense budget exceeds the next ten nations combined. War is not a failure of the system -- it is the system. Peace is not profitable. Conflict is the business model.",
      },
    ],
    pillars: [
      {
        name: "The Enemy Factory",
        description:
          "The apparatus that manufactures threats. Not all threats are manufactured -- but the system's response is always disproportionate because disproportionate response is profitable. Every generation has its boogeyman. The enemy changes. The fear machine does not.",
      },
      {
        name: "The Division Engine",
        description:
          "Left vs right. Black vs white. Christian vs Muslim. Urban vs rural. The system needs you fighting each other so you never look up at the system itself. Every culture war is a distraction from the class war that no one is allowed to name.",
      },
      {
        name: "The Honor Complex",
        description:
          "The mythology that violence is noble. That warriors are heroes. That sacrifice for the state is the highest calling. Jesus washed feet. The Red Current hands out medals.",
      },
      {
        name: "The Body Tax",
        description:
          "Your physical body is the currency of the Red Current. You labor. You fight. You consume. You die. The system extracts value from your body at every stage and calls it freedom. Health is not a right -- it is a market. Rest is not a practice -- it is laziness.",
      },
    ],
    breakingFree:
      "Study the early church's pacifism -- the first three centuries were clear: Christians do not kill. Read the Sermon on the Mount as a political manifesto, not a spiritual mood. Practice seeing the humanity in the person the system tells you to hate. Refuse to let your body be conscripted for someone else's profit. Rest as resistance. Peace as subversion.",
    scripture: [
      {
        text: "Blessed are the peacemakers, for they will be called children of God.",
        reference: "Matthew 5:9",
      },
      {
        text: "Love your enemies and pray for those who persecute you.",
        reference: "Matthew 5:44",
      },
      {
        text: "Put your sword back in its place, for all who draw the sword will die by the sword.",
        reference: "Matthew 26:52",
      },
    ],
  },

  {
    id: "current-3",
    slug: "the-black-current",
    number: 3,
    name: "The Black Current",
    horseman: "Black Horse",
    whatItControls: "Sustenance -- engineered scarcity, debt, resource control",
    christCounter: {
      text: "The earth is the Lord's, and everything in it.",
      reference: "Psalm 24:1",
    },
    architecture:
      "The Black Current controls your sustenance by engineering scarcity in a world of abundance. The planet produces enough food to feed 10 billion people -- 8 billion are alive, and nearly a billion go hungry. This is not a production problem. It is a distribution problem, and distribution is controlled by those who profit from scarcity. The mechanism: make basic necessities -- food, water, shelter, healthcare -- available only through participation in a system designed to extract maximum labor for minimum security.",
    history: [
      {
        era: "The Enclosure Acts",
        description:
          "For centuries, common land belonged to everyone. The Enclosure Acts privatized it, forcing peasants off land their families had worked for generations. The commons became private property. Self-sufficiency became illegal. You now had to work for wages to survive on land your ancestors had lived on freely.",
      },
      {
        era: "The Creation of Debt",
        description:
          "The modern banking system creates money through debt. Every dollar in circulation was borrowed into existence. The system requires perpetual growth because the interest on the debt must be paid with money that does not yet exist. This is not a conspiracy theory. It is central banking 101.",
      },
      {
        era: "The Green Revolution",
        description:
          "Industrial agriculture was sold as the solution to world hunger. It produced more food -- but made farmers dependent on patented seeds, chemical fertilizers, and corporate supply chains. Small farms died. Corporations took their place. Food became a commodity controlled by a handful of companies.",
      },
      {
        era: "The Gig Economy",
        description:
          "The promise of freedom from traditional employment became a system of maximum extraction with minimum obligation. No benefits. No security. No floor. The worker bears all the risk while the platform captures all the value. The Black Current rebranded precarity as entrepreneurship.",
      },
    ],
    pillars: [
      {
        name: "Artificial Scarcity",
        description:
          "Making abundant things scarce through legal, economic, and political mechanisms. Housing costs rise not because houses are scarce but because housing is treated as an investment vehicle. Food rots in warehouses while people go hungry because feeding them is not profitable.",
      },
      {
        name: "The Debt Trap",
        description:
          "Student loans. Mortgages. Medical debt. Credit cards. The system lends you money to access basic necessities, then extracts decades of labor as repayment. Debt is not a financial instrument. It is a control mechanism. A person in debt is a person who cannot say no.",
      },
      {
        name: "Resource Monopoly",
        description:
          "Water, land, seeds, minerals, energy -- the commons, privatized. Six companies control most of the world's food supply. A handful of corporations control the water supply in developing nations. The earth's abundance is captured, gated, and sold back to you.",
      },
      {
        name: "Wage Dependency",
        description:
          "You cannot grow your own food, build your own shelter, or heal your own body without money. And the only way to get money is to sell your time to someone who profits from it more than you do. Self-sufficiency is not impossible -- it is illegal, zoned against, and culturally ridiculed.",
      },
    ],
    breakingFree:
      "Practice generosity as resistance. Share what you have. Build local food systems. Support cooperative economics. Reduce debt not as financial advice but as spiritual liberation. Study the Jubilee tradition -- every fifty years, all debts were cancelled, all slaves freed, all land returned. Jesus' first public sermon quoted Isaiah's Jubilee passage. The early church held everything in common. The antidote to engineered scarcity is radical generosity.",
    scripture: [
      {
        text: "The earth is the Lord's, and everything in it.",
        reference: "Psalm 24:1",
      },
      {
        text: "Give to everyone who asks you, and if anyone takes what belongs to you, do not demand it back.",
        reference: "Luke 6:30",
      },
      {
        text: "All the believers were together and had everything in common. They sold property and possessions to give to anyone who had need.",
        reference: "Acts 2:44-45",
      },
    ],
  },

  {
    id: "current-4",
    slug: "the-pale-current",
    number: 4,
    name: "The Pale Current",
    horseman: "Pale Horse",
    whatItControls: "Life itself -- pharma, food, fear of death, depopulation",
    christCounter: {
      text: "I have come that they may have life, and have it to the full.",
      reference: "John 10:10",
    },
    architecture:
      "The Pale Current controls your relationship with life and death. It operates through the medicalization of existence, the industrialization of food, and the weaponization of fear. The mechanism: keep you afraid of death so you will accept any system that promises safety, no matter the cost. Make health a product you purchase rather than a state you cultivate. Ensure that the food supply slowly poisons you so the medical system can treat you -- profitably -- for the rest of your shortened life.",
    history: [
      {
        era: "The Medicalization of Death",
        description:
          "For most of human history, people died at home, surrounded by family, supported by community and spiritual practice. The modern medical system moved death into hospitals, stripped it of ritual, and turned it into a medical failure rather than a natural transition. Death became the enemy to be defeated rather than the threshold to be crossed.",
      },
      {
        era: "Industrial Food",
        description:
          "The food supply was transformed from local, seasonal, and nutrient-dense to global, processed, and profit-optimized. Ultra-processed food now makes up more than half of the average Western diet. The system does not feed you -- it manages your consumption for maximum corporate profit and minimum nutritional value.",
      },
      {
        era: "The Fear Industry",
        description:
          "From plague to pandemic, from terrorism to climate catastrophe -- fear is the most reliable tool of control. A population in perpetual fear does not think clearly, does not question authority, and does not resist. The Pale Current does not need to kill you. It needs you afraid of dying.",
      },
      {
        era: "Pharmaceutical Dependency",
        description:
          "The pharmaceutical industry does not profit from your health. It profits from your managed illness. Chronic conditions treated with lifelong medications are more profitable than cures. The system has no financial incentive to make you well. It has every incentive to keep you dependent.",
      },
    ],
    pillars: [
      {
        name: "The Fear of Death",
        description:
          "The root lever. Everything the Pale Current does depends on your terror of dying. Religion weaponized it as eternal damnation. Medicine weaponized it as endless intervention. Culture weaponized it as youth worship. If you can face death without flinching, the Pale Current loses its grip.",
      },
      {
        name: "The Poisoned Table",
        description:
          "The food supply is not designed to nourish you. It is designed to be cheap, addictive, and shelf-stable. The same companies that sell you the food sell you the drugs to manage the diseases the food causes. This is not a conspiracy. It is a business model.",
      },
      {
        name: "Managed Illness",
        description:
          "Healthcare is a misnomer. The system manages disease. It does not cultivate health. Prevention is underfunded because prevention does not generate recurring revenue. The patient is a subscription, not a person.",
      },
      {
        name: "Life as Commodity",
        description:
          "Your life force -- your energy, your attention, your years -- is the raw material of the economy. The system does not care about your wellbeing. It cares about your productivity. When you are too old or too sick to produce, the system discards you. This is not cynicism. It is the actuarial model.",
      },
    ],
    breakingFree:
      "Make peace with death. This is the master key. Every spiritual tradition that Jesus drew from -- the prophets, the mystics, the desert tradition -- teaches that the fear of death is the root of all bondage. 'Perfect love casts out fear' (1 John 4:18). Grow your own food when possible. Learn your body. Practice fasting -- not as punishment but as the discovery that you need less than you think. Study the resurrection not as a future event but as the present reality: the pattern of death and new life is happening now, in you, if you let it.",
    scripture: [
      {
        text: "I have come that they may have life, and have it to the full.",
        reference: "John 10:10",
      },
      {
        text: "Where, O death, is your victory? Where, O death, is your sting?",
        reference: "1 Corinthians 15:55",
      },
      {
        text: "Perfect love casts out fear.",
        reference: "1 John 4:18",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

export function getAllCurrents(): readonly Current[] {
  return currents;
}

export function getCurrentBySlug(slug: string): Current | undefined {
  return currents.find((c) => c.slug === slug);
}

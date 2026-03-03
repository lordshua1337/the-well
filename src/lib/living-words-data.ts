// Living Words -- daily transformation prompt system
// 60 entries rotating over 2 months, across 10 categories
// Voice: a wise friend who asks the question you have been avoiding

export type LivingWordCategory =
  | "perception"
  | "release"
  | "presence"
  | "correction"
  | "encounter"
  | "justice"
  | "body"
  | "shadow"
  | "community"
  | "silence";

export interface LivingWord {
  readonly id: string;
  readonly day: number; // 1-60
  readonly category: LivingWordCategory;
  readonly title: string;
  readonly prompt: string;         // Core question/invitation (2-4 sentences)
  readonly grounding: string;      // Scholarly connection (2-3 sentences)
  readonly microPractice: string;  // One concrete thing to do today
  readonly relatedWordId?: string;
  readonly relatedConceptSlug?: string;
  readonly relatedDossierId?: string;
  readonly relatedPracticeSlug?: string;
}

export const CATEGORY_LABELS: Record<LivingWordCategory, string> = {
  perception: "Perception",
  release: "Release",
  presence: "Presence",
  correction: "Correction",
  encounter: "Encounter",
  justice: "Justice",
  body: "Body",
  shadow: "Shadow",
  community: "Community",
  silence: "Silence",
};

export const CATEGORY_DESCRIPTIONS: Record<LivingWordCategory, string> = {
  perception: "Questions about how you see. Metanoia territory.",
  release: "Aphiemi -- letting go. What are you carrying that was never yours to hold?",
  presence: "Being here now. Pneuma. What happens when you stop performing your spirituality?",
  correction: "Word corrections applied to life. Where have you been aiming at the wrong target?",
  encounter: "Meeting the divine in unexpected places. Thomas 77 territory.",
  justice: "Dikaiosyne. Whose voice is being silenced in a conversation you are part of?",
  body: "Sarx reframed. Embodiment. Where does your body hold tension your mind refuses to name?",
  shadow: "Honest self-examination. What part of yourself do you condemn in others?",
  community: "Koinonia, ekklesia. Who in your life tells you truth you do not want to hear?",
  silence: "Contemplative practice invitations. Can you sit for five minutes without reaching for your phone?",
};

// ---------------------------------------------------------------------------
// 60 entries -- 6 per category
// ---------------------------------------------------------------------------

export const livingWords: readonly LivingWord[] = [

  // PERCEPTION (days 1-6)
  {
    id: "perception-1",
    day: 1,
    category: "perception",
    title: "The Thing You Are Most Certain About",
    prompt: "What are you most certain about right now -- about yourself, about someone else, about the way things are? Sit with that certainty for a moment. What if being that certain is the problem, not the answer? Metanoia means turning your mind around. You cannot turn around if you are convinced you are already facing the right direction.",
    grounding: "The Greek word metanoia, translated as 'repent,' literally means a transformation of perception -- a turning of the mind itself. Early Christian writers used it to describe not moral correction but a fundamental shift in how one sees. The call was not to behave differently but to perceive differently first.",
    microPractice: "Write down one thing you are completely certain about. Then write two sentences from the perspective of someone who sees it differently. You do not have to agree. Just see.",
    relatedWordId: "metanoia",
    relatedConceptSlug: "metanoia-repentance",
  },
  {
    id: "perception-2",
    day: 2,
    category: "perception",
    title: "What the Story Leaves Out",
    prompt: "You carry a story about why something happened -- a relationship that ended, a decision that went wrong, a person who hurt you. That story feels complete. It probably is not. What would you have to add to the story to make yourself less the protagonist and more a character among characters?",
    grounding: "Ancient Jewish interpretation (midrash) built an entire practice around the gaps in texts -- the parts not explained, the silences between lines. The assumption was that the gaps are not accidents; they are invitations to keep asking. A story with all the gaps filled is a story that has stopped breathing.",
    microPractice: "Take a story you tell often about yourself. Find one place where you skipped over someone else's experience. Write two sentences imagining their interior that day.",
    relatedConceptSlug: "midrash-interpretation",
  },
  {
    id: "perception-3",
    day: 3,
    category: "perception",
    title: "The Lens You Forgot You Were Wearing",
    prompt: "Every assumption you hold came from somewhere -- a parent, a church, a wound, a decade. You did not choose most of them. They came pre-installed. Today's question is not whether your assumptions are wrong. It is whether you know what they are. You cannot see the lens you are looking through.",
    grounding: "The Pauline metaphor of seeing 'through a glass darkly' (1 Corinthians 13:12) uses the Greek word ainigma -- an enigma, a riddle. The text does not promise that we will eventually see clearly in this life. It sits with the honest acknowledgment that our perception is always partial, always mediated.",
    microPractice: "Name one assumption you carry about a person in your life. Write where you learned it. Then write one piece of evidence that challenges it.",
    relatedWordId: "aionios",
  },
  {
    id: "perception-4",
    day: 4,
    category: "perception",
    title: "Seeing Before Judging",
    prompt: "How often do you judge before you see? There is a moment between perceiving something and categorizing it -- most of us skip straight to the category. That moment is where seeing actually happens. What are you categorizing right now that you have not actually looked at?",
    grounding: "Thomas saying 26 puts it sharply: 'You see the splinter in your brother's eye, but the beam in your own eye you do not see.' The Greek word translated 'see' (blepeis) appears twice in the same sentence, pointing at the irony: the act of seeing in one direction blinds you to the seeing that matters more.",
    microPractice: "The next time you feel a strong opinion rising about someone today, pause for three seconds before you let the opinion arrive. Just look at the person. Then notice what the opinion does.",
    relatedConceptSlug: "thomas-gospel-sayings",
  },
  {
    id: "perception-5",
    day: 5,
    category: "perception",
    title: "What Familiarity Hides",
    prompt: "The things you are most familiar with are the things you see least clearly. You stopped looking at them when they became familiar. What in your daily life have you stopped seeing? What has become wallpaper that used to be a painting?",
    grounding: "The concept of epiousios -- the Greek word in the Lord's Prayer usually translated as 'daily' bread -- may actually mean 'bread of the coming age,' bread that is always about to arrive, always slightly beyond. Some scholars read this as a built-in warning against taking the daily for granted. The ordinary is never only ordinary.",
    microPractice: "Pick one object in your home you pass every day without seeing. Sit with it for sixty seconds. Notice three things about it you have never noticed before.",
  },
  {
    id: "perception-6",
    day: 6,
    category: "perception",
    title: "The Cost of Being Right",
    prompt: "Being right about something can cost you more than being wrong. When you are wrong, you might change. When you are right, you have no reason to. Where has being right become more important to you than being present? What are you defending that is keeping you from moving?",
    grounding: "The Greek word dogma simply means 'what seems good' -- an opinion held. The term hardened over centuries into unquestionable doctrine. But in its origins it was provisional, debatable. The philosopher Pyrrho built an entire school (skepticism) on suspending dogma to remain open. The earliest disciples held their conclusions loosely because the teacher kept surprising them.",
    microPractice: "Find one argument you have been having -- in your head or with someone else -- where being right has been the goal. Ask: what would I be free to do if I let go of needing to win this?",
  },

  // RELEASE (days 7-12)
  {
    id: "release-1",
    day: 7,
    category: "release",
    title: "What You Are Still Carrying",
    prompt: "There is something you are still carrying that you told yourself you let go of. You know what it is. You talked about it at the time. You may have even forgiven it in words. But something in you is still gripping. What is still in your hands?",
    grounding: "The Greek aphiemi, translated as 'forgive,' primarily means to release, to let go, to send away. It is the same word used for releasing a prisoner, for canceling a debt, for letting a bird go. The text does not say 'agree with what happened' or 'feel okay about it.' It says open your hands.",
    microPractice: "Name one thing -- a grudge, a regret, a loss -- you thought you had released. Hold both hands out in front of you, palms up, empty. Sit with that physical posture for two minutes. Notice what comes up.",
    relatedWordId: "aphiemi",
    relatedPracticeSlug: "breath-prayer",
  },
  {
    id: "release-2",
    day: 8,
    category: "release",
    title: "The Identity You Outgrew",
    prompt: "Who were you ten years ago? That version of you had beliefs, roles, certainties. Some of those grew with you. Some did not. But you might still be performing an identity that no longer fits -- because it is familiar, because people expect it, because you are not sure who you are without it. What identity are you wearing that stopped fitting?",
    grounding: "Paul's phrase 'the old self' (palaion anthropon, 'old human being') in Ephesians and Colossians describes not moral failure but an outdated mode of being. The call to 'put off' the old self uses the language of removing clothing -- not destroying the body beneath, but changing what covers it. The self is not bad. It is just wearing the wrong thing.",
    microPractice: "Write down three words that described who you were five years ago. Circle the one you are most attached to. Ask whether you still want to be primarily that.",
  },
  {
    id: "release-3",
    day: 9,
    category: "release",
    title: "What You Are Controlling",
    prompt: "Control is how we manage fear. When something feels uncertain or threatening, we reach for control -- of the outcome, of the other person, of the narrative. What are you trying to control right now? And what does that need for control tell you about what you are afraid of?",
    grounding: "The Stoic concept of the dichotomy of control (prohairesis) was widely circulated in the first century Mediterranean world that shaped early Christianity. Epictetus, a freed slave, built an entire philosophy on this distinction: what is in our power and what is not. The Sermon on the Mount revisits the same distinction: you cannot add a single hour to your life by worrying.",
    microPractice: "Make two columns. In one, write everything about your current situation you can control. In the other, everything you cannot. Then look at which column you have been spending your energy on.",
  },
  {
    id: "release-4",
    day: 10,
    category: "release",
    title: "The Debt You Keep Collecting",
    prompt: "Some people owe you something. Maybe they never paid it back -- an apology, acknowledgment, love, time. You have been waiting. Collecting evidence. Interest has been accruing. What debt are you holding that the other person does not know is still due? And what would happen to you if you wrote it off?",
    grounding: "The Lord's Prayer contains the word opheilema -- debt, that which is owed. The parable of the unforgiving servant (Matthew 18) builds on this: a massive debt is cancelled, then the freed man refuses to cancel a small one. The Greek word for the cancelled debt is the same root as aphiemi -- to release. The story suggests that holding others' debts costs the holder more than the debtor.",
    microPractice: "Write down the name of someone you feel owes you something. Write what they owe you. Then write what it has cost you to keep that ledger open.",
    relatedWordId: "aphiemi",
  },
  {
    id: "release-5",
    day: 11,
    category: "release",
    title: "Grief You Have Not Named",
    prompt: "Grief is not only for death. You grieve when a relationship changes, when a version of yourself ends, when a hope you held quietly for years quietly gives up. Most of us do not name these losses because they feel too small to count. They are not small. They are just unclaimed. What are you grieving that you have not given a name?",
    grounding: "The Hebrew concept of lament is not grief plus resolution -- it is grief as a complete act in itself. The Psalms of lament (about one-third of all Psalms) often end without resolution. They bring the wound to the surface and stay there. The Septuagint translates this lament posture with the Greek pentheo -- mourning that is visible, embodied, not hidden.",
    microPractice: "Complete this sentence without softening it: 'I am grieving ___.' Say it out loud, alone, where no one will hear. Then sit with it for one minute before moving on.",
  },
  {
    id: "release-6",
    day: 12,
    category: "release",
    title: "The Expectation You Carry Secretly",
    prompt: "You have expectations of people close to you that you have never said out loud. They cannot meet expectations they do not know about. And you have been quietly scoring them against a standard you invented. Which unspoken expectation is costing you a relationship right now?",
    grounding: "The Greek word for peace, eirene (shalom in Hebrew), means not merely absence of conflict but a right ordering of relationship -- things resting in their proper place. Unspoken expectations are a form of disorder; they make right ordering impossible because only one side knows the terms. The prophets consistently named hidden grievances as the root of communal fracture.",
    microPractice: "Pick one person you have an unspoken expectation of. Write down what you expect. Then ask: have I ever actually said this to them? If not, decide today whether to say it or release it.",
  },

  // PRESENCE (days 13-18)
  {
    id: "presence-1",
    day: 13,
    category: "presence",
    title: "Where You Actually Are",
    prompt: "Right now, physically: where are you? Not metaphorically. What is the light doing? What do you hear? What is the quality of the air? Most of us spend the majority of our time somewhere other than where we are. We are in yesterday or tomorrow, in the conversation we replayed or the one we are dreading. Today's question: what is actually happening right now?",
    grounding: "The Greek word pneuma -- usually translated 'spirit' -- also means breath, wind, the animating air. The earliest creation narrative (Genesis 2:7) uses the equivalent Hebrew ruach: God breathed into the clay and it became a living being. Breath is the most present thing about you. You cannot breathe yesterday's air. The contemplative traditions built entire prayer systems on this fact.",
    microPractice: "Take ten slow breaths. For each one, notice one sensation in your body. Do not analyze. Just notice. When a thought arrives, note it and return to breath.",
    relatedWordId: "pneuma",
    relatedPracticeSlug: "breath-prayer",
  },
  {
    id: "presence-2",
    day: 14,
    category: "presence",
    title: "The Performance You Are Running",
    prompt: "There is a version of yourself you perform when you think someone important is watching. You know the performance -- you have been doing it for years. Today, are you performing your life or living it? And is there anyone left you do not perform for?",
    grounding: "The Greek word hypokrites -- translated in the Gospels as 'hypocrite' -- was the everyday word for an actor, someone wearing a mask. The critique in Matthew 6 is not of people doing bad things in public; it is of people doing good things in public for the sake of being seen. The call is to act without the stage. This requires someone home behind the mask.",
    microPractice: "For the next hour, notice every moment you are curating how you appear -- to yourself, to others, online. Do not stop doing it. Just name it each time: 'I am performing.' Notice what the noticing does.",
  },
  {
    id: "presence-3",
    day: 15,
    category: "presence",
    title: "When You Last Stopped",
    prompt: "When did you last stop completely? Not pause. Not switch tasks. Not scroll instead of work. Stop. When did you last sit somewhere with no input, no agenda, no goal, and let yourself be unproductive without guilt? If you cannot remember, that is the answer.",
    grounding: "The Sabbath concept (shabbat in Hebrew) is not a rule about what not to do. The word means cessation -- an act of stopping as an end in itself. The text says even God rested. The point is not recovery for the next round of work. The point is that stopping is itself sacred. Presence is not a byproduct of absence. It is what absence makes room for.",
    microPractice: "Set a timer for fifteen minutes. Go somewhere without your phone. Sit. If thoughts come, let them. The only rule: no tasks. At the end, write one sentence about what you noticed.",
    relatedPracticeSlug: "the-examen",
  },
  {
    id: "presence-4",
    day: 16,
    category: "presence",
    title: "The Conversation You Were Not In",
    prompt: "Think of the last conversation you had. Were you actually there, or were you half-somewhere else -- preparing your next point, monitoring how you were coming across, managing the image you project? Full presence in conversation is rarer than we admit. When did someone last have your full attention, and what made that possible?",
    grounding: "The Greek word parousia -- often translated as 'coming' or 'arrival' in apocalyptic texts -- also simply means presence, being alongside. Its root is para (alongside) + ousia (being). To be parousia is to be fully arrived, not hovering at the threshold. The early Church used this word to describe the promised return of Christ because full, unmediated presence is what was longed for.",
    microPractice: "In your next conversation today, put your phone face-down and out of reach. Notice when the urge to reach for it arrives. Stay with the person in front of you. After: what was different?",
  },
  {
    id: "presence-5",
    day: 17,
    category: "presence",
    title: "Anticipation as Absence",
    prompt: "You have been looking forward to something. Planning, imagining, rehearsing how good it will feel. Sometimes anticipation is its own pleasure. But sometimes anticipation is the mind's way of not being here. When the thing arrives, you will already be anticipating what comes after. What are you missing right now because you are somewhere ahead of yourself?",
    grounding: "The desert fathers warned against a spiritual failure they called prolepsis -- the habit of mentally experiencing the future before it arrives. They noticed it drained people of presence and made them perpetually dissatisfied: the anticipated thing never matched the imagined thing. They prescribed a practice of confining the mind to what is immediate -- not as punishment but as return.",
    microPractice: "Name one thing you are anticipating. Then name one thing that is happening right now -- today, in this hour -- that is worth your attention. Let that second thing have five minutes of your focus before the anticipating resumes.",
  },
  {
    id: "presence-6",
    day: 18,
    category: "presence",
    title: "Who You Are When No One Is Watching",
    prompt: "Take away the audience. Take away the people who know your name, your story, your reputation. Who are you then? Not who you should be -- who you are. If you were anonymous for a day, what would you do differently? And what does that tell you about what you are actually like?",
    grounding: "The apophatic tradition -- the theology of what cannot be said -- insists that the divine cannot be known through description but only through encounter beyond description. Applied to self-knowledge, the same principle suggests: the real self is not the performed self. It is what remains when all the roles are removed. Bernard of Clairvaux called this the 'image of God' -- the unconditioned depth beneath the conditioned surface.",
    microPractice: "Spend thirty minutes doing something today for no audience, no record, no social proof. Make it something you enjoy. Tell no one. Notice how that feels.",
  },

  // CORRECTION (days 19-24)
  {
    id: "correction-1",
    day: 19,
    category: "correction",
    title: "Where You Have Been Missing the Mark",
    prompt: "Hamartia is usually translated as 'sin' but it means missing the mark -- aiming at something and landing somewhere else. The problem is not that you are bad. The problem is that your aim is off. What have you been aiming at -- in your work, your relationships, your inner life -- that, if you are honest, you know is not the real target?",
    grounding: "The word hamartia comes from archery: a shot that misses its intended target. In the Greek moral tradition before Christianity adopted the word, it described not a moral violation but a misjudgment -- aiming at a good thing and hitting the wrong place. Aristotle used it in tragedy to describe the fatal flaw that sends a good person toward destruction: not evil intent, but wrong aim.",
    microPractice: "Write down one thing you have been working toward. Then write what you actually want -- the deeper thing underneath it. If they match, good. If they do not, sit with that gap.",
    relatedWordId: "hamartia",
    relatedConceptSlug: "hamartia-sin",
  },
  {
    id: "correction-2",
    day: 20,
    category: "correction",
    title: "The Translation You Inherited",
    prompt: "Someone handed you a version of what it means to be good, to be spiritual, to be faithful. You probably accepted it without knowing you were accepting anything. That inherited translation shapes everything -- what you feel guilty about, what you pursue, what you fear. Where has someone else's translation of goodness been running your life?",
    grounding: "The Septuagint -- the Greek translation of the Hebrew scriptures made in Alexandria around the third century BCE -- made translation choices that altered theology for centuries. Words like 'almah' (young woman) became 'parthenos' (virgin). Every translation is an interpretation. The version you received was also a translation by people with agendas you did not choose.",
    microPractice: "Name one moral rule you live by that you have never examined. Write where you learned it and who taught it to you. Then ask: do you actually believe this, or did you absorb it?",
  },
  {
    id: "correction-3",
    day: 21,
    category: "correction",
    title: "What Teleios Actually Demands",
    prompt: "You were told to 'be perfect.' The Greek word is teleios, which means complete, whole, fully realized -- not flawless. Perfectionism is often a disease masquerading as a virtue. Where are you pursuing flawlessness when what is actually asked of you is wholeness? And what would wholeness look like, including the broken parts?",
    grounding: "Teleios appears in Matthew 5:48 ('Be perfect, as your heavenly Father is perfect') and in James 1:4 ('patience that has its complete work'). In both cases the word carries Aristotelian resonance: something is teleios when it has reached its intended end, when all its parts function as they should. A scar is teleios. A healed fracture is teleios. Perfection in this sense includes what has been broken and held.",
    microPractice: "Name one part of yourself you have been trying to eliminate or hide because it is imperfect. Write one sentence about how that part has served you or taught you something.",
    relatedWordId: "teleios",
  },
  {
    id: "correction-4",
    day: 22,
    category: "correction",
    title: "The Aionios You Mistook",
    prompt: "You are living as if some things are permanent and some things are temporary. Are you sure you have those in the right categories? What feels permanent may be a season. What feels temporary may be the thing that lasts. Where have you organized your life around a permanence that does not exist?",
    grounding: "The Greek word aionios, translated as 'eternal' or 'everlasting,' comes from the root aion -- an age, an era, a period of indeterminate length. Many scholars argue it means 'of the age' or 'age-long' rather than 'without end.' If aionios life begins now (John 17:3 -- 'this is eternal life, that they know you'), then eternity is not a destination. It is a quality of presence available in the present age.",
    microPractice: "Write two lists: what you act as if is permanent, and what you act as if is temporary. Are any items in the wrong column?",
    relatedWordId: "aionios",
  },
  {
    id: "correction-5",
    day: 23,
    category: "correction",
    title: "The Gehenna You Invented",
    prompt: "What do you use to threaten yourself into compliance? Many people carry an interior Gehenna -- a place of punishment they visit in imagination to motivate themselves through fear. What do you tell yourself will happen if you fail, disappoint, fall short? And where did that threat come from?",
    grounding: "Gehenna in the Gospels refers to the Valley of Hinnom outside Jerusalem, a literal place -- a garbage dump where the city's refuse burned. Jesus used it as a metaphor for what it means to live outside the city of God, not a cosmological furnace of post-mortem punishment. The fires were real. The distance from the city was real. The question it posed was about now: what kind of life are you living?",
    microPractice: "Notice once today when you motivate yourself through threat of punishment -- imagined consequences, self-criticism, catastrophizing. Write down the specific threat. Then ask: is this a real thing or a borrowed fear?",
    relatedWordId: "gehenna",
    relatedConceptSlug: "gehenna-hell",
  },
  {
    id: "correction-6",
    day: 24,
    category: "correction",
    title: "What You Call Love",
    prompt: "The word you use for love is probably carrying more freight than it can hold. You call the same feeling 'love' when you mean something you want for yourself, when you mean something you do for another, when you mean a loyalty that has cost you, when you mean a feeling that passes. Which of these are you actually talking about right now? What are you calling love that is something else?",
    grounding: "Greek distinguishes at minimum four kinds of love: eros (desire), storge (familial affection), philia (deep friendship), and agape (unconditional regard). The New Testament writers chose agape when they wanted to describe the love that does not depend on the beloved's performance or appeal. Paul in 1 Corinthians 13 defines it almost entirely by what it is not: not envious, not boastful, not self-seeking. What remains when you remove all of those is the thing.",
    microPractice: "Choose one person you say you love. Write what that love actually consists of in practice today -- not what you feel, but what you do. Is that the thing you want it to be?",
    relatedConceptSlug: "agape-love",
  },

  // ENCOUNTER (days 25-30)
  {
    id: "encounter-1",
    day: 25,
    category: "encounter",
    title: "Where the Sacred Wore No Label",
    prompt: "When did you last encounter something you could only call sacred -- not in a religious context, not under a recognizable label? A piece of music. A face. A moment of stillness that felt inhabited. The divine does not limit itself to the places we mark as holy. Where did something find you that you almost dismissed because it came in the wrong container?",
    grounding: "Thomas saying 77 records Jesus saying: 'I am the light that is above all things. I am all. From me all came forth, and to me all attained. Split a piece of wood: I am there. Lift up the stone, and you will find me there.' This is a thoroughgoing theology of divine immanence -- the sacred is not sectioned off. It saturates ordinary matter and ordinary moments.",
    microPractice: "Today, once, stop and ask: is there something sacred happening here that I am walking past? It can be anything -- an interaction, a sight, a sound. You do not have to name what it is. Just pause long enough to register it.",
    relatedConceptSlug: "thomas-gospel-sayings",
  },
  {
    id: "encounter-2",
    day: 26,
    category: "encounter",
    title: "The Stranger You Did Not Meet",
    prompt: "How many strangers did you interact with today without really interacting? The person behind the counter. The voice on the phone. The face in traffic. Every one of them is a whole world -- a complete life with losses and longings you cannot see. When did you last actually encounter a stranger rather than process them?",
    grounding: "The Greek word xenos means stranger, foreigner, guest -- and in Matthew 25, it is the stranger (xenos) who is identified with Christ. The command to offer hospitality (philoxenia -- literally 'love of the stranger') was not metaphorical charity. It was a claim about who the sacred travels in disguise as. The text is uncomfortably specific: the stranger is the encounter.",
    microPractice: "In one interaction with a stranger today, ask them one real question -- not a transaction question, a human one. Notice what opens up when someone realizes they are being seen.",
  },
  {
    id: "encounter-3",
    day: 27,
    category: "encounter",
    title: "The Beauty You Let Yourself Feel",
    prompt: "When did you last let beauty stop you? Not appreciate it aesthetically from a safe distance -- let it stop you, land on you, do something to you. Beauty has always been understood as a mode of encounter in the mystical traditions. But most of us have learned to consume beauty rather than receive it. What are you passing by quickly that deserves your stopped presence?",
    grounding: "The Greek word kalos appears throughout the Gospels and is usually translated 'good' but often means beautiful -- the two were not clearly distinguished. The early church father Gregory of Nyssa wrote that the soul is drawn toward God the way a creature is drawn toward beauty -- not by argument but by desire. He called this epektasis: an endless, joyful reaching toward what is inexhaustibly beautiful.",
    microPractice: "Find one beautiful thing today and stop with it for two full minutes. No phone. No description. Just let it work on you. After: write one sentence about what it did.",
  },
  {
    id: "encounter-4",
    day: 28,
    category: "encounter",
    title: "What the Crisis Was Trying to Tell You",
    prompt: "Something has broken in your life at some point -- a relationship, a belief, a plan. In the middle of breaking, it felt only like loss. Looking back: what did it reveal that nothing else could have? Where did a destruction clear ground for something that needed room?",
    grounding: "The Greek word krisis, from which we get 'crisis,' means judgment, decision, the moment of turning. It was used in medicine for the decisive turning point in an illness -- the night the fever breaks, for better or worse. A crisis in this sense is not disaster. It is the moment of decision that was already coming and needed a precipitating event to arrive.",
    microPractice: "Name one crisis in your past you have only understood as loss. Write one sentence about what it made possible that could not have happened without it. Not to minimize the loss. To see the whole of it.",
  },
  {
    id: "encounter-5",
    day: 29,
    category: "encounter",
    title: "The Dream You Dismissed",
    prompt: "Ancient cultures treated dreams as sites of encounter -- not psychological noise but communication from something larger than the waking self. You have had dreams that lingered in the morning, carrying a feeling you could not explain. You probably dismissed them. What has your sleeping self been trying to bring to your attention?",
    grounding: "The Hebrew Bible is saturated with divine encounter through dreams (Joseph, Jacob, Solomon, Daniel). The Greek world's tradition of incubation -- sleeping in temples to receive divine revelation -- reflects the same conviction. Dreams were treated not as private mental events but as threshold experiences, places where the ordinary permeability between self and world becomes briefly legible.",
    microPractice: "Before you sleep tonight, set a notepad by the bed. In the morning, before checking your phone, write whatever you remember -- even fragments, feelings, colors. Look at it without analysis. What is there?",
  },
  {
    id: "encounter-6",
    day: 30,
    category: "encounter",
    title: "When Someone Saw You Accurately",
    prompt: "Most of the time, people see a version of you -- not wrong exactly, but incomplete. Can you remember a time when someone saw you accurately -- saw something true about you that you had not fully seen yourself? What did that feel like? And who in your life might be waiting for you to offer them the same thing?",
    grounding: "The Gospel of John's account of Jesus and the Samaritan woman at the well (John 4) turns on a moment of accurate seeing: 'He told me everything I ever did.' The woman is not praised for virtue or condemned for failure. She is seen. The Greek word for 'see' in these narratives (theaomai) carries the sense of careful, attentive beholding -- not a glance but a sustained gaze.",
    microPractice: "Think of someone you know well. Write one true thing about them that you have noticed but never said -- something that would help them, not flatter them. Consider whether to say it.",
    relatedDossierId: "john-4-samaritan-woman",
  },

  // JUSTICE (days 31-36)
  {
    id: "justice-1",
    day: 31,
    category: "justice",
    title: "Whose Voice You Are Not Hearing",
    prompt: "In the conversations you are part of -- at work, in your family, in your community -- whose voice is consistently missing? Not because they have nothing to say but because the structure of the conversation makes it hard or impossible for them to say it. What conversations are you in that need a different voice you are not inviting?",
    grounding: "The Greek word dikaiosyne, translated as 'righteousness' in most Bibles, is better translated as 'justice' -- it is the root of our word 'justice.' Martin Luther King Jr. famously pointed to this in his reading of the prophets: the call was not to personal virtue but to right relationship and just structures. A righteous person in this sense is not merely well-behaved; they are a person who makes things right.",
    microPractice: "Identify one conversation or decision you are part of this week. Write down who is not in the room who should be. Then take one concrete step toward including them -- even a small one.",
    relatedWordId: "dikaiosyne",
    relatedConceptSlug: "dikaiosyne-justice",
  },
  {
    id: "justice-2",
    day: 32,
    category: "justice",
    title: "The Comfort You Protect",
    prompt: "You have comfortable arrangements in your life. Some of those arrangements are comfortable partly because they cost someone else something. This is not a call to guilt -- guilt is usually useless. It is a call to honesty. What comfortable arrangements in your life depend on inequalities you benefit from? What would you have to give up to change them?",
    grounding: "The Hebrew prophets -- Amos, Micah, Isaiah -- were economic critics as much as religious ones. Amos 5:24 ('Let justice roll down like waters') comes in the context of condemning wealthy landowners who built comfort on the displacement of the poor. The Greek Septuagint translates the Hebrew mishpat (justice) as krisis -- the decisive judgment that things cannot remain as they are.",
    microPractice: "Name one comfort in your life you have never examined for its full cost. Write two sentences about who else is in the economics of that comfort. You do not have to act today -- first, see.",
  },
  {
    id: "justice-3",
    day: 33,
    category: "justice",
    title: "The Story You Tell About the System",
    prompt: "You have a story about how systems work -- why some people struggle and others flourish, why some communities have what they need and others do not. That story shapes what you see and what you ignore. Is your story about the system a true account or a story that protects your position in it?",
    grounding: "Luke 4:18-19 quotes the Isaiah scroll that Jesus reads in Nazareth: 'good news to the poor, release to the captives, sight to the blind, freedom for the oppressed.' The Greek word for 'release' (aphesis) is the same root as aphiemi -- releasing what holds captive. This was not individual spiritual metaphor. First-century listeners would have heard concrete economic and social realities.",
    microPractice: "Find one article or account written by someone directly affected by a system that affects you differently. Read it without defending yourself. Write one thing it changes or challenges in your thinking.",
  },
  {
    id: "justice-4",
    day: 34,
    category: "justice",
    title: "What You Stay Quiet About",
    prompt: "There is something you know is wrong that you stay quiet about. Maybe it happens at work. Maybe in your community. Maybe in your family. You have reasons for the quiet -- it is complicated, it is risky, it is not your place. Those may be true. But so is the thing you are staying quiet about. What costs your silence?",
    grounding: "The prophetic tradition in Hebrew scripture is built on the concept of speaking without permission -- saying the thing the institution does not want said. The Greek word for prophet, prophetes, means 'one who speaks before' or 'speaks on behalf of' -- not primarily a predictor but a spokesperson who speaks truth to power. The cost was usually high. The silence they refused is documented precisely because it was refused.",
    microPractice: "Name one thing you know is wrong that you have not spoken about. Write why you are quiet. Then write what your silence is costing -- yourself, others, the situation.",
  },
  {
    id: "justice-5",
    day: 35,
    category: "justice",
    title: "How You Treat the Person With Less Power",
    prompt: "How do you treat people who have less power than you? In a restaurant, in an office, in a transaction where you are the customer. Most of us are kind to people who can help us. Fewer are consistently kind to people who cannot. Who is in that category in your daily life, and how are you actually treating them?",
    grounding: "Matthew 25:40 places the judgment of human character not on doctrinal belief or ritual observance but on the treatment of those at the margins: 'as you did it to one of the least of these my brothers and sisters, you did it to me.' The Greek word elachistos -- 'least' -- is the superlative of small. The smallest, the most easily ignored. The text implies a direct connection between how you treat the invisible and who you are.",
    microPractice: "In one interaction today with someone in a service role, use their name (if they have a tag), make eye contact, and ask one real question. Then notice whether you feel the impulse to document it or share it. That impulse is information.",
  },
  {
    id: "justice-6",
    day: 36,
    category: "justice",
    title: "The Neighbor You Have Not Seen",
    prompt: "The parable of the Good Samaritan does not end with a command to be generous. It ends with a command to see: 'Who was the neighbor?' The lawyer already knew what goodness required. He needed to see who was on the road. Who is on your road that you have trained yourself not to see? What would seeing them require of you?",
    grounding: "The parable in Luke 10 features a Samaritan -- an outsider, ethnically suspect, religiously wrong according to the Jewish audience -- as the model of dikaiosyne. The Greek word for 'neighbor' (plesion) simply means 'the one nearby.' The parable's challenge is not 'be generous to the deserving' but 'extend the category of nearby.' The neighbor is whoever is in front of you.",
    microPractice: "Today, on your ordinary route, notice one person you would usually pass without seeing. Do not necessarily do anything. Just see them -- hold the awareness that they are a complete person. Write one sentence about what that does.",
    relatedConceptSlug: "parable-good-samaritan",
  },

  // BODY (days 37-42)
  {
    id: "body-1",
    day: 37,
    category: "body",
    title: "What Your Body Is Saying",
    prompt: "Your body is speaking right now. Not metaphorically. There is tension somewhere, a holding, a tiredness or a restlessness that has a location. Most of us spend the day in our heads, visiting our body only when it becomes impossible to ignore. Where is something in your body right now, and what would it say if it could use words?",
    grounding: "The Greek word sarx, usually translated as 'flesh' in ways that imply corruption or carnality, simply means the body, the physical form. Paul's complicated use of the word refers to a way of living (kata sarka, 'according to the flesh') not to the body itself as sinful. The created body in Hebrew theology (basar) was entirely good. The problem was not having a body. The problem was living as if you had nothing else.",
    microPractice: "Sit quietly. Scan your body from feet to head. When you find a place of tension, put your hand there. Breathe into it for thirty seconds. Do not analyze it -- just breathe into it. Notice if anything shifts.",
    relatedWordId: "sarx",
    relatedConceptSlug: "sarx-flesh",
  },
  {
    id: "body-2",
    day: 38,
    category: "body",
    title: "When You Last Used Your Hands",
    prompt: "Screens are abstract. They demand eye and mind and almost nothing else. When did you last make something with your hands? Cook, build, draw, garden, knead, shape, repair. The body learns things the mind cannot. There is knowledge that lives only in the hands. What have you been neglecting to know?",
    grounding: "The Incarnation (from the Latin incarno -- to enter flesh) is the central claim of Christianity: the divine chose to be embodied. Not symbolically embodied. Physically embodied -- with hunger, thirst, fatigue, the feel of wood under a carpenter's hands. The theological weight of this choice is enormous: the body is not the problem to be escaped. It is the location of the sacred.",
    microPractice: "Today, do one thing with your hands that has a physical result -- make food, fix something broken, draw something even badly. Pay attention to the sensation of making. Spend at least twenty minutes.",
  },
  {
    id: "body-3",
    day: 39,
    category: "body",
    title: "The Sleep You Are Not Getting",
    prompt: "Sleep is where the body repairs, the mind integrates, the self reconstitutes. You probably know you are not getting enough. You probably have good reasons. But consider: what is not sleeping telling you about how you are running your life? And what are you avoiding by staying awake?",
    grounding: "The Hebrew Bible treats sleep (shenah) as a gift from God (Psalm 127:2 -- 'he gives sleep to his beloved'). The disciples fall asleep in Gethsemane, and Jesus says the spirit is willing but the flesh is weak -- not as condemnation but as observation. The body has limits. Respecting those limits was considered a form of trust, not failure. Rest was built into the creation rhythm from the beginning.",
    microPractice: "Tonight, set an alarm for thirty minutes before you want to be asleep. When it goes off, close all screens. Notice what happens in those thirty minutes. Notice what you were reaching for instead of rest.",
  },
  {
    id: "body-4",
    day: 40,
    category: "body",
    title: "Where You Carry Your Fear",
    prompt: "Fear lives in the body before it arrives in the mind. The tightened chest, the shoulders up around the ears, the held breath. Where does fear live in your body? And what are you afraid of right now that your body knows and your mind is still managing?",
    grounding: "The Greek word phobos, usually translated 'fear,' is used in two distinct ways in the Gospels: the fear-as-terror that drives out love, and the fear-as-awe that is the right response to the sacred. The frequent command 'do not be afraid' (me phobeisthe) in scripture is not an instruction to suppress emotion. It is a recognition that fear is the primary obstacle to presence -- and an invitation to move through it rather than around it.",
    microPractice: "Notice where in your body fear or anxiety lives right now. Name the location. Then breathe directly into that location for five breaths. After: write one sentence about what the fear is actually about.",
  },
  {
    id: "body-5",
    day: 41,
    category: "body",
    title: "What You Have Not Let Yourself Feel",
    prompt: "The body stores what the mind refuses. Emotions that were never fully felt tend to live somewhere in the tissues -- held in the shoulders, the gut, the jaw. What have you not let yourself feel lately? Not processed, not analyzed, not talked about -- felt. What is waiting in your body for permission to move through?",
    grounding: "The Psalms are the most emotionally complete body of ancient writing we have -- raw anger, desperate grief, soaring exaltation, bitter complaint, wild joy. The Hebrew language of emotion is almost always bodily: bowels that churn (racham, the root of the word for compassion), a heart that is stricken, bones that waste away. Feeling was understood as something that happened in the body, not the mind.",
    microPractice: "Set a timer for ten minutes. Write without stopping about what you are feeling, without explaining or justifying it. Not what you think about what you feel. What you feel. Then breathe. Then close the journal.",
    relatedPracticeSlug: "lectio-divina",
  },
  {
    id: "body-6",
    day: 42,
    category: "body",
    title: "How You Feed Yourself",
    prompt: "How do you feed yourself? Not nutritionally (though that matters) but in the sense of what you take in -- what you consume, read, watch, listen to, spend time with. Your interior life is fed or depleted by what you take in. What are you feeding yourself that is not feeding you? What are you starved for?",
    grounding: "The wilderness temptation narrative (Matthew 4, Luke 4) opens with Jesus hungry after forty days. The tempter says: turn stones to bread. The response (from Deuteronomy 8:3) is that humans do not live by bread alone but by every word that proceeds from the mouth of God. The point is not asceticism -- the bread is not bad. The point is that something larger than physical hunger is at stake. What are you hungry for?",
    microPractice: "Track what you consume today -- not food but content: media, conversations, reading, music. Tonight, write two columns: what fed you, what depleted you. Look at the ratio.",
  },

  // SHADOW (days 43-48)
  {
    id: "shadow-1",
    day: 43,
    category: "shadow",
    title: "What You Cannot Stand in Others",
    prompt: "The things that most reliably infuriate or disgust you about other people tend to be things that live in you, unacknowledged. Not because you do the same things they do, but because you carry the same material in a different form. What is the quality you most cannot stand? And where does it live in you, quietly?",
    grounding: "The psychological concept of projection -- attributing to others what we cannot accept in ourselves -- has deep roots in ancient wisdom literature. Thomas 26 records: 'You see the splinter in your brother's eye but the beam in your own you do not see.' The Greek word for beam (dokos) is architectural -- a structural beam. The projection is not a small thing hiding in you. It is weight-bearing.",
    microPractice: "Name the quality you find most intolerable in another person. Write a paragraph about where that quality might live in you -- in a different form, more hidden. You do not have to agree. Just look.",
  },
  {
    id: "shadow-2",
    day: 44,
    category: "shadow",
    title: "The Virtue That Became a Weapon",
    prompt: "Every strength, pushed far enough, becomes a liability. The organized person becomes controlling. The empathetic person becomes a martyr. The honest person becomes cruel. Which of your strengths has become something else -- something you use on others more than for them? What virtue has curdled into something that serves you at others' expense?",
    grounding: "Aristotle's doctrine of the mean holds that virtue is the midpoint between two extremes -- courage between cowardice and recklessness, generosity between miserliness and profligacy. The virtue does not exist without its shadow at both ends. Paul in 1 Corinthians 13 describes love as what remains when the gifts are exercised rightly -- suggesting that gifts exercised wrongly are not neutral but harmful.",
    microPractice: "Name your strongest virtue. Write how it looks when it serves others well. Then write how it looks when it is actually self-serving or harmful. Be honest about when the second version appears.",
  },
  {
    id: "shadow-3",
    day: 45,
    category: "shadow",
    title: "The Story You Tell to Protect Yourself",
    prompt: "You have a story that explains your life -- why things went the way they did, why you are who you are, why others behaved as they did. That story is not a lie. But it is a construction, and constructions serve a purpose. What does your life story protect you from seeing? What does it make impossible to be responsible for?",
    grounding: "The prophetic texts regularly distinguish between the story Israel tells about itself (a righteous nation wrongly persecuted) and the story the prophets insist is true (a nation that has violated justice and is experiencing consequences). Jeremiah's term for the protective narrative is sheker -- falsehood, not in the sense of conscious lying but of cherished self-deception. The lie is told to oneself first.",
    microPractice: "Write two paragraphs about a difficult period in your life -- one from your usual perspective and one from the perspective of how you contributed to what happened. The second paragraph does not erase the first. But what does it add?",
  },
  {
    id: "shadow-4",
    day: 46,
    category: "shadow",
    title: "What You Are Ashamed Of",
    prompt: "Shame is different from guilt. Guilt says 'I did something bad.' Shame says 'I am bad.' Most people carry shame they have never shown anyone -- something they did, something done to them, something they are, something they want. Shame grows in the dark. What are you carrying in the dark that is heavier than it needs to be?",
    grounding: "The Hebrew word bushah (shame) and the Greek aischyne describe not just an emotion but a social condition -- being seen in a diminished state. The nakedness of Adam and Eve in Genesis is the first experience of shame -- the self-consciousness of being seen as less than one is. The divine response in the text is not punishment but clothing -- covering what had become exposed. Shame names the wound. It is not the wound's last word.",
    microPractice: "Write one sentence, in private, about something you are ashamed of. Do not qualify it. Just say it plainly. Then read it back. Notice whether the sentence matches the weight you have been giving the thing it describes.",
  },
  {
    id: "shadow-5",
    day: 47,
    category: "shadow",
    title: "The Praise You Chase",
    prompt: "What kind of acknowledgment do you need most from other people? Admiration, respect, love, gratitude, reassurance? Nothing is wrong with needing any of these -- they are human needs. But when the need drives you, it distorts your choices and costs your integrity. Where is the need for a specific kind of praise running you in ways you have not fully examined?",
    grounding: "The Gospel critique of the Pharisees in Matthew 6 is not primarily about hypocrisy in the colloquial sense. It is about the human need for recognition -- giving alms, praying, and fasting 'before others to be seen by them.' The Greek word used is theathenai: to be put on display. The problem is not the good act. It is that the act has been hijacked by the need for an audience.",
    microPractice: "For one day, do one good thing in a way that no one will know about. Tell no one. Notice what it costs you not to be credited. That cost is the size of the need.",
  },
  {
    id: "shadow-6",
    day: 48,
    category: "shadow",
    title: "The Anger You Have Not Named",
    prompt: "Anger is information. It tells you that something was violated -- a boundary, a value, an expectation of fairness. Most of us were taught that anger is a problem, so we store it as depression or resentment or sarcasm or silence. What are you angry about right now that you have been calling something else?",
    grounding: "The Psalms of lament are often frankly furious. Psalm 88 ends without resolution, in darkness. Lamentations 3 is raw and sustained grief-anger. The Greek word thymos (deep anger, passion) was considered by Aristotle to be morally neutral -- it could be righteous or destructive depending on its object and proportion. The New Testament distinguishes between anger that serves justice and anger that destroys relationship. Both are anger.",
    microPractice: "Complete this sentence honestly: 'I am angry about ___.' Write three completions, from the trivial to the substantial. Then look at the most substantial one. What does it tell you about what matters to you?",
  },

  // COMMUNITY (days 49-54)
  {
    id: "community-1",
    day: 49,
    category: "community",
    title: "Who Tells You the Truth",
    prompt: "Do you have anyone in your life who tells you things you do not want to hear? Not to be cruel -- to be honest, because they care about you more than they care about your approval. If you cannot think of anyone, the question is not whether such people exist. It is whether you have made it safe for them to be that person with you.",
    grounding: "The Greek word parresia means 'bold speech,' the freedom to say what is actually true -- especially to those in power. It was used in both political and spiritual contexts. Paul in Galatians 2 describes confronting Peter to his face about his hypocrisy. Parresia was a gift given between friends who trusted each other enough to risk the relationship for the truth. Few relationships sustain it. It requires safety to flourish.",
    microPractice: "Think of the person in your life most likely to tell you something difficult. When did they last do that? If it has been a long time, ask yourself what you have been doing to prevent it. Then consider reaching out.",
    relatedConceptSlug: "koinonia-community",
  },
  {
    id: "community-2",
    day: 50,
    category: "community",
    title: "The Loneliness You Are Not Naming",
    prompt: "Loneliness in our time is epidemic, and it is largely hidden. We have more connections than any generation in history and more people feel profoundly alone. What kind of loneliness are you carrying? Not absence of people -- absence of what kind of connection? And who knows that this is what you are missing?",
    grounding: "The Greek word koinonia, usually translated as 'fellowship' or 'communion,' means something more radical: shared participation, a holding of things in common, a mutual implication in each other's lives. Acts 2:42 describes the early church practicing koinonia alongside teaching and prayer -- not as one item among equals but as the social fabric that made the rest possible. Most modern 'community' is proximity without koinonia.",
    microPractice: "Send one message today to someone you have been meaning to contact but have not -- not a quick reaction to their content, but a real message that names something true. 'I was thinking about you' does not count. Say what you were thinking.",
    relatedConceptSlug: "koinonia-community",
  },
  {
    id: "community-3",
    day: 51,
    category: "community",
    title: "What You Owe Your Ancestors",
    prompt: "You received a life shaped by people you never met -- their choices, their sacrifices, their failures, their faith. Some of what you received was gift. Some was wound. You are both. What do you owe the people whose choices made your life possible? And what do you owe the future people whose lives your choices will shape?",
    grounding: "The Hebrew concept of zikaron (remembrance, memory) is not merely historical recall. To remember is to make present -- to bring the past into the living present in a way that creates obligation. The Passover Haggadah says 'in every generation, each person is obligated to see themselves as if they personally left Egypt.' Memory creates solidarity across time. You are not the beginning of your story.",
    microPractice: "Write the name of one person in your family history whose choices directly shaped your life -- positively or negatively. Write two sentences about the inheritance they left you. Then write one sentence about what you will do with it.",
  },
  {
    id: "community-4",
    day: 52,
    category: "community",
    title: "The Apology You Have Not Made",
    prompt: "There is someone you have harmed -- not dramatically, perhaps, but genuinely. You know who it is. You have thought about saying something. You have reasons you have not: too much time has passed, it will be awkward, maybe they have forgotten. They probably have not forgotten. And neither have you. What would the apology cost you, and is that cost less than what you are already paying to hold it?",
    grounding: "The Greek word katallage -- reconciliation -- appears in Paul's letters as something initiated from one direction: God reconciling the world to himself, not waiting for the world to move first. The one with capacity to initiate moves. The theological model for repair is not waiting for the right moment. It is creating the moment. Reconciliation requires someone to go first.",
    microPractice: "Write the apology you owe. All of it, without qualification -- no 'but I was also...' and no 'I'm sorry if you felt...' Just what you did and that you are sorry. Then decide whether to send it. But write it first.",
  },
  {
    id: "community-3b",
    day: 53,
    category: "community",
    title: "The Ekklesia You Are Missing",
    prompt: "The word ekklesia, translated as 'church,' means an assembly of citizens called out for a common purpose. Not a building, not an institution -- a gathering of people with a shared life and shared stakes. Do you have that? A group of people who know your name, bear your burdens, hold you accountable, and share something that matters? If not, what would it take to build one?",
    grounding: "Ekklesia in the Greek city-state was a civic gathering -- all citizens assembled to govern together. When early Christians used it, they were claiming that their gathering was the same kind of thing: a people with shared stakes in each other, a common life, and a common purpose that transcended private interest. The earliest Christian communities practiced radical economic sharing precisely because ekklesia meant that kind of solidarity.",
    microPractice: "Name one group of people in your life who function as genuine community -- who know and are known by you. If you cannot name one, that is the answer. Write one concrete step toward building that.",
    relatedConceptSlug: "ekklesia-church",
  },
  {
    id: "community-4b",
    day: 54,
    category: "community",
    title: "Who You Are When You Disagree",
    prompt: "How do you behave when you deeply disagree with someone you are in relationship with -- a friend, a family member, a colleague? Not a stranger on the internet -- someone whose life is bound up with yours. Do you stay? Do you flee into silence or politeness? Do you say what is true? Who are you when the cost of honesty is relationship?",
    grounding: "Paul's description of the body in 1 Corinthians 12 insists on the irreducibility of difference: 'the eye cannot say to the hand, I have no need of you.' The Greek word for 'need' (chreia) is strong -- it means necessity, not convenience. Difference within community is not a problem to be solved. It is the condition of the body functioning. You need the part that is not like you.",
    microPractice: "Identify one ongoing disagreement you have been managing through avoidance. Write what you actually think. Then decide whether to say it -- and how to say it in a way that keeps the relationship intact while being honest.",
  },

  // SILENCE (days 55-60)
  {
    id: "silence-1",
    day: 55,
    category: "silence",
    title: "What the Silence Contains",
    prompt: "Most of us avoid silence because of what it contains. When the noise stops, things surface -- thoughts we have been running from, feelings we have been managing, an awareness of our own smallness in a large world. What is in your silence? Not what you are afraid is there. What is actually there when you get quiet enough to find out?",
    grounding: "The desert fathers and mothers left the cities of the fourth century and moved into the Egyptian desert not to escape but to encounter. What they found in the silence was not peace but themselves -- the thoughts, desires, and fears that the city's noise had kept at bay. They called these visitations logismoi (thoughts) and developed a sophisticated practice of sitting with them rather than fleeing. The silence was not the point. What it revealed was.",
    microPractice: "Set a timer for ten minutes. Sit without any input -- no music, no podcast, no distraction. When a thought or feeling arrives, note it without following it. At the end, write three words about what was there.",
    relatedPracticeSlug: "centering-prayer",
  },
  {
    id: "silence-2",
    day: 56,
    category: "silence",
    title: "The God You Have Never Met in Silence",
    prompt: "The divine you know may be the divine of words, concepts, doctrines, songs -- the divine that shows up in noise and content. Have you ever waited long enough in silence to encounter something that does not fit your categories? Most people have never sat long enough to find out. The question is not whether you believe in God. It is whether you have been still enough to notice.",
    grounding: "The apophatic tradition -- the theology of silence and unknowing -- insists that God exceeds all concepts and descriptions. Gregory of Nyssa wrote of Moses entering the divine darkness, where the overwhelming light makes the eyes useless. Meister Eckhart: 'Nothing is so like God as silence.' Not as a technique but as an epistemological truth: some knowing requires the cessation of our usual knowing.",
    microPractice: "Sit in silence for fifteen minutes with no agenda except to be present. No prayer list. No intention to accomplish anything. If a concept of God arrives, let it pass. See what remains when you remove the concepts.",
    relatedPracticeSlug: "centering-prayer",
  },
  {
    id: "silence-3",
    day: 57,
    category: "silence",
    title: "The Practice You Have Not Started",
    prompt: "You know a practice would help you -- meditation, prayer, journaling, walking, something. You have thought about it, maybe tried it once or twice. You have excellent reasons for not maintaining it. But something keeps bringing you back to the thought of it. What practice has been asking for your attention that you keep deferring?",
    grounding: "The earliest Christian writings on prayer (Origen, Tertullian, the Didache) are less concerned with what to pray than with the practice of prayer as a structure of life -- fixed hours, physical postures, the rhythm of return. The point was not any single prayer experience but the cultivation of attention over time. Attention is a muscle. It strengthens only through repeated practice.",
    microPractice: "Name the practice you have been meaning to start. Commit to doing it for five minutes today -- not the ideal version, five minutes of the actual thing. Do not prepare for it. Just begin.",
    relatedPracticeSlug: "the-examen",
  },
  {
    id: "silence-4",
    day: 58,
    category: "silence",
    title: "Before You Speak",
    prompt: "Most speech happens automatically -- we respond to stimulus before we have considered what we actually think or want to say. What would happen if you waited one breath before each response in conversation today? Not to calculate, not to manage. Just to check: is this what I actually want to say? Is this true? Is this necessary?",
    grounding: "The desert father Abba Moses gave this counsel: 'Go, sit in your cell, and your cell will teach you everything.' The cell was not only a physical space but a practice of containment -- staying with yourself rather than dispersing into speech and movement. James 1:19 ('be swift to hear, slow to speak, slow to anger') places listening before speaking in the order of spiritual formation.",
    microPractice: "In conversations today, practice one breath of pause before responding. This is a practice, not a technique -- you will forget. When you remember, do it. At the end of the day, write what you noticed.",
  },
  {
    id: "silence-5",
    day: 59,
    category: "silence",
    title: "What Returns in the Quiet",
    prompt: "Something that used to matter to you may have gotten covered over -- by noise, by responsibility, by the accumulation of years. In the quiet moments, does something return? An old interest, a longing, a clarity about who you are underneath the roles you play? What comes back when the volume goes down?",
    grounding: "The concept of anamnesis -- remembrance as making present -- appears in the Eucharistic liturgy ('do this in remembrance of me') and in the Platonic tradition (the soul remembering what it knew before embodiment). Applied here: the self has a kind of deep memory. Silence allows what is most essentially oneself to return to the surface. The question is not what you should want -- it is what you already want, underneath the noise.",
    microPractice: "Spend twenty minutes in silence today -- no input, no agenda. At the end, complete this sentence: 'In the silence, what came back was ___.' Write without thinking about whether it makes sense.",
  },
  {
    id: "silence-6",
    day: 60,
    category: "silence",
    title: "The Last Word Being Silence",
    prompt: "This is the last entry in the sixty-day cycle. You have sat with questions about what you see, what you carry, who you are, what you owe, how you are in the world. All of that, ultimately, returns to this: silence. Not as a technique but as the ground state -- the thing underneath all the words and questions. What does it mean to rest in that, rather than always having the next thing ready?",
    grounding: "The last word of the biblical tradition is not doctrine or instruction but vision -- the book of Revelation ends with an image. The Psalter ends with praise so extravagant it runs out of words. The mystics across every tradition eventually arrive at the same silence -- not emptiness but fullness too large for language. Meister Eckhart: 'The most beautiful thing a person can say about God is to remain silent out of the wisdom of inner richness.' You have sixty days of questions. Now: rest.",
    microPractice: "Sit in silence for twenty minutes today. No instruction. No technique. No particular thing to do or notice. Let it be enough to be here.",
    relatedPracticeSlug: "centering-prayer",
  },
];

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

export function getAllLivingWords(): readonly LivingWord[] {
  return livingWords;
}

export function getLivingWordByDay(day: number): LivingWord | undefined {
  return livingWords.find((w) => w.day === day);
}

export function getLivingWordsByCategory(
  category: LivingWordCategory
): readonly LivingWord[] {
  return livingWords.filter((w) => w.category === category);
}

export function getLivingWordById(id: string): LivingWord | undefined {
  return livingWords.find((w) => w.id === id);
}

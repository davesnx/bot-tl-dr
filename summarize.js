const uid = require('uuid')

const messagesCollection = [
  {
    id: uid.v4(),
    hash: '',
    content: 'String of alot of stuff said by Lola Flores, String of alot of stuff said by Lola Flores, String of alot of stuff said by Lola Flores, String of alot of stuff said by Lola Flores, String of alot of stuff said by Lola Flores',
    userName: '',
    tags: [],
    hasMedia: false,
    media: {
      type: '',
      src: ''
    },
    points: {
      authority: 0
    }
  }, {
    id: uid.v4(),
    hash: '',
    content: 'Not much but clear.',
    userName: '',
    tags: [],
    hasMedia: false,
    media: {
      type: '',
      src: ''
    },
    points: {
      authority: 0
    }
  }, {
    id: uid.v4(),
    hash: '',
    content: 'Hola people, check out this stuff LOL',
    userName: '',
    tags: [],
    hasMedia: false,
    media: {
      type: '',
      src: ''
    },
    points: {
      authority: 0
    }
  }, {
    id: uid.v4(),
    hash: '',
    content: 'Good luck man!',
    userName: '',
    tags: [],
    hasMedia: false,
    media: {
      type: '',
      src: ''
    },
    points: {
      authority: 0
    }
  }, {
    id: uid.v4(),
    hash: '',
    content: 'luck',
    userName: '',
    tags: [],
    hasMedia: false,
    media: {
      type: '',
      src: ''
    },
    points: {
      authority: 0
    }
  }, {
    id: uid.v4(),
    hash: '',
    content: ':+1:',
    userName: '',
    tags: [],
    hasMedia: false,
    media: {
      type: '',
      src: ''
    },
    points: {
      authority: 0
    }
  }
]

const stripPunctuation = (sentence) => {
  sentence.normalize()
  return sentence
}

const createTags = (message) => {
  let tags = []

  // Split by sentence?
  tags = message.content.split(' ')
    .filter((tag) => tag.length > 3)
    .map((tag) => stripPunctuation(tag))

  return tags
}

const calculatePoints = (message) => {
  let authority = Math.random() * (message.content.length / 2)

  if (message.content.endsWith('.')) {
    authority++
  }

  if (message.content.endsWith('!')) {
    authority = authority + 2
  }

  if (message.hasMedia) {
    authority = authority + 5
  }

  return { authority }
}

const getAuthority = (message) => {
  return message.points.authority
}

const generateHash = (message) => {
  // TODO: slugify?
  return message.content.toLowerCase()
}

const isRepeatedWith = (message, messages) => {
  return false
  // return messages.filter((msg) => message.hash === msg.hash)
}

const reduceRepeateds = (message, index, messages) => {
  if (!isRepeatedWith((message, messages))) {
    return message
  }
}

// TODO: Use a simple implementation of summarize, the fun part!
const summarize = (messages, options) => {
  let summarized = []
  
  summarized = messages
    .map((message) => {
      message.tags = createTags(message)
      message.points = calculatePoints(message)
      message.hash = generateHash(message)
      return message
    })
    .sort((a, b) => getAuthority(a) < getAuthority(b))
    .filter((message) => getAuthority(message) > options.verbosity)
    .map(reduceRepeateds)
    .map((message) => message.content)

  return summarized
}

console.log(
  summarize(messagesCollection, { verbosity: 7 })
)

// DUMMY DATA. Replace with real content + real audio files (put audio in /audio, set audio: 'audio/file.mp3')
const COMMUNITIES = [
  {
    id: 'tharu', name: 'Tharu', region: '[region/districts]',
    story: '[2-3 lines about the community, written with a community member]',
    items: [
      { type: 'festival', title: '[festival name]', text: '[short story about it]' },
      { type: 'food', title: '[dish name]', text: '[short story about it]' }
    ],
    entries: [
      { native: '[tharu word 1]', np: '[nepali]', en: 'hello', audio: null, variants: [{ region: '[district A]' }, { region: '[district B]' }] },
      { native: '[tharu word 2]', np: '[nepali]', en: 'water', audio: null, variants: [] },
      { native: '[tharu word 3]', np: '[nepali]', en: 'rice', audio: null, variants: [] },
      { native: '[tharu word 4]', np: '[nepali]', en: 'mother', audio: null, variants: [] },
      { native: '[tharu word 5]', np: '[nepali]', en: 'thank you', audio: null, variants: [] }
    ]
  },
  {
    id: 'tamang', name: 'Tamang', region: '[region/districts]',
    story: '[2-3 lines about the community]',
    items: [{ type: 'festival', title: '[festival name]', text: '[short story]' }],
    entries: [
      { native: '[tamang word 1]', np: '[nepali]', en: 'hello', audio: null, variants: [] },
      { native: '[tamang word 2]', np: '[nepali]', en: 'water', audio: null, variants: [] },
      { native: '[tamang word 3]', np: '[nepali]', en: 'rice', audio: null, variants: [] },
      { native: '[tamang word 4]', np: '[nepali]', en: 'father', audio: null, variants: [] }
    ]
  }
];

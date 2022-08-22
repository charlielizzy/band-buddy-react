export const mockUser = () => {
  cy.intercept('GET', 'https://api.spotify.com/v1/me', (req) => {
    req.reply({
      country: 'GB',
      display_name: 'Charlotte Elizabeth',
      email: 'charlielizzy@123.com',
      explicit_content: {
        filter_enabled: false,
        filter_locked: false,
      },
      external_urls: {
        spotify: 'https://open.spotify.com/user/1111882414',
      },
      followers: {
        href: null,
        total: 13,
      },
      href: 'https://api.spotify.com/v1/users/1111882414',
      id: '1111882414',
      images: [
        {
          height: null,
          url: 'https://i.scdn.co/image/ab6775700000ee8564d8255e4bcf6564cfe880d2',
          width: null,
        },
      ],
      product: 'premium',
      type: 'user',
      uri: 'spotify:user:1111882414',
    })
  }).as('fetchUserData')
}

export const mockExtraInfo = () => {
  cy.intercept(
    'GET',
    'https://api.spotify.com/v1/tracks/6nCFIb0seIECUijbDpYNDu',
    (req) => {
      req.reply({
        album: {
          album_type: 'album',
          artists: [
            {
              external_urls: {
                spotify:
                  'https://open.spotify.com/artist/4AzAfQNuAyKOFG4DZMsdAo',
              },
              href: 'https://api.spotify.com/v1/artists/4AzAfQNuAyKOFG4DZMsdAo',
              id: '4AzAfQNuAyKOFG4DZMsdAo',
              name: 'The Snuts',
              type: 'artist',
              uri: 'spotify:artist:4AzAfQNuAyKOFG4DZMsdAo',
            },
          ],
          external_urls: {
            spotify: 'https://open.spotify.com/album/6dakS3ouiZyccOIdrBBKcu',
          },
          href: 'https://api.spotify.com/v1/albums/6dakS3ouiZyccOIdrBBKcu',
          id: '6dakS3ouiZyccOIdrBBKcu',
          images: [
            {
              height: 640,
              url: 'https://i.scdn.co/image/ab67616d0000b273214a0b7b069dd7557ba7910e',
              width: 640,
            },
            {
              height: 300,
              url: 'https://i.scdn.co/image/ab67616d00001e02214a0b7b069dd7557ba7910e',
              width: 300,
            },
            {
              height: 64,
              url: 'https://i.scdn.co/image/ab67616d00004851214a0b7b069dd7557ba7910e',
              width: 64,
            },
          ],
          name: 'W.L. (Deluxe)',
          release_date: '2021-04-02',
          release_date_precision: 'day',
          total_tracks: 17,
          type: 'album',
          uri: 'spotify:album:6dakS3ouiZyccOIdrBBKcu',
        },
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/4AzAfQNuAyKOFG4DZMsdAo',
            },
            href: 'https://api.spotify.com/v1/artists/4AzAfQNuAyKOFG4DZMsdAo',
            id: '4AzAfQNuAyKOFG4DZMsdAo',
            name: 'The Snuts',
            type: 'artist',
            uri: 'spotify:artist:4AzAfQNuAyKOFG4DZMsdAo',
          },
        ],
      })
    }
  ).as('fetchTrackData')
  cy.intercept(
    'GET',
    'https://api.spotify.com/v1/artists/4AzAfQNuAyKOFG4DZMsdAo/top-tracks?market=GB',
    (req) =>
      req.reply({
        tracks: [
          {
            album: {
              artists: [
                {
                  external_urls: {
                    spotify:
                      'https://open.spotify.com/artist/4AzAfQNuAyKOFG4DZMsdAo',
                  },
                  href: 'https://api.spotify.com/v1/artists/4AzAfQNuAyKOFG4DZMsdAo',
                  id: '4AzAfQNuAyKOFG4DZMsdAo',
                  name: 'The Snuts',
                },
              ],
              external_urls: {
                spotify:
                  'https://open.spotify.com/album/6dakS3ouiZyccOIdrBBKcu',
              },
              href: 'https://api.spotify.com/v1/albums/6dakS3ouiZyccOIdrBBKcu',
              id: '6dakS3ouiZyccOIdrBBKcu',
              images: [
                {
                  height: 640,
                  url: 'https://i.scdn.co/image/ab67616d0000b273214a0b7b069dd7557ba7910e',
                  width: 640,
                },
              ],
              name: 'W.L. (Deluxe)',
            },
            artists: [
              {
                external_urls: {
                  spotify:
                    'https://open.spotify.com/artist/4AzAfQNuAyKOFG4DZMsdAo',
                },
                href: 'https://api.spotify.com/v1/artists/4AzAfQNuAyKOFG4DZMsdAo',
                id: '4AzAfQNuAyKOFG4DZMsdAo',
                name: 'The Snuts',
              },
            ],

            external_urls: {
              spotify: 'https://open.spotify.com/track/6nCFIb0seIECUijbDpYNDu',
            },
            href: 'https://api.spotify.com/v1/tracks/6nCFIb0seIECUijbDpYNDu',
            id: '6nCFIb0seIECUijbDpYNDu',

            name: 'Glasgow',
          },
          {
            album: {
              artists: [
                {
                  external_urls: {
                    spotify:
                      'https://open.spotify.com/artist/4AzAfQNuAyKOFG4DZMsdAo',
                  },
                  href: 'https://api.spotify.com/v1/artists/4AzAfQNuAyKOFG4DZMsdAo',
                  id: '4AzAfQNuAyKOFG4DZMsdAo',
                  name: 'The Snuts',
                },
              ],
              external_urls: {
                spotify:
                  'https://open.spotify.com/album/6dakS3ouiZyccOIdrBBKcu',
              },
              href: 'https://api.spotify.com/v1/albums/6dakS3ouiZyccOIdrBBKcu',
              id: '6dakS3ouiZyccOIdrBBKcu',
              images: [
                {
                  height: 640,
                  url: 'https://i.scdn.co/image/ab67616d0000b273214a0b7b069dd7557ba7910e',
                  width: 640,
                },
              ],
              name: 'W.L. (Deluxe)',
            },
            artists: [
              {
                external_urls: {
                  spotify:
                    'https://open.spotify.com/artist/4AzAfQNuAyKOFG4DZMsdAo',
                },
                href: 'https://api.spotify.com/v1/artists/4AzAfQNuAyKOFG4DZMsdAo',
                id: '4AzAfQNuAyKOFG4DZMsdAo',
                name: 'The Snuts',
              },
            ],

            external_urls: {
              spotify: 'https://open.spotify.com/track/77eb7DGxwuA3ID69HQeDsE',
            },
            href: 'https://api.spotify.com/v1/tracks/77eb7DGxwuA3ID69HQeDsE',
            id: '77eb7DGxwuA3ID69HQeDsE',

            name: 'Always',
          },
          {
            album: {
              artists: [
                {
                  external_urls: {
                    spotify:
                      'https://open.spotify.com/artist/4AzAfQNuAyKOFG4DZMsdAo',
                  },
                  href: 'https://api.spotify.com/v1/artists/4AzAfQNuAyKOFG4DZMsdAo',
                  id: '4AzAfQNuAyKOFG4DZMsdAo',
                  name: 'The Snuts',
                },
              ],
              external_urls: {
                spotify:
                  'https://open.spotify.com/album/7krOdTWHov9BqYIrCOuw8G',
              },
              href: 'https://api.spotify.com/v1/albums/7krOdTWHov9BqYIrCOuw8G',
              id: '7krOdTWHov9BqYIrCOuw8G',
              images: [
                {
                  height: 640,
                  url: 'https://i.scdn.co/image/ab67616d0000b273eb377d8e6ec23799a9a1e003',
                  width: 640,
                },
              ],
              name: 'Seasons',
            },
            artists: [
              {
                external_urls: {
                  spotify:
                    'https://open.spotify.com/artist/4AzAfQNuAyKOFG4DZMsdAo',
                },
                href: 'https://api.spotify.com/v1/artists/4AzAfQNuAyKOFG4DZMsdAo',
                id: '4AzAfQNuAyKOFG4DZMsdAo',
                name: 'The Snuts',
              },
            ],

            external_urls: {
              spotify: 'https://open.spotify.com/track/2yJrBMZpkZ1KvMYxYvRGOO',
            },
            href: 'https://api.spotify.com/v1/tracks/2yJrBMZpkZ1KvMYxYvRGOO',
            id: '2yJrBMZpkZ1KvMYxYvRGOO',
          },
          {
            album: {
              artists: [
                {
                  external_urls: {
                    spotify:
                      'https://open.spotify.com/artist/4AzAfQNuAyKOFG4DZMsdAo',
                  },
                  href: 'https://api.spotify.com/v1/artists/4AzAfQNuAyKOFG4DZMsdAo',
                  id: '4AzAfQNuAyKOFG4DZMsdAo',
                  name: 'The Snuts',
                },
              ],
              external_urls: {
                spotify:
                  'https://open.spotify.com/album/3VPtca7a7ZIpDiAlP6WITv',
              },
              href: 'https://api.spotify.com/v1/albums/3VPtca7a7ZIpDiAlP6WITv',
              id: '3VPtca7a7ZIpDiAlP6WITv',
              images: [
                {
                  height: 640,
                  url: 'https://i.scdn.co/image/ab67616d0000b27348a64db17cb9663e21e4401d',
                  width: 640,
                },
              ],
              name: 'The Rodeo',
            },
            artists: [
              {
                external_urls: {
                  spotify:
                    'https://open.spotify.com/artist/4AzAfQNuAyKOFG4DZMsdAo',
                },
                href: 'https://api.spotify.com/v1/artists/4AzAfQNuAyKOFG4DZMsdAo',
                id: '4AzAfQNuAyKOFG4DZMsdAo',
                name: 'The Snuts',
              },
            ],

            external_urls: {
              spotify: 'https://open.spotify.com/track/3Yx28qSrbZupaKw9pUBHfu',
            },
            href: 'https://api.spotify.com/v1/tracks/3Yx28qSrbZupaKw9pUBHfu',
            id: '3Yx28qSrbZupaKw9pUBHfu',
          },
          {
            album: {
              album_type: 'album',
              artists: [
                {
                  external_urls: {
                    spotify:
                      'https://open.spotify.com/artist/4AzAfQNuAyKOFG4DZMsdAo',
                  },
                  href: 'https://api.spotify.com/v1/artists/4AzAfQNuAyKOFG4DZMsdAo',
                  id: '4AzAfQNuAyKOFG4DZMsdAo',
                  name: 'The Snuts',
                },
              ],
              external_urls: {
                spotify:
                  'https://open.spotify.com/album/6dakS3ouiZyccOIdrBBKcu',
              },
              href: 'https://api.spotify.com/v1/albums/6dakS3ouiZyccOIdrBBKcu',
              id: '6dakS3ouiZyccOIdrBBKcu',
              images: [
                {
                  height: 640,
                  url: 'https://i.scdn.co/image/ab67616d0000b273214a0b7b069dd7557ba7910e',
                  width: 640,
                },
              ],
              name: 'W.L. (Deluxe)',
            },
            artists: [
              {
                external_urls: {
                  spotify:
                    'https://open.spotify.com/artist/4AzAfQNuAyKOFG4DZMsdAo',
                },
                href: 'https://api.spotify.com/v1/artists/4AzAfQNuAyKOFG4DZMsdAo',
                id: '4AzAfQNuAyKOFG4DZMsdAo',
                name: 'The Snuts',
              },
            ],

            external_urls: {
              spotify: 'https://open.spotify.com/track/0RWolKaKzYDxm0lf8BR4co',
            },
            href: 'https://api.spotify.com/v1/tracks/0RWolKaKzYDxm0lf8BR4co',
            id: '0RWolKaKzYDxm0lf8BR4co',
          },
        ],
      })
  ).as('fetchTopTracksInfo')

  cy.intercept(
    'GET',
    'https://api.spotify.com/v1/artists/4AzAfQNuAyKOFG4DZMsdAo/related-artists',
    (req) => {
      req.reply({
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/7DruTvBV7owt1aSAZHsU58',
            },
            followers: {
              href: null,
              total: 121998,
            },
            genres: [
              'english indie rock',
              'modern alternative rock',
              'modern rock',
              'warrington indie',
            ],
            href: 'https://api.spotify.com/v1/artists/7DruTvBV7owt1aSAZHsU58',
            id: '7DruTvBV7owt1aSAZHsU58',
            images: [
              {
                height: 563,
                url: 'https://i.scdn.co/image/c5d890483fa35500ad23db6e03c1a711cec891fc',
                width: 999,
              },
            ],
            name: 'Viola Beach',
          },
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/4hfrzKkUsrb3Cz209SKxbo',
            },
            followers: {
              href: null,
              total: 52737,
            },
            genres: [
              'english indie rock',
              'modern alternative rock',
              'modern rock',
            ],
            href: 'https://api.spotify.com/v1/artists/4hfrzKkUsrb3Cz209SKxbo',
            id: '4hfrzKkUsrb3Cz209SKxbo',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/ab6761610000e5ebb0481304cdaf55875aadbfe6',
                width: 640,
              },
            ],
            name: 'Ten Tonnes',
          },
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/7jZycSvTyx0W9poD4PjEIG',
            },
            followers: {
              href: null,
              total: 234487,
            },
            genres: [
              'modern alternative rock',
              'modern rock',
              'rock',
              'uk pop',
            ],
            href: 'https://api.spotify.com/v1/artists/7jZycSvTyx0W9poD4PjEIG',
            id: '7jZycSvTyx0W9poD4PjEIG',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/ab6761610000e5eb5798393deebf2325031b7704',
                width: 640,
              },
            ],
            name: 'The Hunna',
          },
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/4fgXfJCQnK6c44u4KzAtQP',
            },
            followers: {
              href: null,
              total: 187558,
            },
            genres: [
              'english indie rock',
              'modern alternative rock',
              'modern rock',
              'reading indie',
              'rock',
            ],
            href: 'https://api.spotify.com/v1/artists/4fgXfJCQnK6c44u4KzAtQP',
            id: '4fgXfJCQnK6c44u4KzAtQP',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/ab6761610000e5eb126c3982a9acd42b975009cc',
                width: 640,
              },
            ],
            name: 'Sundara Karma',
          },
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/22RISwgVJyZu9lpqAcv1F5',
            },
            followers: {
              href: null,
              total: 400945,
            },
            genres: ['english indie rock', 'modern rock', 'rock'],
            href: 'https://api.spotify.com/v1/artists/22RISwgVJyZu9lpqAcv1F5',
            id: '22RISwgVJyZu9lpqAcv1F5',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/ab6761610000e5ebfa64c024bf9ca7bee4ab700d',
                width: 640,
              },
            ],
            name: 'Blossoms',
          },
        ],
      })
    }
  ).as('fetchRelatedArtists')

  cy.intercept(
    'GET',
    'https://app.ticketmaster.com/discovery/v2/events?apikey=0y3bmD7nU4GSr7rlKAPuFHbw48SeAdYn&keyword=The%20Snuts&locale=*',
    (req) => {
      req.reply({
        _embedded: {
          events: [
            {
              name: 'The Snuts',

              id: 'ZK98xZKrZAdFdZup5QQKr',

              url: 'https://shop.ticketmaster.it/biglietti/acquista-biglietti-the-snuts.html',

              dates: {
                start: {
                  localDate: '2022-09-16',
                  localTime: '21:00:00',
                },
              },

              _embedded: {
                venues: [
                  {
                    name: 'Santeria Toscana 31',
                    type: 'venue',
                    id: 'ZK98xZKrZe761Zup5QQKr',
                    test: false,
                    locale: 'it-it',
                    postalCode: '20136',
                    city: { name: 'Milano' },
                    country: { name: 'Italia', countryCode: 'IT' },
                    location: { longitude: '9.188358', latitude: '45.445665' },
                  },
                ],
                attractions: [
                  {
                    name: 'The Snuts',
                    type: 'attraction',
                    id: 'K8vZ9179o4V',
                    test: false,
                    url: 'https://www.ticketmaster.ie/the-snuts-tickets/artist/5235234',
                    locale: 'en-us',
                    externalLinks: {
                      youtube: [
                        {
                          url: 'https://www.youtube.com/channel/UC0aftMT8dWPpF2M_v82N7hw',
                        },
                      ],
                      twitter: [{ url: 'https://twitter.com/TheSnuts' }],
                      itunes: [
                        {
                          url: 'https://music.apple.com/gb/artist/the-snuts/1114630221',
                        },
                      ],
                      facebook: [
                        { url: 'https://www.facebook.com/TheSnutsOfficial' },
                      ],
                      spotify: [
                        {
                          url: 'https://open.spotify.com/artist/4AzAfQNuAyKOFG4DZMsdAo',
                        },
                      ],
                      instagram: [
                        { url: 'https://www.instagram.com/thesnuts/' },
                      ],
                      homepage: [{ url: 'https://www.thesnuts.co.uk/' }],
                    },
                  },
                ],
              },
            },
            {
              name: 'The Snuts',
              type: 'event',
              id: 'G5vHZ9CUYw7n5',
              test: false,
              url: 'https://www.ticketmaster.co.uk/the-snuts-bristol-10-02-2022/event/1F005CEDB0C84A8B',
              locale: 'en-us',
              images: [
                {
                  ratio: '3_2',
                  url: 'https://s1.ticketm.net/dam/a/556/dc2bc986-8b03-49f7-a0dd-054fc41fc556_1751441_RETINA_PORTRAIT_3_2.jpg',
                  width: 640,
                  height: 427,
                  fallback: false,
                },
              ],

              dates: {
                start: {
                  localDate: '2022-10-02',
                  localTime: '19:00:00',
                },
                timezone: 'Europe/London',
                status: { code: 'onsale' },
                spanMultipleDays: false,
              },

              _embedded: {
                venues: [
                  {
                    name: 'O2 Academy Bristol',
                    type: 'venue',
                    id: 'KovZpZAnalJA',
                    test: false,
                    url: 'https://www.ticketmaster.co.uk/o2-academy-bristol-tickets-bristol/venue/255606',
                    locale: 'en-de',
                    images: [
                      {
                        ratio: '16_9',
                        url: 'https://s1.ticketm.net/dbimages/879v.jpg',
                        width: 205,
                        height: 115,
                        fallback: false,
                      },
                    ],
                    postalCode: 'BS1 5NA',
                    timezone: 'Europe/London',
                    city: { name: 'Bristol' },
                    country: { name: 'Great Britain', countryCode: 'GB' },
                    address: { line1: 'Frogmore Street' },
                    location: { longitude: '-2.600849', latitude: '51.454142' },
                  },
                ],
                attractions: [
                  {
                    name: 'The Snuts',

                    url: 'https://www.ticketmaster.co.uk/the-snuts-tickets/artist/5235234',
                    locale: 'en-us',
                    externalLinks: {
                      youtube: [
                        {
                          url: 'https://www.youtube.com/channel/UC0aftMT8dWPpF2M_v82N7hw',
                        },
                      ],
                      twitter: [{ url: 'https://twitter.com/TheSnuts' }],
                      itunes: [
                        {
                          url: 'https://music.apple.com/gb/artist/the-snuts/1114630221',
                        },
                      ],
                      facebook: [
                        { url: 'https://www.facebook.com/TheSnutsOfficial' },
                      ],
                      spotify: [
                        {
                          url: 'https://open.spotify.com/artist/4AzAfQNuAyKOFG4DZMsdAo',
                        },
                      ],
                      instagram: [
                        { url: 'https://www.instagram.com/thesnuts/' },
                      ],
                      homepage: [{ url: 'https://www.thesnuts.co.uk/' }],
                    },
                    images: [
                      {
                        ratio: '3_2',
                        url: 'https://s1.ticketm.net/dam/a/556/dc2bc986-8b03-49f7-a0dd-054fc41fc556_1751441_RETINA_PORTRAIT_3_2.jpg',
                        width: 640,
                        height: 427,
                        fallback: false,
                      },
                    ],
                  },
                ],
              },
            },
            {
              name: 'The Snuts',

              url: 'https://www.ticketweb.uk/event/the-snuts-chalk-tickets/12287735?REFERRAL_ID=tmfeed',
              locale: 'en-us',
              images: [
                {
                  ratio: '3_2',
                  url: 'https://s1.ticketm.net/dam/a/556/dc2bc986-8b03-49f7-a0dd-054fc41fc556_1751441_RETINA_PORTRAIT_3_2.jpg',
                  width: 640,
                  height: 427,
                  fallback: false,
                },
              ],

              dates: {
                start: {
                  localDate: '2022-10-04',
                  localTime: '18:30:00',
                },
              },

              _embedded: {
                venues: [
                  {
                    name: 'Chalk, Brighton',
                    type: 'venue',
                    id: 'KovZpZAnJ6nA',
                    test: false,
                    url: 'https://www.ticketmaster.co.uk/chalk-brighton-tickets-brighton/venue/256310',
                    locale: 'en-de',
                    postalCode: 'BN1 1NJ',
                    timezone: 'Europe/London',
                    city: { name: 'Brighton' },
                    country: { name: 'Great Britain', countryCode: 'GB' },
                    address: { line1: '10 Pool Valley', line2: 'East Sussex' },
                    location: { longitude: '-0.138704', latitude: '50.820167' },
                  },
                ],
                attractions: [
                  {
                    name: 'The Snuts',
                    type: 'attraction',
                    id: 'K8vZ9179o4V',
                    test: false,
                    url: 'https://www.ticketmaster.ie/the-snuts-tickets/artist/5235234',
                    locale: 'en-us',
                    externalLinks: {
                      youtube: [
                        {
                          url: 'https://www.youtube.com/channel/UC0aftMT8dWPpF2M_v82N7hw',
                        },
                      ],
                      twitter: [{ url: 'https://twitter.com/TheSnuts' }],
                      itunes: [
                        {
                          url: 'https://music.apple.com/gb/artist/the-snuts/1114630221',
                        },
                      ],
                      facebook: [
                        { url: 'https://www.facebook.com/TheSnutsOfficial' },
                      ],
                      spotify: [
                        {
                          url: 'https://open.spotify.com/artist/4AzAfQNuAyKOFG4DZMsdAo',
                        },
                      ],
                      instagram: [
                        { url: 'https://www.instagram.com/thesnuts/' },
                      ],
                      homepage: [{ url: 'https://www.thesnuts.co.uk/' }],
                    },
                    images: [
                      {
                        ratio: '3_2',
                        url: 'https://s1.ticketm.net/dam/a/556/dc2bc986-8b03-49f7-a0dd-054fc41fc556_1751441_RETINA_PORTRAIT_3_2.jpg',
                        width: 640,
                        height: 427,
                        fallback: false,
                      },
                    ],
                  },
                ],
              },
            },
            {
              name: 'The Snuts',

              url: 'https://www.ticketweb.uk/event/the-snuts-chalk-tickets/12287735?REFERRAL_ID=tmfeed',
              locale: 'en-us',
              images: [
                {
                  ratio: '3_2',
                  url: 'https://s1.ticketm.net/dam/a/556/dc2bc986-8b03-49f7-a0dd-054fc41fc556_1751441_RETINA_PORTRAIT_3_2.jpg',
                  width: 640,
                  height: 427,
                  fallback: false,
                },
              ],
              dates: {
                start: {
                  localDate: '2022-10-07',
                  localTime: '19:00:00',
                },
              },

              _embedded: {
                venues: [
                  {
                    name: 'O2 Academy Birmingham',
                    type: 'venue',
                    id: 'KovZpZAnak7A',
                    test: false,
                    url: 'https://www.ticketmaster.co.uk/o2-academy-birmingham-tickets-birmingham/venue/254975',
                    locale: 'en-de',
                    images: [
                      {
                        url: 'https://s1.ticketm.net/dbimages/2550v.jpg',
                        width: 2362,
                        height: 637,
                        fallback: false,
                      },
                    ],
                    postalCode: 'B1 1DB',
                    timezone: 'Europe/London',
                    city: { name: 'Birmingham' },
                    country: { name: 'Great Britain', countryCode: 'GB' },
                    address: {
                      line1: '16-18 Horsefair',
                      line2: 'Bristol Street',
                    },
                    location: { longitude: '-1.900215', latitude: '52.473277' },
                  },
                ],
                attractions: [
                  {
                    name: 'The Snuts',
                    type: 'attraction',
                    id: 'K8vZ9179o4V',
                    test: false,
                    url: 'https://www.ticketmaster.co.uk/the-snuts-tickets/artist/5235234',
                    locale: 'en-us',
                    externalLinks: {
                      youtube: [
                        {
                          url: 'https://www.youtube.com/channel/UC0aftMT8dWPpF2M_v82N7hw',
                        },
                      ],
                      twitter: [{ url: 'https://twitter.com/TheSnuts' }],
                      itunes: [
                        {
                          url: 'https://music.apple.com/gb/artist/the-snuts/1114630221',
                        },
                      ],
                      facebook: [
                        { url: 'https://www.facebook.com/TheSnutsOfficial' },
                      ],
                      spotify: [
                        {
                          url: 'https://open.spotify.com/artist/4AzAfQNuAyKOFG4DZMsdAo',
                        },
                      ],
                      instagram: [
                        { url: 'https://www.instagram.com/thesnuts/' },
                      ],
                      homepage: [{ url: 'https://www.thesnuts.co.uk/' }],
                    },
                    images: [
                      {
                        ratio: '3_2',
                        url: 'https://s1.ticketm.net/dam/a/556/dc2bc986-8b03-49f7-a0dd-054fc41fc556_1751441_RETINA_PORTRAIT_3_2.jpg',
                        width: 640,
                        height: 427,
                        fallback: false,
                      },
                    ],
                  },
                  {
                    name: 'Heidi Curtis',
                    url: 'https://www.ticketmaster.co.uk/heidi-curtis-tickets/artist/5383201',
                    locale: 'en-us',
                    images: [
                      {
                        ratio: '3_2',
                        url: 'https://s1.ticketm.net/dam/c/797/5e693c26-2881-4776-8f0c-3aa94bfa3797_106511_RETINA_PORTRAIT_3_2.jpg',
                        width: 640,
                        height: 427,
                        fallback: true,
                      },
                    ],
                  },
                ],
              },
            },
            {
              name: 'The Snuts',

              url: 'https://www.ticketmaster.co.uk/the-snuts-sheffield-10-08-2022/event/1F005CEEB3974E60',
              locale: 'en-us',
              images: [
                {
                  ratio: '3_2',
                  url: 'https://s1.ticketm.net/dam/a/556/dc2bc986-8b03-49f7-a0dd-054fc41fc556_1751441_RETINA_PORTRAIT_3_2.jpg',
                  width: 640,
                  height: 427,
                  fallback: false,
                },
              ],

              dates: {
                start: {
                  localDate: '2022-10-08',
                  localTime: '18:30:00',
                },
                timezone: 'Europe/London',
              },

              venues: [
                { href: '/discovery/v2/venues/KovZpZAn6vlA?locale=en-de' },
              ],

              _embedded: {
                venues: [
                  {
                    name: 'O2 Academy Sheffield',
                    type: 'venue',
                    url: 'https://www.ticketmaster.co.uk/o2-academy-sheffield-tickets-sheffield/venue/254102',
                    locale: 'en-de',
                    images: [
                      {
                        ratio: '16_9',
                        url: 'https://s1.ticketm.net/dbimages/887v.jpg',
                        width: 205,
                        height: 115,
                        fallback: false,
                      },
                    ],
                    postalCode: 'S1 2PN',
                    timezone: 'Europe/London',
                    city: { name: 'Sheffield' },
                    country: { name: 'Great Britain', countryCode: 'GB' },
                    address: { line1: '37 - 43 Arundel Gate' },
                    location: { longitude: '-1.465652', latitude: '53.382342' },
                    markets: [
                      { name: 'All of United Kingdom', id: '201' },
                      { name: 'North and North East', id: '206' },
                    ],
                  },
                ],
                attractions: [
                  {
                    name: 'The Snuts',

                    url: 'https://www.ticketmaster.co.uk/the-snuts-tickets/artist/5235234',

                    externalLinks: {
                      youtube: [
                        {
                          url: 'https://www.youtube.com/channel/UC0aftMT8dWPpF2M_v82N7hw',
                        },
                      ],
                      twitter: [{ url: 'https://twitter.com/TheSnuts' }],
                      itunes: [
                        {
                          url: 'https://music.apple.com/gb/artist/the-snuts/1114630221',
                        },
                      ],
                      facebook: [
                        { url: 'https://www.facebook.com/TheSnutsOfficial' },
                      ],
                      spotify: [
                        {
                          url: 'https://open.spotify.com/artist/4AzAfQNuAyKOFG4DZMsdAo',
                        },
                      ],
                      instagram: [
                        { url: 'https://www.instagram.com/thesnuts/' },
                      ],
                      homepage: [{ url: 'https://www.thesnuts.co.uk/' }],
                    },
                    images: [
                      {
                        ratio: '3_2',
                        url: 'https://s1.ticketm.net/dam/a/556/dc2bc986-8b03-49f7-a0dd-054fc41fc556_1751441_RETINA_PORTRAIT_3_2.jpg',
                        width: 640,
                        height: 427,
                        fallback: false,
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      })
    }
  ).as('fetchEventInfo')
}

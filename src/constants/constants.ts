export const NO_DESCRIPTION_MESSAGE =
  'Sorry, there is no description here. The API developers have not provided one.';

export const NO_FIELDS_MESSAGE = 'This type has no fields';

export const NO_SCHEMA_MESSAGE = 'No schema available.';

export const GRAPHQL_ENDPOINTS = [
  'rickandmortyapi.graphcdn.app',
  'spacex-production.up.railway.app',
  'swapi-graphql.netlify.app/.netlify/functions/index',
  'beta.pokeapi.co/graphql/v1beta',
  'countries.trevorblades.com/graphql',
];

export const MEMES_URL = [
  'https://colinhacks.com/graphql_grave.jpg',
  'https://1.bp.blogspot.com/-OhRLnerbm0M/YZDsgdY6k2I/AAAAAAAARCg/kWejTW8xiuca4nwODjSvz2Dyt8Es-IiMACLcBGAsYHQ/s528/graphql-statuscode.png',
  'https://georgechang.io/posts/2022/graphql-for-headful-sitecore/img/graphql-meme.png',
  'https://res.cloudinary.com/practicaldev/image/fetch/s--eEFkdpFH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cqcp79afuekis0lotxwk.png',
  'https://wpcontent.io/content/uploads/2021/04/5160-how-and-where-can-graphql-improve-wordpress-comple-rest-graphql-meme.jpg',
  'https://media.makeameme.org/created/graphql-is-cool.jpg',
  'https://res.cloudinary.com/practicaldev/image/fetch/s--ydhv4JZO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d9flih8frtrrkj4rthu2.png',
  'https://images.ctfassets.net/lpvian6u6i39/5Cjg11vLA7TtBltK2eZRgC/a7796e4116aa02c7fab44bcf41d5bb74/632814946fdd0783ccd383fe_What_you_really_want_is_GraphQL.jpeg',
  'https://pbs.twimg.com/media/DgsXLk_X4AEKiJJ.jpg',
  'https://res.cloudinary.com/practicaldev/image/fetch/s--Mj-l1XJQ--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/810rx3aflyr74a87hkgt.png',
];

export const GRAPHQLWORDS = [
  { name: 'String', description: 'A data type representing textual data.' },
  { name: 'Int', description: 'A data type representing integers.' },
  { name: 'FilmsConnection', description: 'Connection to a list of films.' },
  {
    name: 'PageInfo',
    description: 'Information about pagination in a connection.',
  },
  {
    name: 'Boolean',
    description: 'A data type representing true or false values.',
  },
  {
    name: 'FilmsEdge',
    description: 'An edge in a connection to a list of films.',
  },
  { name: 'Film', description: 'Represents a single film.' },
  { name: 'Node', description: 'An interface for objects with an ID.' },
  { name: 'ID', description: 'A data type representing a unique identifier.' },
  {
    name: 'FilmSpeciesConnection',
    description: 'Connection to a list of species in a film.',
  },
];

export const INDENTATION = '\t';

export const QUERY_FOR_SHEMA_FETCHING = `
  fragment FullType on __Type {
    kind
    name
    fields(includeDeprecated: true) {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }
  fragment InputValue on __InputValue {
    name
    description
    type {
      ...TypeRef
    }
    defaultValue
  }
  fragment TypeRef on __Type {
    kind
    name
    description
    ofType {
      kind
      name
      description
      ofType {
        kind
        name
        description
        ofType {
          kind
          name
          description
          ofType {
            kind
            name
            description
            ofType {
              kind
              name
              description
              ofType {
                kind
                name
                description
                ofType {
                  kind
                  name
                  description
                }
              }
            }
          }
        }
      }
    }
  }
  query IntrospectionQuery {
    __schema {
      queryType {
        name
      }
      mutationType {
        name
      }
      types {
        ...FullType
      }
      directives {
        name
        description
        locations
        args {
          ...InputValue
        }
      }
    }
  }`;

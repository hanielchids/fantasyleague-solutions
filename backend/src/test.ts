import { ApolloServer, gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";

const typeDefs = gql`
  type University {
    name: String!
    state_province: String!
    web_pages: [String!]!
  }

  type Query {
    universities(name: String, state_province: String): [University!]!
  }
`;

describe("resolvers", () => {
  const server = new ApolloServer({
    typeDefs,
    // resolvers,
  });

  const { query } = createTestClient(server);

  it("should return all universities when no filters are applied", async () => {
    const { data } = await query({
      query: gql`
        {
          universities {
            name
            state_province
            web_pages
          }
        }
      `,
    });

    expect(data).toMatchSnapshot();
  });

  it("should return universities filtered by name", async () => {
    const { data } = await query({
      query: gql`
        {
          universities(name: "university") {
            name
            state_province
            web_pages
          }
        }
      `,
    });

    expect(data).toMatchSnapshot();
  });

  it("should return universities filtered by state_province", async () => {
    const { data } = await query({
      query: gql`
        {
          universities(state_province: "gauteng") {
            name
            state_province
            web_pages
          }
        }
      `,
    });

    expect(data).toMatchSnapshot();
  });

  it("should return universities filtered by both name and state_province", async () => {
    const { data } = await query({
      query: gql`
        {
          universities(name: "university", state_province: "gauteng") {
            name
            state_province
            web_pages
          }
        }
      `,
    });

    expect(data).toMatchSnapshot();
  });
});
``;

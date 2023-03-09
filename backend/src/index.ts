import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import fetch from "node-fetch";

interface University {
  name: string;
  state_province: string;
  web_pages: string[];
}

interface UniversitiesArgs {
  name?: string;
  state_province?: string;
}

const app = express();

const typeDefs = gql`
  type University {
    name: String
    state_province: String
    web_pages: [String]
  }

  type Query {
    universities(name: String, state_province: String): [University]
  }
`;

const resolvers = {
  Query: {
    universities: async (
      _: any,
      args: UniversitiesArgs
    ): Promise<University[]> => {
      const url = `http://universities.hipolabs.com/search?country=South+Africa`;
      const response = await fetch(url);
      const data = (await response.json()) as University[];

      // filter data based on optional args
      const filteredData = data.filter((university: University) => {
        const nameMatch =
          !args.name ||
          university.name.toLowerCase().includes(args.name.toLowerCase());
        const stateMatch =
          !args.state_province ||
          university.state_province
            .toLowerCase()
            .includes(args.state_province.toLowerCase());
        return nameMatch && stateMatch;
      });

      // only return the required fields
      return filteredData.map((university: University) => ({
        name: university.name,
        state_province: university.state_province,
        web_pages: university.web_pages,
      }));
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

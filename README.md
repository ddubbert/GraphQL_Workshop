# GraphQL Workshop: Building a GraphQL Server

Material for the workshop **"GraphQL Grundlagen Part 2 – Server"**, held by
Dennis Dubbert on 4 June 2019 in the module *Web-Technologien* of the Media
Informatics master at TH Köln. It followed Part 1 (GraphQL from the client's
side, 14 May 2019, together with Vimal Darius Seetohul). Course page:
[th-koeln/mi-master-wtw](https://github.com/th-koeln/mi-master-wtw/blob/master/_workshops/2019/GraphQL-Server/index.md).

> **Status:** teaching material from 2019, kept as a reference and no longer
> maintained. It uses graphql-yoga 1, which has since been superseded.

## What participants build

A small marketplace API (users, producers, products, orders, reviews) on
[graphql-yoga](https://github.com/prisma/graphql-yoga), with in-memory data
under `src/utils/databases`. Step by step they write schema types, queries,
mutations (e.g. `createOrder`, `createProduct`), filters, and finally a
GraphQL subscription.

| Folder | Content |
|---|---|
| `src/` | Starting point: server setup, an example schema/resolver and empty task files |
| `Solutions/Task1` … `Task4`, `TaskBonus` | Reference solution after each task (`tasks.graphql` + `tasks.js`) |

The task descriptions and slides were handed out in the course.

## Run it

Requires Node.js (the workshop used Node 8+).

```sh
npm install
npm start
```

Then open the GraphQL Playground at http://localhost:3000/ and the schema
visualisation (GraphQL Voyager) at http://localhost:3000/voyager. To look at a
solution, copy the files from `Solutions/TaskN/` over `src/schemas/tasks.graphql`
and `src/resolvers/tasks.js`.

All names and e-mail addresses in the sample data are fictitious.

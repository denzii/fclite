
# FC Lite

Simple full stack application for graphql & prisma CRUD

## Authors

- [@denzii](https://www.github.com/denzii)

## Run Locally

**Clone the project**

```bash
  git clone https://github.com/denzii/fclite.git
```

**Install dependencies**

```bash
  cd fclite/client && npm i
  cd ../server && npm i

```

**Configure environment**

   1) Create an .env inside the root of server

```bash
 cd fclite/server && touch .env
```

   2) Append a postgreSQL connection string to .env in the following format

```bash
DATABASE_URL="postgresql://postgres:verysecretpassword@localhost:5432/fclite?schema=public"
```

   3) Install Postgresql on your machine and create the server fclite. This has been omitted from this guide, please see this helpful article by DigitalOcean [here](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart) to learn more.
_

**ORM Setup**

 Prisma is already set with the schema & migrations, all we have to do is pushing them to the DB & generating the client.

```bash
npx prisma db push && npx prisma generate
```

Start the server

```bash
  npm run dev
```


Start the Client

After all these, we can now move to a different terminal session and run the client there so they are both running.

```bash
 cd ~/fclite/client && npm start
 ```

 Congratulations! If everything went well, you should now have the applications running like so:

 client: <http://localhost:3000>

 server: <http://localhost:4000>

Server:![terminalOut](https://i.imgur.com/kMM91qr.png)

Client:![terminalOut](https://i.imgur.com/ZRwFxZW.png)

 Problems? Feel free to reach out!

## Tech Stack

**Client:** Create React App, Apollo Client, Styled Components, React Router, TypeScript

**Server:** Node, Apollo Server, Prisma, TypeScript

## Disclaimers
- First time using Prisma as ORM
- First time using Apollo Client
- First time using Styled Components (I come from a sass/less background)
- First time setting up SPA routing with a library (In the past I've always rolled my own for small projects and for bigger ones, routing was already there)

## Featuring

- Client side validation (native HTML5)
- Single page navigation
- Use of semantic HTML5 Tags
- Use of BEM inspired CSS Convention
- Responsive Design (desktop first however functional on mobile through flexbox)

## Screenshots

Landing Page![Landing Page](https://i.imgur.com/Bx5pHWM.png)

Admin Panel![Admin Panel](https://i.imgur.com/m4mf8dR.png)

## TODO Roadmap

- Display user friendly error messages by intercepting errors at the server instead of throwing and picking up in client
- Get rid of any types on the formData ViewModel by using generics or the open closed principle through interfaces (must investigate)
- Fix bug of disappearing hero section image when a wallet id is added to the address bar manually
- Fix the any types in the apollo server resolver arguments
- Investigate auto codegen (prisma -> gql -> typescript) 

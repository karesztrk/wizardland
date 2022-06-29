/** @jsx h */
import { Fragment, h } from "preact";
import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

type Type = "None";
type Light = "None";

interface Spell {
  id: string;
  name: string;
  incantation: string;
  effect: string;
  canBeVerbal: true;
  type: Type;
  light: Light;
  creator: string;
}

export const handler: Handlers<Spell[] | null> = {
  async GET(_, ctx) {
    const resp = await fetch(`https://wizard-world-api.herokuapp.com/Spells`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const spells = await resp.json();
    return ctx.render(spells);
  },
};

export default function Home({ data }: PageProps<Spell[] | null>) {
  return (
    <div>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <h1>Welcome to Wizard Land.</h1>
      <h2>Spells</h2>
      {data ? (
        <dl>
          {data.map((spell) => (
            <Fragment key={spell.id}>
              <dt>{spell.name}</dt>
              <dd>{spell.effect}</dd>
            </Fragment>
          ))}
        </dl>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

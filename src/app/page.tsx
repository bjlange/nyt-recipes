import { airtabler } from "@superbasicxyz/airtabler";
import RecipeWall from "./RecipeWall";
import { rokkitt } from "./fonts";

const config = {
  apiKey: process.env.AIRTABLE_PAT,
  baseId: process.env.AIRTABLE_BASE_ID,
};

export default async function Home() {
  const db = airtabler.init(config);
  const recipes = db.model("Recipes");
  const recipiesAll = await recipes.all();

  return (
    <div className="p-4">
      <h1 className={`${rokkitt.className} text-4xl font-black mb-4`}>
        <span className="text-[#df321b]">Brian & Allison's Favorite</span> NYT
        Recipes
      </h1>
      <h2 className="text-2xl mb-4 font-bold">
        Merry Christmas and Happy New Year!
      </h2>
      <p className="mb-2">We hope you enjoy these recipes as much as we do.</p>
      <p className="mb-4">Love, Brian & Allison</p>
      <RecipeWall recipes={recipiesAll} />
    </div>
  );
}

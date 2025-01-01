"use client";

import { rokkitt } from "@/app/fonts";
import { AirtableRecord } from "airtabler";
import Image from "next/image";
import { useState } from "react";
export default function RecipeWall({ recipes }: { recipes: AirtableRecord[] }) {
  const allSeasons = [
    ...new Set(
      recipes.map((recipe: AirtableRecord) => recipe.fields.Season).flat()
    ),
  ];
  const allTags = [
    ...new Set(
      recipes.map((recipe: AirtableRecord) => recipe.fields.Tags).flat()
    ),
  ];

  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  function onSeasonClick(season: string) {
    if (selectedSeason === season) {
      setSelectedSeason(null);
    } else {
      setSelectedSeason(season);
    }
  }

  function onTagClick(tag: string) {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  }

  console.log(recipes);
  return (
    <>
      <div>
        <h3 className="text-lg font-bold mb-2">Seasons</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {allSeasons.map((season: string) => (
            <Tag
              key={season}
              tag={season}
              filled={selectedSeason === season ? true : false}
              onClick={() => onSeasonClick(season)}
            />
          ))}
        </div>
        <h3 className="text-lg font-bold mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2 mb-4 max-w-3xl">
          {allTags.map((tag: string) => (
            <Tag
              key={tag}
              tag={tag}
              filled={selectedTags.includes(tag)}
              onClick={() => onTagClick(tag)}
            />
          ))}
        </div>
        <div className="h-8">
          <button
            className={`
              text-sm font-bold text-red-600
              transform transition-all duration-300 ease-in-out
              origin-top
              ${
                selectedSeason || selectedTags.length > 0
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4 pointer-events-none"
              }
            `}
            onClick={() => {
              setSelectedSeason(null);
              setSelectedTags([]);
            }}
          >
            ⨉ Clear filters
          </button>
        </div>
      </div>
      <div className="max-w-[856px] mx-auto flex justify-center">
        <div className="flex flex-wrap gap-2 justify-start">
          {recipes
            .filter((recipe: AirtableRecord) => {
              if (
                selectedSeason &&
                recipe.fields.Season?.includes(selectedSeason)
              ) {
                return true;
              } else if (selectedSeason === null) {
                return true;
              }
              return false;
            })
            .filter((recipe: AirtableRecord) => {
              if (selectedTags.length === 0) {
                return true;
              }
              return selectedTags.every((tag) =>
                recipe.fields.Tags.includes(tag)
              );
            })
            .map((recipe: AirtableRecord) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onTagClick={onTagClick}
                onSeasonClick={onSeasonClick}
              />
            ))}
        </div>
      </div>
    </>
  );
}

function Tag({
  tag,
  onClick,
  filled = true,
}: {
  tag: string;
  onClick?: () => void;
  filled?: boolean;
}) {
  const tagColorMap: { [key: string]: string } = {
    Winter: filled
      ? "bg-blue-100 border-blue-100 border-2"
      : "border-blue-100 border-2",
    Spring: filled
      ? "bg-lime-100 border-lime-100 border-2"
      : "border-lime-100 border-2",
    Summer: filled
      ? "bg-yellow-100 border-yellow-100 border-2"
      : "border-yellow-100 border-2",
    Fall: filled
      ? "bg-orange-100 border-orange-100 border-2"
      : "border-orange-100 border-2",
    Anytime: filled
      ? "bg-anytime-colors border-white border-2"
      : "border-anytime-colors border-2",
  };

  const color =
    tagColorMap[tag] ||
    (filled
      ? "bg-slate-200 border-slate-200 border-2"
      : "border-slate-200 border-2");

  return (
    <span
      className={`${rokkitt.className} text-md font-black cursor-pointer rounded-full px-2 py-1 transition-all duration-300 ${color}`}
      onClick={onClick}
    >
      {tag}
    </span>
  );
}

function RecipeCard({ recipe, onTagClick, onSeasonClick }: { recipe: AirtableRecord, onTagClick: (tag: string) => void, onSeasonClick: (season: string) => void }) {
  const coverImage = recipe.fields["Cover Image"][0];
  return (
    <div className="border border-[rgb(230,230,230)] max-w-[280px] relative">
      {coverImage && (
        <Image
          src={coverImage.url}
          alt={recipe.fields.Name}
          width={coverImage.width}
          height={coverImage.height}
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-1">{recipe.fields.Name}</h2>
        <p className="mb-3">{recipe.fields.Notes}</p>
        <div className="mb-3 flex flex-wrap gap-1">
          {recipe.fields.Tags.map((tag: string) => (
            <Tag key={tag} tag={tag} onClick={() => onTagClick(tag)} />
          ))}
        </div>
        <div className="mb-3 flex flex-wrap gap-1">
          {recipe.fields.Season.map((tag: string) => (
            <Tag key={tag} tag={tag} onClick={() => onSeasonClick(tag)} />
          ))}
        </div>
        <p className="text-sm">{recipe.fields["Total time"]} minutes</p>
        <a
          className="block absolute bottom-4 right-4 font-semibold text-[#df321b]"
          href={recipe.fields.Link}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Recipe ↗
        </a>
      </div>
    </div>
  );
}

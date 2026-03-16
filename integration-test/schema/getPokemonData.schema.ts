import {z} from 'zod';

// Pokemon data schema
export const pokemonDataSchema = z.object({
    abilities: z.array(z.any()),
    base_experience: z.number(),
    cries: z.any(),
    forms: z.array(z.any()),
    game_indices: z.array(z.any()),
    height: z.number(),
    held_items: z.array(z.any()),
    id: z.number(),
    is_default: z.boolean(),
    location_area_encounters: z.string(),
    moves: z.array(z.any()),
    name: z.string(),
    order: z.number(),
    past_abilities: z.array(z.any()),
    past_stats: z.array(z.any()),
    past_types: z.array(z.any()),
    species: z.any(),
    sprites: z.any(),
    stats: z.array(z.any()),
    types: z.array(z.any()),
    weight: z.number(),
});

// Evolution chain data schema
export const evolutionChainSchema = z.object({
    baby_trigger_item: z.any(),
    chain: z.object({
        species: z.object({
        name: z.string(),
        url: z.string(),
        }),
        evolves_to: z.array(z.any()), // Recursive structure, can be further defined if needed
    }),
    id: z.number(),
});
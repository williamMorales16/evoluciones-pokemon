import { Page } from '@playwright/test';

export class EvolutionTasks {
  constructor(private page: Page) {}

  async logEvolutionChainData(evolutionChainData: any): Promise<string[]> {
    const speciesNames: string[] = [];
    const stack = [evolutionChainData.chain];

    while (stack.length) {
      const node = stack.shift();
      if (!node) continue;

      if (node.species?.name) {
        speciesNames.push(node.species.name);
      }

      if (Array.isArray(node.evolves_to) && node.evolves_to.length) {
        stack.push(...node.evolves_to);
      }
    }
    return speciesNames;
  }

  async logPokemonWeight(pokemonData: any): Promise<number> {
    return pokemonData.weight;
  }
}
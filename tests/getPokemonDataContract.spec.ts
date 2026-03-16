import { test, expect } from '@playwright/test';
import { validateSchemaZod } from 'playwright-schema-validator';
import { pokemonDataSchema, evolutionChainSchema } from '../integration-test/schema/getPokemonData.schema';
import { GetPokemonDataService } from '../integration-test/service/getPokemonData.service';
import { GetEvolutionChainService } from '../integration-test/service/getEvolutionChain.service';
import { EvolutionTasks } from '../integration-test/tasks/EvolutionTasks';
import { PokemonUtils } from '../integration-test/utils/PokemonUtils';
import dotenv from 'dotenv';

dotenv.config()

const base_url = process.env.POKEMON_API_URL as string;

test.describe('getPokemonData', () => {
  test('should return alphabetic order of species names with its weights', async ({ request, page }) => {
    // constantes
    const pokemon = 'squirtle';
    const idEvolutionChain = 3;
    const getPokemonEvolutionChainService = new GetEvolutionChainService(request, base_url);
    const getpokemonDataService = new GetPokemonDataService(request, base_url);
    const evolutionTasks = new EvolutionTasks(page);
    const pokemonWeights: Record<string, number> = {};
  // Inicio validaciones  
    console.log(`Getting Evolution Chain for ${pokemon} with ID ${idEvolutionChain}`);
    const evolutionChainResponse = await getPokemonEvolutionChainService.getEvolutionChain(idEvolutionChain);
    expect(evolutionChainResponse.ok()).toBeTruthy();
    expect(evolutionChainResponse.status()).toBe(200);
    const evolutionChainData = await evolutionChainResponse.json();
    await validateSchemaZod({ page }, evolutionChainData, evolutionChainSchema);
    // obtengo los nombres de las especies en la cadena evolutiva y los valido contra el resultado esperado
    const speciesNames = await evolutionTasks.logEvolutionChainData(evolutionChainData);
    await test.step('Validate species names evolution chain', async () => {
      expect(speciesNames).toEqual(['squirtle', 'wartortle', 'blastoise']);
    });
    // ordenar en orden alfabético el nombre de las especies
    const orderedSpeciesNames = PokemonUtils.orderSpeciesByName(speciesNames);
    await test.step('Validate ordered species names', async () => {
      expect(orderedSpeciesNames).toEqual(['blastoise', 'squirtle', 'wartortle']);
    });
    // obtengo el peso de cada pokemon en la cadena evolutiva
    for (const speciesName of orderedSpeciesNames) {
      const response = await getpokemonDataService.getPokemonData(speciesName);
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
      const pokemonData = await response.json();
      await validateSchemaZod({ page }, pokemonData, pokemonDataSchema);
      await evolutionTasks.logPokemonWeight(pokemonData);
      pokemonWeights[speciesName] = pokemonData.weight;
    }
    await test.step('Validate pokemon weights', async () => {
      expect(Object.keys(pokemonWeights)).toHaveLength(3);
      expect(pokemonWeights).toHaveProperty('blastoise');
      expect(pokemonWeights).toHaveProperty('squirtle');
      expect(pokemonWeights).toHaveProperty('wartortle');
    });
    console.log('Pokemon weights:\n', pokemonWeights);
  });
});